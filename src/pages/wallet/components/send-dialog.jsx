import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card } from '@/components/ui/card'
import { X, ArrowLeft, Check, AlertCircle, Copy, ArrowDown, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function SendDialog({ open, onOpenChange, selectedAsset, assets = [] }) {
  const [step, setStep] = useState(1)
  const [internalSelectedAsset, setInternalSelectedAsset] = useState(null)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [txHash, setTxHash] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)

  // Determine if we need to show asset selection
  const needsAssetSelection = !selectedAsset && assets.length > 0
  const activeAsset = selectedAsset || internalSelectedAsset

  // Validation states
  const [addressError, setAddressError] = useState('')
  const [amountError, setAmountError] = useState('')

  // Reset internal state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setInternalSelectedAsset(null)
      setStep(1)
      setRecipientAddress('')
      setAmount('')
      setTxHash(null)
      setError(null)
      setAddressError('')
      setAmountError('')
      setIsSending(false)
    }
  }, [open])

  const handleAssetSelect = (assetId) => {
    const asset = assets.find(a => a.id === parseInt(assetId))
    if (asset) {
      setInternalSelectedAsset(asset)
    }
  }

  if (!activeAsset && !needsAssetSelection) return null

  // Calculate values
  const availableBalance = activeAsset?.balance || 0
  const amountNum = parseFloat(amount) || 0
  const amountUSD = activeAsset ? amountNum * (activeAsset.price || 0) : 0
  const estimatedFee = 0.0012 // Fixed fee for demo
  const estimatedFeeUSD = 0.0012 * 1 // Assuming CNPY = $1
  const totalAmount = amountNum
  const totalUSD = amountUSD + estimatedFeeUSD

  // Validate address (basic ethereum address validation)
  const validateAddress = (addr) => {
    if (!addr) {
      setAddressError('Recipient address is required')
      return false
    }
    // Check if it's a valid ethereum address (0x followed by 40 hex chars) or canopy username
    const isEthAddress = /^0x[a-fA-F0-9]{40}$/.test(addr)
    const isCanopyUsername = /^[a-zA-Z0-9_.-]+\.canopy$/.test(addr)

    if (!isEthAddress && !isCanopyUsername) {
      setAddressError('Invalid address format')
      return false
    }

    setAddressError('')
    return true
  }

  // Validate amount
  const validateAmount = () => {
    if (!amountNum || amountNum <= 0) {
      setAmountError('Amount must be greater than 0')
      return false
    }
    if (amountNum > availableBalance) {
      setAmountError('Insufficient balance')
      return false
    }
    setAmountError('')
    return true
  }

  const handleMaxClick = () => {
    setAmount(availableBalance.toString())
    setAmountError('')
  }

  const handleContinueFromStep1 = () => {
    if (!activeAsset) return
    setStep(2)
  }

  const handleContinueFromStep2 = () => {
    // Validate before proceeding
    const isAddressValid = validateAddress(recipientAddress)
    const isAmountValid = validateAmount()

    if (isAddressValid && isAmountValid && activeAsset) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      setRecipientAddress('')
      setAmount('')
      setAddressError('')
      setAmountError('')
    } else if (step === 3) {
      setStep(2)
    }
  }

  const handleConfirmSend = async () => {
    setStep(4)
    setIsSending(true)

    // Simulate transaction
    setTimeout(() => {
      // Random success/failure for demo (90% success rate)
      const success = Math.random() > 0.1

      if (success) {
        // Generate mock transaction hash
        const mockHash = '0x' + Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join('')
        setTxHash(mockHash)
        setIsSending(false)
        setError(null)
      } else {
        setIsSending(false)
        setError('Transaction failed. Please try again.')
      }
    }, 2000)
  }

  const handleClose = () => {
    setStep(1)
    setRecipientAddress('')
    setAmount('')
    setInternalSelectedAsset(null)
    setTxHash(null)
    setError(null)
    setAddressError('')
    setAmountError('')
    setIsSending(false)
    onOpenChange(false)
  }

  const handleDone = () => {
    toast.success(`Successfully sent ${amountNum} ${activeAsset.symbol}`)
    handleClose()
  }

  const handleSendAgain = () => {
    setStep(1)
    setRecipientAddress('')
    setAmount('')
    setTxHash(null)
    setError(null)
    setAddressError('')
    setAmountError('')
  }

  const handleTryAgain = () => {
    setStep(2)
    setError(null)
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const formatAddress = (addr) => {
    if (!addr) return ''
    if (addr.length <= 12) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] p-0" hideClose noAnimation>
          {/* Step 1: Select Asset */}
          {step === 1 && (
            <>
              <VisuallyHidden>
                <DialogTitle>Send - Select Asset</DialogTitle>
              </VisuallyHidden>
              {/* Header */}
              <div className="relative px-6 py-3 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={handleClose}
                >
                  <X className="w-5 h-5" />
                </Button>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Send</h2>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-6">
                {/* Asset Selection or Display */}
                {needsAssetSelection ? (
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium">Select asset to send</Label>
                    <Select value={activeAsset?.id?.toString()} onValueChange={handleAssetSelect}>
                      <SelectTrigger className="h-auto py-3 [&>span]:line-clamp-none [&>span]:block">
                        <SelectValue placeholder="Choose an asset to send">
                          {activeAsset ? (
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: activeAsset.color }}
                                >
                                  <span className="text-sm font-bold text-white">
                                    {activeAsset.symbol.slice(0, 1)}
                                  </span>
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="font-medium text-sm">{activeAsset.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                     {activeAsset.balance.toLocaleString()} {activeAsset.symbol}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {assets.filter(a => a.balance > 0).map((asset) => (
                          <SelectItem key={asset.id} value={asset.id.toString()} className="h-auto py-3">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: asset.color }}
                                >
                                  <span className="text-sm font-bold text-white">
                                    {asset.symbol.slice(0, 1)}
                                  </span>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                  <span className="font-medium">{asset.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                     {asset.balance.toLocaleString()} {asset.symbol}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  /* Asset Display (when asset is pre-selected) */
                  <div className="p-4 mt-2 bg-muted/30 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: activeAsset.color }}
                        >
                          <span className="text-sm font-bold text-white">
                            {activeAsset.symbol.slice(0, 1)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{activeAsset.name}</p>
                          <p className="text-sm text-muted-foreground">{activeAsset.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {activeAsset.balance.toLocaleString()} {activeAsset.symbol}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${activeAsset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                <Button
                  className="w-full h-12"
                  onClick={handleContinueFromStep1}
                  disabled={!activeAsset}
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* Step 2: Enter Recipient & Amount */}
          {step === 2 && (
            <>
              <VisuallyHidden>
                <DialogTitle>Send - Enter Details</DialogTitle>
              </VisuallyHidden>
              <div className="relative px-6 py-3 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-2"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={handleClose}
                >
                  <X className="w-5 h-5" />
                </Button>
                <div className="space-y-1 text-center">
                  <h2 className="text-xl font-bold">Send {activeAsset.symbol}</h2>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-6">
                {/* Recipient Address */}
                <div className="space-y-2">
                  <Label className="block text-sm font-medium">Recipient Address</Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => {
                        setRecipientAddress(e.target.value)
                        if (addressError) setAddressError('')
                      }}
                      onBlur={() => recipientAddress && validateAddress(recipientAddress)}
                      className={addressError ? 'border-red-500' : ''}
                    />
                  </div>
                  {addressError && (
                    <p className="text-sm text-red-500">{addressError}</p>
                  )}
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="block text-sm font-medium">Amount</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={handleMaxClick}
                    >
                      Max
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value
                        // Only allow numbers and decimal point
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          setAmount(value)
                          if (amountError) setAmountError('')
                        }
                      }}
                      onBlur={validateAmount}
                      className={`pr-16 text-lg ${amountError ? 'border-red-500' : ''}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {activeAsset.symbol}
                    </span>
                  </div>
                  {amountError && (
                    <p className="text-sm text-red-500">{amountError}</p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      approx. ${amountUSD.toFixed(2)} USD
                    </span>
                    <span className="text-muted-foreground">
                      Available: {availableBalance.toLocaleString()} {activeAsset.symbol}
                    </span>
                  </div>
                </div>

                {/* Continue Button */}
                <Button
                  className="w-full h-12"
                  onClick={handleContinueFromStep2}
                  disabled={!recipientAddress || !amountNum || amountNum <= 0}
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <>
              <VisuallyHidden>
                <DialogTitle>Send - Review & Confirm</DialogTitle>
              </VisuallyHidden>
              <div className="relative p-6 pb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-2"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={handleClose}
                >
                  <X className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-bold text-center">Review & Confirm</h2>
              </div>

              <div className="px-6 pb-6 space-y-6">
                {/* From/To Cards */}
                <div className="space-y-4">
                  {/* From */}
                  <Card className="p-4 border">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: activeAsset.color }}
                      >
                        <span className="text-sm font-bold text-white">
                          {activeAsset.symbol.slice(0, 1)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">From</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{activeAsset.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Balance: {availableBalance.toLocaleString()} {activeAsset.symbol}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* To */}
                  <Card className="p-4 border">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Send className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">To</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{formatAddress(recipientAddress)}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => copyToClipboard(recipientAddress, 'Address')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">{amountNum} {activeAsset.symbol}</p>
                        <p className="text-xs text-muted-foreground">${amountUSD.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Network Fee</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {estimatedFee < 0.001 ? '< 0.001' : estimatedFee} CNPY
                        </p>
                        <p className="text-xs text-muted-foreground">${estimatedFeeUSD.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-sm font-semibold">Total</span>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{totalAmount} {activeAsset.symbol}</p>
                        <p className="text-xs text-muted-foreground">${totalUSD.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      This transaction cannot be reversed. Please verify the recipient address before confirming.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full h-12"
                    onClick={handleConfirmSend}
                  >
                    Confirm & Send
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={handleBack}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Step 4: Transaction Status */}
          {step === 4 && (
            <>
              <VisuallyHidden>
                <DialogTitle>Send - Transaction Status</DialogTitle>
              </VisuallyHidden>
              <div className="relative p-6 pb-4">
                {!isSending && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={handleClose}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>

              <div className="px-6 pb-6 space-y-6">
                {/* Sending State */}
                {isSending && (
                  <div className="flex flex-col items-center space-y-4 pb-8">
                    <div className="w-16 h-16 rounded-full border-2 border-foreground/40 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold">Sending Transaction</h2>
                    <p className="text-center text-muted-foreground">
                      Please wait while your transaction is being processed...
                    </p>
                  </div>
                )}

                {/* Success State */}
                {!isSending && !error && txHash && (
                  <>
                    <div className="flex flex-col items-center space-y-4 py-8">
                      <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
                        <Check className="w-8 h-8 text-green-500" />
                      </div>
                      <h2 className="text-2xl font-bold">Transaction Sent!</h2>
                      <p className="text-center text-muted-foreground">
                        Your{' '}
                        <span className="font-semibold text-foreground">
                          {amountNum} {activeAsset.symbol}
                        </span>{' '}
                        has been sent successfully
                      </p>
                    </div>

                    {/* Transaction Details */}
                    <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Transaction Hash</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono break-all">{formatAddress(txHash)}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 flex-shrink-0"
                            onClick={() => copyToClipboard(txHash, 'Transaction hash')}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="text-sm font-medium">{amountNum} {activeAsset.symbol}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Recipient</p>
                        <p className="text-sm font-medium font-mono">{formatAddress(recipientAddress)}</p>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => {
                          toast.info('Block explorer integration coming soon')
                        }}
                      >
                        View on Explorer
                      </Button>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <Button
                        className="w-full h-12"
                        onClick={handleSendAgain}
                      >
                        Send Another Transaction
                      </Button>
                    </div>
                  </>
                )}

                {/* Failed State */}
                {!isSending && error && (
                  <>
                    <div className="flex flex-col items-center space-y-4 py-8">
                      <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
                        <X className="w-8 h-8 text-red-500" />
                      </div>
                      <h2 className="text-2xl font-bold">Transaction Failed</h2>
                      <p className="text-center text-muted-foreground">
                        {error}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <Button
                        className="w-full h-12"
                        onClick={handleTryAgain}
                      >
                        Try Again
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

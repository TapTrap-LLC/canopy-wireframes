import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, ChevronRight, ArrowDown, ArrowUp } from 'lucide-react'
import liquidityPoolsData from '@/data/liquidity-pools.json'

export default function LiquidityTab({ 
  tokenA = null,
  tokenB = null,
  isPreview = false, 
  onSelectToken 
}) {
  const [mode, setMode] = useState('deposit') // 'deposit' or 'withdraw'
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')

  // Find pool if both tokens are selected
  const pool = tokenA && tokenB 
    ? liquidityPoolsData.find(p => 
        (p.tokenA === tokenA.symbol && p.tokenB === tokenB.symbol) ||
        (p.tokenA === tokenB.symbol && p.tokenB === tokenA.symbol)
      )
    : null

  const toggleMode = () => {
    setMode(mode === 'deposit' ? 'withdraw' : 'deposit')
    setAmountA('')
    setAmountB('')
  }

  const handleAmountAChange = (value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmountA(value)
      // Auto-calculate amount B based on pool ratio
      if (pool && value && parseFloat(value) > 0) {
        const ratio = pool.tokenBReserve / pool.tokenAReserve
        setAmountB((parseFloat(value) * ratio).toFixed(6))
      } else {
        setAmountB('')
      }
    }
  }

  const handleAmountBChange = (value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmountB(value)
      // Auto-calculate amount A based on pool ratio
      if (pool && value && parseFloat(value) > 0) {
        const ratio = pool.tokenAReserve / pool.tokenBReserve
        setAmountA((parseFloat(value) * ratio).toFixed(6))
      } else {
        setAmountA('')
      }
    }
  }

  return (
    <>
      {mode === 'deposit' ? (
        <>
          {/* Token A to Deposit */}
          <div className="px-4">
            {tokenA ? (
              <Card className="bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => onSelectToken && onSelectToken('tokenA')}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: tokenA.brandColor || '#10b981' }}
                    >
                      {tokenA.logo ? (
                        <img src={tokenA.logo} alt={tokenA.symbol} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-sm font-bold text-white">{tokenA.symbol[0]}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{tokenA.symbol}</p>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Balance: 0</p>
                    </div>
                  </button>
                  <Button variant="secondary" size="sm" className="h-7 text-xs">
                    Max
                  </Button>
                </div>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={amountA}
                  onChange={(e) => handleAmountAChange(e.target.value)}
                  placeholder="0.0"
                  className="text-2xl font-bold text-center border-0 bg-transparent h-auto p-0"
                />
              </Card>
            ) : (
              <Card 
                className="bg-muted/30 p-4 hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => onSelectToken && onSelectToken('tokenA')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-base font-medium">Select token</p>
                      <p className="text-sm text-muted-foreground">First token to deposit</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            )}
          </div>

          {/* Toggle Mode Button */}
          <div className="relative flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-background border-2 hover:bg-muted"
              onClick={toggleMode}
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>

          {/* Token B to Deposit / Pool Info */}
          <div className="px-4">
            {tokenB ? (
              <Card className="bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => onSelectToken && onSelectToken('tokenB')}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: tokenB.brandColor || '#10b981' }}
                    >
                      {tokenB.logo ? (
                        <img src={tokenB.logo} alt={tokenB.symbol} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="text-sm font-bold text-white">{tokenB.symbol[0]}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{tokenB.symbol}</p>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Balance: 0</p>
                    </div>
                  </button>
                  <Button variant="secondary" size="sm" className="h-7 text-xs">
                    Max
                  </Button>
                </div>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={amountB}
                  onChange={(e) => handleAmountBChange(e.target.value)}
                  placeholder="0.0"
                  className="text-2xl font-bold text-center border-0 bg-transparent h-auto p-0"
                />
              </Card>
            ) : (
              <Card 
                className="bg-muted/30 p-4 hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => onSelectToken && onSelectToken('tokenB')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-base font-medium">Select token</p>
                      <p className="text-sm text-muted-foreground">Second token to deposit</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            )}
          </div>

          {/* Pool Info */}
          {pool && (
            <div className="px-4">
              <Card className="bg-muted/20 p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Pool APR</span>
                  <span className="font-medium text-green-500">{pool.apr}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Liquidity</span>
                  <span className="font-medium">${pool.totalLiquidity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span className="font-medium">${pool.volume24h.toLocaleString()}</span>
                </div>
              </Card>
            </div>
          )}

          {/* Deposit Button */}
          <div className="px-4 pb-3">
            <Button 
              className="w-full h-11" 
              size="lg" 
              disabled={isPreview || !tokenA || !tokenB || !amountA || !amountB}
            >
              {isPreview ? 'Preview Mode' : !tokenA || !tokenB ? 'Select tokens' : 'Add Liquidity'}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Pool to Withdraw From */}
          <div className="px-4">
            {pool ? (
              <Card className="bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-background"
                        style={{ backgroundColor: tokenA.brandColor || '#10b981' }}
                      >
                        <span className="text-xs font-bold text-white">{tokenA.symbol[0]}</span>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-background"
                        style={{ backgroundColor: tokenB.brandColor || '#10b981' }}
                      >
                        <span className="text-xs font-bold text-white">{tokenB.symbol[0]}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{tokenA.symbol}/{tokenB.symbol} Pool</p>
                      <p className="text-xs text-muted-foreground">Your LP: 0.00</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="h-7 text-xs">
                    Max
                  </Button>
                </div>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={amountA}
                  onChange={(e) => handleAmountAChange(e.target.value)}
                  placeholder="0.0"
                  className="text-2xl font-bold text-center border-0 bg-transparent h-auto p-0"
                />
                <p className="text-xs text-center text-muted-foreground">LP Tokens to withdraw</p>
              </Card>
            ) : (
              <Card 
                className="bg-muted/30 p-4 hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => onSelectToken && onSelectToken('tokenA')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-base font-medium">Select pool</p>
                      <p className="text-sm text-muted-foreground">Choose liquidity pool</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            )}
          </div>

          {/* Toggle Mode Button */}
          <div className="relative flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-background border-2 hover:bg-muted"
              onClick={toggleMode}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>

          {/* Tokens You'll Receive */}
          <div className="px-4">
            {tokenA && tokenB ? (
              <Card className="bg-muted/30 p-4 space-y-3">
                <div className="text-sm font-medium mb-2">You'll receive</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tokenA.brandColor || '#10b981' }}
                      >
                        <span className="text-xs font-bold text-white">{tokenA.symbol[0]}</span>
                      </div>
                      <span className="text-sm">{tokenA.symbol}</span>
                    </div>
                    <span className="text-sm font-medium">{amountA || '0.0'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: tokenB.brandColor || '#10b981' }}
                      >
                        <span className="text-xs font-bold text-white">{tokenB.symbol[0]}</span>
                      </div>
                      <span className="text-sm">{tokenB.symbol}</span>
                    </div>
                    <span className="text-sm font-medium">{amountB || '0.0'}</span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-muted/30 p-4">
                <div className="text-center text-sm text-muted-foreground">
                  Select a pool to see withdrawal details
                </div>
              </Card>
            )}
          </div>

          {/* Withdraw Button */}
          <div className="px-4 pb-3">
            <Button 
              className="w-full h-11" 
              size="lg" 
              disabled={isPreview || !tokenA || !tokenB || !amountA}
            >
              {isPreview ? 'Preview Mode' : !pool ? 'Select pool' : 'Remove Liquidity'}
            </Button>
          </div>
        </>
      )}
    </>
  )
}


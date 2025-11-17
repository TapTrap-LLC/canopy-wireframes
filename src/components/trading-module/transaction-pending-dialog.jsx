import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Check } from 'lucide-react'

export default function TransactionPendingDialog({ 
  open, 
  onClose,
  toToken,
  amount,
  price,
  duration = 4 // seconds
}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [progress, setProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (open) {
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
      // Reset timer and success state
      setTimeLeft(duration)
      setProgress(0)
      setShowSuccess(false)
    } else {
      setIsAnimating(false)
    }
  }, [open, duration])

  useEffect(() => {
    if (!open) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          // Show success state
          setShowSuccess(true)
          return 0
        }
        return prev - 1
      })
      setProgress((prev) => Math.min(prev + (100 / duration), 100))
    }, 1000)

    return () => clearInterval(interval)
  }, [open, duration])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const circumference = 2 * Math.PI * 80 // radius = 80
  const strokeDashoffset = circumference - (progress / 100) * circumference
  const usdValue = parseFloat(amount) || 0

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 z-10 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Pending Content */}
      <div 
        className={`absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-2xl transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-6 pt-8 pb-8 flex flex-col items-center">
          {!showSuccess ? (
            <>
              {/* Countdown Timer with Progress Circle */}
              <div className="relative w-48 h-48 mb-8">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-muted/20"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="text-primary transition-all duration-1000 ease-linear"
                  />
                </svg>
                
                {/* Timer Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-sm text-muted-foreground mb-2">Time left</p>
                  <p className="text-4xl font-bold tabular-nums">{formatTime(timeLeft)}</p>
                </div>
              </div>

              {/* Status Text */}
              <h2 className="text-2xl font-bold mb-3">Transaction pending...</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">
                You can close this tab if you want, it's visible and accessible in{' '}
                <span className="text-foreground font-medium">your activity</span>
              </p>

              {/* Close Button */}
              <Button 
                variant="secondary"
                className="w-full h-11 text-base"
                size="lg"
                onClick={onClose}
              >
                Close
              </Button>
            </>
          ) : (
            <>
              {/* Success Checkmark */}
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-12 h-12 text-primary" strokeWidth={3} />
                </div>
              </div>

              {/* Buy Amount Label */}
              <p className="text-xs text-muted-foreground mb-2">Buy amount</p>

              {/* Success Message */}
              <h2 className="text-2xl font-bold text-center mb-1">
                You bought ${usdValue.toFixed(0)} worth of{' '}
                <span className="text-muted-foreground">{toToken?.symbol || ''}</span>
              </h2>
              <p className="text-xs text-muted-foreground mb-8">
                at ${price?.toFixed(2) || '0.00'}
              </p>

              {/* Done Button */}
              <Button 
                className="w-full h-11 text-base mb-3"
                size="lg"
                onClick={onClose}
              >
                Done
              </Button>

              {/* View Transaction Button */}
              <Button 
                variant="secondary"
                className="w-full h-11 text-base"
                size="lg"
                onClick={onClose}
              >
                View transaction
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}


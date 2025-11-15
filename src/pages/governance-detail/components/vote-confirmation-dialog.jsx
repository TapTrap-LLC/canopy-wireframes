import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, X, Loader2 } from 'lucide-react'

export default function VoteConfirmationDialog({
  open,
  onOpenChange,
  step,
  proposal,
  pendingVoteType,
  userVotingPower,
  onConfirm,
  onDone,
  onBackToGovernance
}) {
  if (!proposal) return null

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0" hideClose noAnimation>
        {/* Step 1: Confirmation */}
        {step === 1 && (
          <>
            <div className="relative p-6 pb-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={handleClose}
              >
                <X className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-bold text-center pt-8">Vote confirmation</h2>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Summary */}
              <div className="space-y-4">
                <h3 className="font-semibold">Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Proposal</span>
                    <span className="text-sm font-medium">{proposal.title}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ backgroundColor: proposal.chainColor }}
                      >
                        {proposal.network.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{proposal.network}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Your voting power</span>
                    <span className="text-sm font-medium">{userVotingPower.toLocaleString()} {proposal.tokenSymbol}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm font-semibold">Your vote</span>
                    <div className="flex items-center gap-2">
                      {pendingVoteType === 'for' ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-600">For</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-semibold text-red-600">Against</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By clicking "Confirm," you are casting your vote on this proposal. This action
                  cannot be undone. Your vote will be recorded on-chain and will count towards
                  the final decision.
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full h-12"
                  onClick={onConfirm}
                >
                  Confirm
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Voting (Loading) */}
        {step === 2 && (
          <>
            <div className="relative p-6 pb-4">
              <h2 className="text-xl font-bold text-center pt-8">Casting your vote...</h2>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Loading Icon */}
              <div className="flex flex-col items-center space-y-4 py-8">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
                <p className="text-center text-muted-foreground">
                  Please wait while we record your vote on-chain
                </p>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <>
            <div className="relative p-6 pb-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={onDone}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Success Icon */}
              <div className="flex flex-col items-center space-y-4 py-8">
                <div className="w-16 h-16 rounded-full border-2 border-foreground flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Vote recorded!</h2>
                <p className="text-center text-muted-foreground">
                  You voted{' '}
                  <span className="font-semibold text-foreground">
                    {proposal.userVote === 'for' ? 'For' : 'Against'}
                  </span>{' '}
                  the proposal with{' '}
                  <span className="font-semibold text-foreground">
                    {userVotingPower.toLocaleString()} {proposal.tokenSymbol}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full h-12"
                  onClick={onDone}
                >
                  Done
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={onBackToGovernance}
                >
                  Back to Governance
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

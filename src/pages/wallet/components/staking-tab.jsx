import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PlusCircle } from 'lucide-react'

export default function StakingTab({ stakes, unstaking }) {
  return (
    <div className="space-y-6">
      {/* Active Stakes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Active Stakes</h2>
        <div className="space-y-3">
          {stakes.map((stake) => (
            <Card key={stake.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: stake.color }}
                    >
                      {stake.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold">{stake.symbol} on {stake.chain}</div>
                      <div className="text-sm text-muted-foreground">
                        {stake.amount} {stake.symbol} staked
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    APY: {stake.apy}%
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Rewards</div>
                    <div className="font-semibold">{stake.rewards} {stake.symbol}</div>
                  </div>
                  <Button size="sm">Claim</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Unstaking Queue */}
      {unstaking && unstaking.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Unstaking Queue</h2>
          <div className="space-y-3">
            {unstaking.map((unstake) => (
              <Card key={unstake.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{unstake.amount} {unstake.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        Ready in: {unstake.daysRemaining} days {unstake.hoursRemaining} hours
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Stake More Button */}
      <div className="flex justify-center">
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Stake More Assets
        </Button>
      </div>
    </div>
  )
}

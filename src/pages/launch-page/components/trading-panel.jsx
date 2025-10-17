import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight, Zap } from 'lucide-react'

export default function TradingPanel({ chainData }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Zap className="w-4 h-4" />
          <span className="flex-1 text-left">CNPY</span>
          <span className="text-muted-foreground">Use max</span>
        </Button>

        <div className="p-4 rounded-lg bg-muted/50 text-center">
          <div className="text-3xl font-bold">$0</div>
          <div className="text-sm text-muted-foreground mt-1">0 CNPY ⚡</div>
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowUpRight className="w-5 h-5 rotate-90" />
          </Button>
        </div>

        <Button variant="outline" className="w-full justify-start gap-2">
          <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">{chainData.ticker[0]}</span>
          </div>
          <span className="flex-1 text-left">{chainData.name}</span>
          <span className="text-muted-foreground">D</span>
        </Button>

        <div className="p-4 rounded-lg bg-muted/50 text-center">
          <div className="text-3xl font-bold">$0.00</div>
        </div>

        <Button className="w-full" size="lg">
          Connect Wallet
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          1 CNPY = 1.00000 ${chainData.ticker}
        </p>
      </div>
    </Card>
  )
}

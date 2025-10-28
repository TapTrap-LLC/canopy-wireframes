import { useState, useEffect } from 'react'
import MainSidebar from '@/components/main-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Send,
  Download,
  Repeat,
  Coins
} from 'lucide-react'
import AssetsTab from './components/assets-tab'
import StakingTab from './components/staking-tab'
import ActivityTab from './components/activity-tab'
import walletData from '@/data/wallet.json'

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('assets')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />

      <div className="flex-1 p-6 pt-4">
        <div className="max-w-[1024px] mx-auto flex gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Portfolio Header */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  ${walletData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`text-sm mt-2 ${walletData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {walletData.change24h >= 0 ? '+' : ''}{walletData.change24h}% (24h)
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="staking">Staking</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="governance">Governance</TabsTrigger>
              </TabsList>

              {/* Assets Tab */}
              <TabsContent value="assets">
                <AssetsTab
                  assets={walletData.assets}
                  totalValue={walletData.totalValue}
                />
              </TabsContent>

              {/* Staking Tab */}
              <TabsContent value="staking">
                <StakingTab
                  stakes={walletData.stakes}
                  unstaking={walletData.unstaking}
                />
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <ActivityTab transactions={walletData.transactions} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions Card - Right Side */}
          <div className="w-64 shrink-0 pt-[88px]">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Send className="w-5 h-5" />
                  <span className="text-sm">Send</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Receive</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Repeat className="w-5 h-5" />
                  <span className="text-sm">Swap</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Coins className="w-5 h-5" />
                  <span className="text-sm">Stake</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import MainSidebar from '@/components/main-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Send,
  Download,
  Repeat,
  Coins,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import AssetsTab from './components/assets-tab'
import StakingTab from './components/staking-tab'
import ActivityTab from './components/activity-tab'

// Mock wallet data
const MOCK_WALLET_DATA = {
  totalValue: 12458.32,
  change24h: 5.2,
  assets: [
    {
      id: 1,
      symbol: 'CNPY',
      name: 'Canopy',
      balance: 2500,
      price: 2.24,
      value: 5606.24,
      change24h: 3.2,
      color: '#1dd13a'
    },
    {
      id: 2,
      symbol: 'CHN1',
      name: 'Chain 1',
      balance: 450,
      price: 6.92,
      value: 3114.58,
      change24h: 8.1,
      color: '#3b82f6'
    },
    {
      id: 3,
      symbol: 'CHN2',
      name: 'Chain 2',
      balance: 890,
      price: 2.10,
      value: 1869.75,
      change24h: -2.3,
      color: '#eab308'
    },
    {
      id: 4,
      symbol: 'CHN3',
      name: 'Chain 3',
      balance: 320,
      price: 4.55,
      value: 1456.00,
      change24h: 1.8,
      color: '#8b5cf6'
    },
    {
      id: 5,
      symbol: 'CHN4',
      name: 'Chain 4',
      balance: 150,
      price: 2.74,
      value: 411.75,
      change24h: -0.5,
      color: '#ec4899'
    }
  ],
  stakes: [
    {
      id: 1,
      symbol: 'CNPY',
      chain: 'Canopy',
      amount: 500,
      apy: 12.5,
      rewards: 2.15,
      color: '#1dd13a'
    },
    {
      id: 2,
      symbol: 'CHN1',
      chain: 'Chain1',
      amount: 200,
      apy: 18.2,
      rewards: 0.82,
      color: '#3b82f6'
    }
  ],
  unstaking: [
    {
      id: 1,
      symbol: 'CNPY',
      amount: 100,
      daysRemaining: 5,
      hoursRemaining: 3
    }
  ],
  transactions: [
    {
      id: 1,
      type: 'sent',
      amount: -50,
      symbol: 'CNPY',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'received',
      amount: 125,
      symbol: 'CHN1',
      timestamp: '5 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'swap',
      amountFrom: 100,
      symbolFrom: 'CNPY',
      amountTo: 45,
      symbolTo: 'CHN2',
      timestamp: 'Yesterday',
      status: 'completed'
    },
    {
      id: 4,
      type: 'staked',
      amount: 500,
      symbol: 'CNPY',
      timestamp: '3 days ago',
      status: 'completed'
    }
  ]
}

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('assets')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />

      <div className="flex-1 p-6 pt-4">
        <div className="max-w-7xl mx-auto flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Portfolio Header */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  ${MOCK_WALLET_DATA.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <Badge variant={MOCK_WALLET_DATA.change24h > 0 ? "default" : "destructive"} className="text-xs">
                  {MOCK_WALLET_DATA.change24h > 0 ? (
                    <>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{MOCK_WALLET_DATA.change24h}% (24h)
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {MOCK_WALLET_DATA.change24h}% (24h)
                    </>
                  )}
                </Badge>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 max-w-2xl">
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="staking">Staking</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Assets Tab */}
              <TabsContent value="assets">
                <AssetsTab
                  assets={MOCK_WALLET_DATA.assets}
                  totalValue={MOCK_WALLET_DATA.totalValue}
                />
              </TabsContent>

              {/* Staking Tab */}
              <TabsContent value="staking">
                <StakingTab
                  stakes={MOCK_WALLET_DATA.stakes}
                  unstaking={MOCK_WALLET_DATA.unstaking}
                />
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <ActivityTab transactions={MOCK_WALLET_DATA.transactions} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions Card - Right Side */}
          <div className="w-64 shrink-0">
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

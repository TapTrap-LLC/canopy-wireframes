import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ArrowUp, ArrowDown, Repeat, Coins, FileDown } from 'lucide-react'

export default function ActivityTab({ transactions }) {
  const [txSearch, setTxSearch] = useState('')

  const filteredTransactions = transactions.filter(tx => {
    const searchLower = txSearch.toLowerCase()
    if (tx.type === 'swap') {
      return tx.symbolFrom.toLowerCase().includes(searchLower) ||
             tx.symbolTo.toLowerCase().includes(searchLower)
    }
    return tx.symbol.toLowerCase().includes(searchLower)
  })

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={txSearch}
          onChange={(e) => setTxSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <Card key={tx.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {tx.type === 'sent' && <ArrowUp className="w-5 h-5 text-orange-500" />}
                        {tx.type === 'received' && <ArrowDown className="w-5 h-5 text-green-500" />}
                        {tx.type === 'swap' && <Repeat className="w-5 h-5 text-blue-500" />}
                        {tx.type === 'staked' && <Coins className="w-5 h-5 text-purple-500" />}
                      </div>
                      <div>
                        <div className="font-semibold capitalize">{tx.type}</div>
                        {tx.type === 'swap' ? (
                          <div className="text-sm text-muted-foreground">
                            {tx.amountFrom} {tx.symbolFrom} → {tx.amountTo} {tx.symbolTo}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.symbol}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{tx.timestamp}</div>
                      <div className="text-green-500 text-sm">✓</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-muted rounded-full">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">No transactions found</p>
              <p className="text-xs text-muted-foreground">Try searching with a different token symbol</p>
            </div>
          )}
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2">
          <FileDown className="w-4 h-4" />
          Export History
        </Button>
      </div>
    </div>
  )
}

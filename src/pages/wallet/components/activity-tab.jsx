import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownLeft, Repeat, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'

export default function ActivityTab({ transactions }) {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedAsset, setSelectedAsset] = useState('all')

  // Get unique assets from transactions
  const assets = ['all', ...new Set(transactions.map(tx => tx.symbol || tx.symbolFrom).filter(Boolean))]

  // Get token color based on chainId or symbol
  const getTokenColor = (tx) => {
    const colors = {
      'OENS': '#10b981',
      'GAME': '#8b5cf6',
      'SOCL': '#06b6d4',
      'STRM': '#f59e0b',
      'DFIM': '#ec4899'
    }
    return colors[tx.symbol] || colors[tx.symbolFrom] || '#6366f1'
  }

  // Get transaction type icon
  const getTransactionTypeIcon = (type) => {
    switch (type) {
      case 'sent':
        return <ArrowUpRight className="w-2.5 h-2.5" />
      case 'received':
        return <ArrowDownLeft className="w-2.5 h-2.5" />
      case 'swap':
        return <Repeat className="w-2.5 h-2.5" />
      case 'staked':
        return <TrendingUp className="w-2.5 h-2.5" />
      case 'unstaked':
        return <TrendingDown className="w-2.5 h-2.5" />
      case 'claimed':
        return <CheckCircle className="w-2.5 h-2.5" />
      default:
        return <ArrowUpRight className="w-2.5 h-2.5" />
    }
  }

  // Format transaction type for display
  const formatTransactionType = (tx) => {
    switch (tx.type) {
      case 'sent':
        return `Sent ${tx.symbol}`
      case 'received':
        return `Received ${tx.symbol}`
      case 'swap':
        return `Swapped ${tx.symbolFrom} to ${tx.symbolTo}`
      case 'staked':
        return `Staked ${tx.symbol}`
      case 'unstaked':
        return `Unstaked ${tx.symbol}`
      case 'claimed':
        return `Claimed ${tx.symbol}`
      default:
        return tx.type
    }
  }

  // Format amount display
  const formatAmount = (tx) => {
    if (tx.type === 'swap') {
      return {
        primary: `${tx.symbolFrom}$${Math.abs(tx.amountFrom)}`,
        secondary: `${Math.abs(tx.amountFrom)} ${tx.symbolFrom}`
      }
    }

    const sign = tx.amount > 0 ? '+' : '-'
    const symbol = tx.type === 'sent' ? tx.symbol.substring(0, 1) : tx.symbol.substring(0, 1)

    return {
      primary: `${sign}${symbol}$${Math.abs(tx.amount)}`,
      secondary: `${tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount)} ${tx.symbol}`
    }
  }

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (selectedType !== 'all' && tx.type !== selectedType) return false
    if (selectedStatus !== 'all' && tx.status !== selectedStatus) return false
    if (selectedAsset !== 'all') {
      const txAsset = tx.symbol || tx.symbolFrom
      if (txAsset !== selectedAsset) return false
    }
    return true
  })

  const hasActiveFilters = selectedType !== 'all' || selectedStatus !== 'all' || selectedAsset !== 'all'

  const handleResetFilters = () => {
    setSelectedType('all')
    setSelectedStatus('all')
    setSelectedAsset('all')
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6">Activity</h2>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Type Filter */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Type (All)</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="swap">Swap</SelectItem>
            <SelectItem value="staked">Staked</SelectItem>
            <SelectItem value="unstaked">Unstaked</SelectItem>
            <SelectItem value="claimed">Claimed</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status (All)</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* Asset Filter */}
        <Select value={selectedAsset} onValueChange={setSelectedAsset}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Asset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Asset (All)</SelectItem>
            {assets.filter(a => a !== 'all').map(asset => (
              <SelectItem key={asset} value={asset}>{asset}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <Button
            variant="link"
            className="h-9 px-0 text-primary"
            onClick={handleResetFilters}
          >
            Reset filters
          </Button>
        )}
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-3 gap-4 pb-3 border-b text-sm font-medium text-muted-foreground">
        <div>Details</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Date</div>
      </div>

      {/* Transactions List */}
      <div>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => {
            const amount = formatAmount(tx)
            return (
              <div
                key={tx.id}
                className="grid grid-cols-3 gap-4 py-4 border-b border-border last:border-0 items-center hover:bg-muted/30 transition-colors"
              >
                {/* Details */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: getTokenColor(tx) }}
                    >
                      <span className="text-xs font-bold text-white">
                        {(tx.symbol || tx.symbolFrom).substring(0, 1)}
                      </span>
                    </div>
                    {/* Transaction Type Badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-background border-2 border-card flex items-center justify-center">
                      {getTransactionTypeIcon(tx.type)}
                    </div>
                  </div>
                  <div className="font-medium text-sm">
                    {formatTransactionType(tx)}
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className="font-medium text-sm">
                    {amount.primary}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {amount.secondary}
                  </div>
                </div>

                {/* Date */}
                <div className="text-right text-sm">
                  {tx.timestamp}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12">
            <p className="text-sm font-medium text-muted-foreground mb-1">No transactions found</p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function AssetsTab({ assets, totalValue }) {
  const [assetSearch, setAssetSearch] = useState('')

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(assetSearch.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(assetSearch.toLowerCase())
  )

  // Calculate asset distribution for pie chart
  const chartData = assets.slice(0, 5).map(asset => ({
    name: asset.symbol,
    value: asset.value,
    color: asset.color,
    percentage: ((asset.value / totalValue) * 100).toFixed(1)
  }))

  const CustomLegend = ({ payload }) => {
    return (
      <div className="space-y-3">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium">{entry.percentage}%</span>
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
            <span className="text-muted-foreground">
              ${entry.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Asset Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Asset Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            {/* Pie Chart */}
            <div className="flex-shrink-0">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                            <p className="text-sm font-semibold">{payload[0].name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {payload[0].payload.percentage}%
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex-1">
              <CustomLegend payload={chartData} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search assets..."
          value={assetSearch}
          onChange={(e) => setAssetSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Asset List */}
      <div className="space-y-3">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <Card key={asset.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: asset.color }}
                    >
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {asset.balance.toLocaleString()} {asset.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm flex items-center justify-end gap-1 ${asset.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {asset.change24h > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
                    </div>
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
            <p className="text-sm font-medium text-muted-foreground mb-1">No assets found</p>
            <p className="text-xs text-muted-foreground">Try searching with a different asset name or symbol</p>
          </div>
        )}
      </div>

      {/* Loading spinner at the bottom */}
      {filteredAssets.length > 0 && (
        <div className="flex items-center justify-center py-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}

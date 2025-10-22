import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Grid3x3, List, ArrowUpDown, TrendingUp, Users, Activity, DollarSign, Calendar } from 'lucide-react'

export default function FilterBar({ activeFilter, onFilterChange, viewMode = 'grid', onViewModeChange, sortBy = 'marketcap', onSortChange }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'New' },
    { id: 'graduated', label: 'Graduated' },
  ]

  const sortOptions = [
    { value: 'marketcap', label: 'Market Cap', sublabel: 'High to Low', icon: TrendingUp },
    { value: 'holders', label: 'Holders', sublabel: 'High to Low', icon: Users },
    { value: 'volume', label: 'Volume', sublabel: 'High to Low', icon: Activity },
    { value: 'price', label: 'Price', sublabel: 'High to Low', icon: DollarSign },
  ]

  return (
    <Card className="p-1 flex items-center justify-between">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? 'secondary' : 'ghost'}
            size="sm"
            className="h-9 px-4"
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Sort and View Mode */}
      <div className="flex items-center gap-2">
        {/* Sort Dropdown */}
        {onSortChange && (
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-9 w-[180px] gap-2">
              <ArrowUpDown className="w-4 h-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{option.label}: <span className="text-muted-foreground">{option.sublabel}</span></span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )}

        {/* View Mode Toggle */}
        {onViewModeChange && (
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange('grid')}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Grid3x3, List } from 'lucide-react'

export default function FilterBar({ activeFilter, onFilterChange, viewMode = 'grid', onViewModeChange }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'New' },
    { id: 'graduated', label: 'Graduated' },
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
    </Card>
  )
}

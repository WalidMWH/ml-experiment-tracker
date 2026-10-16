import { Search } from 'lucide-react'
import { STATUS_OPTIONS } from '../interfaces/experiment'

const FILTERS = ['All', ...STATUS_OPTIONS]

// Search box + status filter buttons above the list
function Toolbar({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative w-full sm:max-w-xs">
        <span className="sr-only">Search experiments</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search model or dataset"
          className="w-full rounded-xl border border-line bg-surface/80 py-2 pl-9 pr-3 text-sm placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
        />
      </label>

      <div
        role="group"
        aria-label="Filter by status"
        className="flex gap-1 overflow-x-auto rounded-xl border border-line bg-surface/80 p-1"
      >
        {FILTERS.map((filter) => {
          const isActive = statusFilter === filter
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => onStatusChange(filter)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                isActive ? 'bg-accent text-on-accent' : 'text-muted hover:text-fg'
              }`}
            >
              {filter}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Toolbar
import { useState } from 'react'
import { CalendarDays, Database, Pencil, Trash2 } from 'lucide-react'
import { STATUS_STYLES } from '../interfaces/experiment'

const smallButton =
  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent'

function ExperimentItem({ experiment, isEditing, onEdit, onDelete }) {
  // true = show "Delete this experiment?" instead of the normal buttons
  const [confirming, setConfirming] = useState(false)

  const style = STATUS_STYLES[experiment.status] ?? STATUS_STYLES.Running
  const barWidth = Math.min(100, Math.max(0, experiment.accuracy))

  return (
    <li
      className={`rounded-2xl border bg-surface/90 p-5 backdrop-blur transition-colors ${
        isEditing ? 'border-accent' : 'border-line hover:border-accent/50'
      }`}
    >
      {/* Top: name, dataset, date and status */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold">{experiment.modelName}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Database className="size-3.5" />
              {experiment.dataset}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {experiment.createdAt}
            </span>
          </p>
        </div>

        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>
          <span className="relative flex size-2">
            {experiment.status === 'Running' && (
              <span className={`absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping ${style.dot}`} />
            )}
            <span className={`relative inline-flex size-2 rounded-full ${style.dot}`} />
          </span>
          {experiment.status}
        </span>
      </div>

      {/* Middle: accuracy bar */}
      <div className="mt-4 flex items-center gap-3">
        <div
          role="meter"
          aria-label="Accuracy"
          aria-valuenow={barWidth}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2"
        >
          <div className={`h-full rounded-full ${style.dot}`} style={{ width: `${barWidth}%` }} />
        </div>
        <span className="w-16 text-right font-semibold tabular-nums">{experiment.accuracy}%</span>
      </div>

      {experiment.notes && <p className="mt-3 text-sm text-muted">{experiment.notes}</p>}

      {/* Bottom: actions */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-line pt-3">
        {confirming ? (
          <>
            <span className="mr-auto text-sm">Delete this experiment?</span>
            <button type="button" onClick={() => setConfirming(false)}
              className={`${smallButton} text-muted hover:bg-surface-2 hover:text-fg`}>
              Keep
            </button>
            <button type="button" onClick={() => onDelete(experiment.id)}
              className={`${smallButton} bg-failed text-on-accent hover:opacity-90`}>
              <Trash2 className="size-4" />
              Delete
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => onEdit(experiment)}
              className={`${smallButton} text-muted hover:bg-surface-2 hover:text-fg`}>
              <Pencil className="size-4" />
              Edit
            </button>
            <button type="button" onClick={() => setConfirming(true)}
              className={`${smallButton} text-muted hover:bg-failed/10 hover:text-failed`}>
              <Trash2 className="size-4" />
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default ExperimentItem
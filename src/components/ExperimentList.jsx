import { FlaskConical } from 'lucide-react'
import ExperimentItem from './ExperimentItem'

// Shown when there is nothing to list
function EmptyState({ title, text }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface/50 px-6 py-14 text-center">
      <FlaskConical className="mx-auto size-8 text-muted" />
      <p className="mt-3 font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{text}</p>
    </div>
  )
}

function ExperimentList({ experiments, totalCount, editingId, onEdit, onDelete }) {
  if (totalCount === 0) {
    return (
      <EmptyState
        title="No experiments yet"
        text="Add your first training run with the form. It will appear here."
      />
    )
  }

  if (experiments.length === 0) {
    return (
      <EmptyState
        title="No matches"
        text="No experiments match this search or filter. Try another name or choose All."
      />
    )
  }

  return (
    <ul className="space-y-3">
      {experiments.map((exp) => (
        <ExperimentItem
          key={exp.id}
          experiment={exp}
          isEditing={exp.id === editingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default ExperimentList
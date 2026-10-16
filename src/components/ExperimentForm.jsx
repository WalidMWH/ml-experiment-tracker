import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { STATUS_OPTIONS } from '../interfaces/experiment'

const labelStyle = 'mb-1.5 block text-sm font-medium text-muted'
const inputStyle =
  'w-full rounded-xl border border-line bg-bg/60 px-3 py-2.5 text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25'

function ExperimentForm({ initialData, onSubmit, onCancel }) {
  const isEditing = Boolean(initialData)

  // Start with the experiment's values when editing, empty when adding
  const [modelName, setModelName] = useState(initialData?.modelName ?? '')
  const [dataset, setDataset] = useState(initialData?.dataset ?? '')
  const [accuracy, setAccuracy] = useState(initialData?.accuracy ?? '')
  const [status, setStatus] = useState(initialData?.status ?? 'Running')
  const [notes, setNotes] = useState(initialData?.notes ?? '')

  function handleSubmit(event) {
    event.preventDefault()
    if (!modelName.trim() || !dataset.trim()) return

    onSubmit({
      id: initialData?.id ?? crypto.randomUUID(), // keep the same id when editing
      modelName: modelName.trim(),
      dataset: dataset.trim(),
      accuracy: Number(accuracy) || 0,
      status,
      notes: notes.trim(),
      createdAt: initialData?.createdAt ?? new Date().toLocaleDateString('en-CA'),
    })

    if (!isEditing) {
      setModelName('')
      setDataset('')
      setAccuracy('')
      setStatus('Running')
      setNotes('')
    }
  }

  return (
    <form
      id="experiment-form"
      onSubmit={handleSubmit}
      className={`scroll-mt-24 rounded-2xl border bg-surface/90 p-5 shadow-sm backdrop-blur lg:sticky lg:top-24 ${
        isEditing ? 'border-accent ring-4 ring-accent/15' : 'border-line'
      }`}
    >
      <h2 className="font-display text-3xl">{isEditing ? 'Edit experiment' : 'New experiment'}</h2>
      <p className="mb-5 mt-1 text-sm text-muted">
        {isEditing ? `Updating ${initialData.modelName}` : 'Record a training run and its result.'}
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="modelName" className={labelStyle}>Model</label>
          <input id="modelName" required className={inputStyle} placeholder="ResNet-50"
            value={modelName} onChange={(e) => setModelName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="dataset" className={labelStyle}>Dataset</label>
          <input id="dataset" required className={inputStyle} placeholder="CIFAR-10"
            value={dataset} onChange={(e) => setDataset(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="accuracy" className={labelStyle}>Accuracy %</label>
            <input id="accuracy" type="number" step="0.1" min="0" max="100" className={inputStyle}
              placeholder="92.5" value={accuracy} onChange={(e) => setAccuracy(e.target.value)} />
          </div>
          <div>
            <label htmlFor="status" className={labelStyle}>Status</label>
            <select id="status" className={inputStyle} value={status}
              onChange={(e) => setStatus(e.target.value)}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelStyle}>Notes (optional)</label>
          <textarea id="notes" rows="3" className={`${inputStyle} resize-none`}
            placeholder="lr=1e-3, batch 64, 30 epochs"
            value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 font-semibold text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {isEditing ? <Check className="size-4" /> : <Plus className="size-4" />}
          {isEditing ? 'Save changes' : 'Add experiment'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-line px-4 py-2.5 font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ExperimentForm
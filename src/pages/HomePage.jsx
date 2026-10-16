import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import StatsBar from '../components/StatsBar'
import Toolbar from '../components/Toolbar'
import ExperimentForm from '../components/ExperimentForm'
import ExperimentList from '../components/ExperimentList'

function HomePage() {
  // All experiments, saved in localStorage automatically
  const [experiments, setExperiments] = useLocalStorage('experiments', [])

  // Which experiment is being edited (null = adding a new one)
  const [editingExperiment, setEditingExperiment] = useState(null)

  // Search text and status filter for the list
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // CREATE: new experiments go to the top
  function addExperiment(newExperiment) {
    setExperiments([newExperiment, ...experiments])
  }

  // UPDATE: replace the matching experiment, keep the rest
  function updateExperiment(updated) {
    setExperiments(experiments.map((exp) => (exp.id === updated.id ? updated : exp)))
    setEditingExperiment(null)
  }

  // DELETE: keep everything except the one with this id
  function deleteExperiment(id) {
    setExperiments(experiments.filter((exp) => exp.id !== id))
    if (editingExperiment?.id === id) setEditingExperiment(null)
  }

  // The form calls this; we decide whether it's an add or an update
  function handleSubmit(experiment) {
    if (editingExperiment) updateExperiment(experiment)
    else addExperiment(experiment)
  }

  // Start editing and scroll the form into view (useful on phones)
  function startEditing(experiment) {
    setEditingExperiment(experiment)
    document.getElementById('experiment-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  // READ: apply the search and the status filter
  const query = search.trim().toLowerCase()
  const visibleExperiments = experiments.filter((exp) => {
    const matchesStatus = statusFilter === 'All' || exp.status === statusFilter
    const matchesSearch =
      exp.modelName.toLowerCase().includes(query) || exp.dataset.toLowerCase().includes(query)
    return matchesStatus && matchesSearch
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-5xl tracking-tight sm:text-6xl">Experiments</h1>
        <p className="mt-2 max-w-xl text-muted">
          Log every training run, compare results, and keep an eye on what is still running.
        </p>
      </header>

      <StatsBar experiments={experiments} />

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[22rem_1fr]">
        <ExperimentForm
          key={editingExperiment ? editingExperiment.id : 'new'}
          initialData={editingExperiment}
          onSubmit={handleSubmit}
          onCancel={() => setEditingExperiment(null)}
        />

        <section aria-label="Experiment list">
          <Toolbar
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
          <ExperimentList
            experiments={visibleExperiments}
            totalCount={experiments.length}
            editingId={editingExperiment?.id}
            onEdit={startEditing}
            onDelete={deleteExperiment}
          />
        </section>
      </div>
    </main>
  )
}

export default HomePage
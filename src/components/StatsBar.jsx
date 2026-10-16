// A summary row calculated from the experiments list
function StatsBar({ experiments }) {
  const completed = experiments.filter((exp) => exp.status === 'Completed')
  const runningCount = experiments.filter((exp) => exp.status === 'Running').length

  // Best completed run = the one with the highest accuracy
  const best = completed.reduce(
    (top, exp) => (top === null || exp.accuracy > top.accuracy ? exp : top),
    null,
  )

  const stats = [
    { label: 'Total runs', value: experiments.length },
    { label: 'Completed', value: completed.length },
    { label: 'Running', value: runningCount },
    { label: 'Best accuracy', value: best ? `${best.accuracy}%` : '–', detail: best?.modelName },
  ]

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface/90 px-5 py-4">
          <dt className="text-sm text-muted">{stat.label}</dt>
          <dd className="mt-1 font-display text-4xl tabular-nums">{stat.value}</dd>
          {stat.detail && <dd className="truncate text-sm text-muted">{stat.detail}</dd>}
        </div>
      ))}
    </dl>
  )
}

export default StatsBar
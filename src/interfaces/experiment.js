// Blueprint of one experiment:
// {
//   id:        string   unique id
//   modelName: string   e.g. "ResNet-50"
//   dataset:   string   e.g. "CIFAR-10"
//   accuracy:  number   0 to 100
//   status:    string   one of STATUS_OPTIONS
//   notes:     string   optional, e.g. "lr=1e-3, batch 64"
//   createdAt: string   "YYYY-MM-DD"
// }

export const STATUS_OPTIONS = ['Running', 'Completed', 'Failed']

// How each status looks (badge colors + the color of its dot and accuracy bar)
export const STATUS_STYLES = {
  Running: { badge: 'bg-running/15 text-running', dot: 'bg-running' },
  Completed: { badge: 'bg-done/15 text-done', dot: 'bg-done' },
  Failed: { badge: 'bg-failed/15 text-failed', dot: 'bg-failed' },
}
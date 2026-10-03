export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return <div className="progress-indicator">
    <span id="material-progress" className="progress-label">{current} dari {total}</span>
    <div className="progress-dots" aria-hidden="true">{Array.from({ length: total }, (_, index) =>
      <span key={index} className={index < current ? 'progress-dot is-reached' : 'progress-dot'} />,
    )}</div>
  </div>
}

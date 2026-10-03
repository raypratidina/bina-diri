import { ArrowLeft } from 'lucide-react'
import { IconButton } from './IconButton'

export function PageHeader({ title, description, backTo, backLabel = 'Kembali ke Beranda' }: {
  title: string; description?: string; backTo?: string; backLabel?: string
}) {
  return <header className="page-header">
    {backTo && <nav aria-label="Navigasi kembali"><IconButton to={backTo} label={backLabel} icon={ArrowLeft} /></nav>}
    <div className="page-heading"><h1 tabIndex={-1}>{title}</h1>{description && <p>{description}</p>}</div>
  </header>
}

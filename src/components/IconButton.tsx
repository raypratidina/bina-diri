import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type IconButtonProps = { label: string; icon: LucideIcon } & (
  | { to: string; onClick?: never }
  | { to?: never; onClick: () => void }
)

export function IconButton({ to, onClick, label, icon: Icon }: IconButtonProps) {
  const content = <Icon aria-hidden="true" size={24} />
  return to !== undefined
    ? <Link to={to} aria-label={label} className="icon-button pressable">{content}</Link>
    : <button type="button" onClick={onClick} aria-label={label} className="icon-button pressable">{content}</button>
}

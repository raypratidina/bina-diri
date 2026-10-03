import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Appearance = { variant?: 'primary' | 'secondary'; children: ReactNode; className?: string }
type ButtonProps = Appearance & (
  | ({ to: string } & Omit<LinkProps, 'to' | 'className' | 'children'>)
  | ({ to?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
)

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `button pressable button--${variant} ${className}`
  if (props.to !== undefined) return <Link {...props} className={classes} />
  return <button type="button" {...props} className={classes} />
}

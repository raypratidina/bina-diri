import { Check, House } from 'lucide-react'
import { Button } from './Button'
import { IllustrationContainer } from './IllustrationContainer'

export function CompletionScreen({ description, image, imageAlt, primaryTo, primaryLabel }: {
  description: string; image: string; imageAlt: string; primaryTo: string; primaryLabel: string
}) {
  return <section className="completion-screen learning-panel">
    <span className="completion-mark" aria-hidden="true"><Check size={32} strokeWidth={3} /></span>
    <h1 tabIndex={-1}>Hebat!</h1>
    <IllustrationContainer src={image} alt={imageAlt} className="learning-illustration" eager />
    <p className="completion-description">{description.replace(/^Hebat!\s*/, '')}</p>
    <nav className="completion-actions" aria-label="Setelah belajar">
      <Button to={primaryTo}>{primaryLabel}</Button>
      <Button to="/" variant="secondary"><House size={22} aria-hidden="true" />Kembali ke Beranda</Button>
    </nav>
  </section>
}

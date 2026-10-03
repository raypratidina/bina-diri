import { ArrowLeft, House, RotateCcw } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './Button'
import { IllustrationContainer } from './IllustrationContainer'
import { PageHeader } from './PageHeader'

export function LoadingState() {
  return <main className="initial-loading"><h1>Bina Diri</h1><p role="status">Memuat...</p></main>
}

export function Placeholder({ title, message, image, imageAlt, theme = 'yellow', backTo, backLabel }: {
  title: string; message: string; image: string; imageAlt: string; theme?: string; backTo: string; backLabel: string
}) {
  return <><PageHeader title={title} backTo={backTo} backLabel={backLabel} />
    <section className={`placeholder-panel theme-${theme}`} aria-label={message}>
      <IllustrationContainer src={image} alt={imageAlt} eager />
      <p className="placeholder-message">{message}</p>
      <Button to={backTo}><ArrowLeft size={22} aria-hidden="true" />{backLabel}</Button>
    </section>
  </>
}

export function ErrorState({ material = false }: { material?: boolean }) {
  return <><PageHeader title={material ? 'Materi tidak ditemukan.' : 'Halaman tidak ditemukan.'} />
    <section className="error-panel"><IllustrationContainer src="/assets/illustrations/system/book.svg" alt="Buku terbuka" eager />
      <p>Yuk, kembali dan pilih lagi.</p>
      <Button to={material ? '/materials' : '/'}><House aria-hidden="true" size={22} />{material ? 'Kembali ke Materi' : 'Kembali ke Beranda'}</Button>
    </section>
  </>
}

export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Bina Diri gagal ditampilkan', error, info) }
  render() {
    if (this.state.failed) return <main className="initial-loading"><h1>Halaman belum berhasil dibuka.</h1><p>Yuk, coba lagi.</p><Button onClick={() => window.location.assign('/')}><RotateCcw aria-hidden="true" />Coba Lagi</Button></main>
    return this.props.children
  }
}

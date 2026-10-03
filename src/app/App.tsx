import { useLayoutEffect } from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Home } from './Home'
import { MaterialList } from '../features/materials/MaterialList'
import { MaterialFlow } from '../features/materials/MaterialFlow'
import { QuizPlaceholder } from '../features/quiz/QuizPlaceholder'
import { AppErrorBoundary, ErrorState } from '../components/States'

function Layout() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    // MaterialFlow also manages focus when a step changes without a route change.
    if (document.querySelector('.material-flow')) return
    window.scrollTo(0, 0)
    const heading = document.querySelector<HTMLElement>('h1')
    heading?.focus({ preventScroll: true })
    document.title = `${heading?.textContent ?? 'Beranda'} — Bina Diri`
  }, [pathname])
  return <>
    <a className="skip-link" href="#main">Langsung ke isi</a>
    <div className="app-shell">
      <header className="brand-header"><Link to="/" className="brand" aria-label="Bina Diri — Beranda"><span className="brand-symbol" aria-hidden="true"><Heart size={25} strokeWidth={2.5} /></span>Bina Diri<span className="brand-dot" aria-hidden="true">.</span></Link><span className="brand-caption">Belajar mandiri, setiap hari</span></header>
      <main id="main" tabIndex={-1}><Outlet /></main>
      <footer className="app-footer"><Heart size={16} aria-hidden="true" /><span>Langkah kecil, semakin mandiri.</span></footer>
    </div>
  </>
}

export function App() {
  return <AppErrorBoundary><BrowserRouter><Routes><Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="materials" element={<MaterialList />} />
    <Route path="materials/:materialId/*" element={<MaterialFlow />} />
    <Route path="quiz" element={<QuizPlaceholder />} />
    <Route path="*" element={<ErrorState />} />
  </Route></Routes></BrowserRouter></AppErrorBoundary>
}

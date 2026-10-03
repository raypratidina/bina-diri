import { useLayoutEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { materials } from '../../data/materials'
import type { Material } from '../../types/material'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { IllustrationContainer } from '../../components/IllustrationContainer'
import { ProgressIndicator } from '../../components/ProgressIndicator'
import { CompletionScreen } from '../../components/CompletionScreen'
import { ErrorState } from '../../components/States'
import { freshMaterialSession, transitionMaterial, type MaterialAction } from './materialSession'

export function MaterialFlow() {
  const { materialId } = useParams()
  const material = materials.find(item => item.id === materialId)
  return material ? <MaterialJourney key={material.id} material={material} /> : <ErrorState material />
}

function MaterialJourney({ material }: { material: Material }) {
  const base = `/materials/${material.id}`
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [session, setSession] = useState(freshMaterialSession)
  // Synchronous ref prevents queued clicks from reading an old React render.
  const sessionRef = useRef(session)
  const page = pathname.replace(/\/$/, '')
  const isIntro = page === base
  const isLearning = page === `${base}/learn`
  const isComplete = page === `${base}/complete`
  const validSession = isIntro || (isLearning && session.phase === 'learning') || (isComplete && session.phase === 'complete')

  useLayoutEffect(() => {
    // Browser Back to intro resets; revisiting starts a fresh learning flow.
    if (isIntro && sessionRef.current.phase !== 'intro') {
      const fresh = freshMaterialSession()
      sessionRef.current = fresh
      setSession(fresh)
    }
  }, [isIntro])

  useLayoutEffect(() => {
    if (!validSession) return
    const heading = document.querySelector<HTMLElement>('.material-flow h1')
    heading?.focus({ preventScroll: true })
    window.scrollTo(0, 0)
    document.title = isLearning
      ? `${session.currentStepIndex + 1} dari ${material.steps.length} · ${material.title} — Bina Diri`
      : `${isComplete ? 'Hebat!' : material.title} — Bina Diri`
  }, [page, session.currentStepIndex, validSession, isLearning, isComplete, material])

  function send(type: Exclude<MaterialAction['type'], 'reset'>) {
    const previous = sessionRef.current
    const next = transitionMaterial(previous, { type, now: performance.now() }, material.steps.length)
    if (next === previous) return
    sessionRef.current = next
    setSession(next)
    if (next.phase !== previous.phase) {
      navigate(next.phase === 'intro' ? base : `${base}/${next.phase === 'learning' ? 'learn' : 'complete'}`,
        { replace: next.phase !== 'learning' })
    }
  }

  if (!isIntro && !isLearning && !isComplete) return <ErrorState />
  // React may commit local state before Router commits its transition.
  // Completion is valid here; never mistake that intermediate render for an invalid session.
  if (isLearning && session.phase === 'complete') return <Navigate to={`${base}/complete`} replace />
  if (!validSession) return <Navigate to={base} replace />

  const step = material.steps[session.currentStepIndex]
  return <div className={`material-flow theme-${material.theme}`}>
    {isComplete ? <CompletionScreen description={material.completion.text} image={material.completion.image} imageAlt={material.completion.imageAlt} primaryTo="/materials" primaryLabel="Pilih Materi Lain" /> : <>
      <header className="learning-header">
        <nav aria-label="Navigasi materi">{isIntro
          ? <IconButton to="/materials" label="Kembali ke Materi" icon={ArrowLeft} />
          : <IconButton onClick={() => send('back')} label={session.currentStepIndex === 0 ? 'Kembali ke awal materi' : 'Langkah sebelumnya'} icon={ArrowLeft} />}
        </nav>
        <p className="learning-activity">{material.title}</p>
      </header>
      <section className="learning-panel" aria-label={material.title}>
        {isLearning && <ProgressIndicator current={session.currentStepIndex + 1} total={material.steps.length} />}
        <h1 tabIndex={-1} aria-describedby={isLearning ? 'material-progress' : undefined}>{isIntro ? material.intro.text : step.text}</h1>
        <IllustrationContainer key={isIntro ? 'intro' : step.id} src={isIntro ? material.intro.image : step.image} alt={isIntro ? material.intro.imageAlt : step.imageAlt} className="learning-illustration" eager />
        <Button className="learning-next" onClick={() => send(isIntro ? 'start' : 'next')}>{isIntro ? <><Play size={22} aria-hidden="true" />Mulai</> : <>Lanjut<ArrowRight size={22} aria-hidden="true" /></>}</Button>
      </section>
    </>}
  </div>
}

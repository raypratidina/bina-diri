import { useEffect, useState, type CSSProperties } from 'react'
import { homeThumbnails } from '../data/homeThumbnails'
import { IllustrationContainer } from './IllustrationContainer'
import '../styles/home-thumbnails.css'

type ThumbnailKind = keyof typeof homeThumbnails
const readiness: Partial<Record<ThumbnailKind, Promise<void>>> = {}
const descriptions = {
  materials: 'Anak tersenyum sambil membaca buku bergambar.',
  quiz: 'Anak tersenyum memegang papan soal dengan tanda tanya dan jawaban centang.',
}

function preload(kind: ThumbnailKind) {
  return readiness[kind] ??= Promise.all(homeThumbnails[kind].layers.map(({ src }) => new Promise<void>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('Thumbnail asset unavailable'))
    image.src = src
  }))).then(() => undefined).catch((error: unknown) => {
    delete readiness[kind]
    throw error
  })
}

export function HomeThumbnail({ kind, selected, hovered, onComplete }: {
  kind: ThumbnailKind; selected: boolean; hovered: boolean; onComplete: () => void
}) {
  const [readyKind, setReadyKind] = useState<ThumbnailKind | null>(null)
  const [failedKind, setFailedKind] = useState<ThumbnailKind | null>(null)
  const scene = homeThumbnails[kind]
  const ready = readyKind === kind
  const playing = ready && (selected || hovered)

  useEffect(() => {
    let active = true
    preload(kind).then(() => { if (active) setReadyKind(kind) }, () => { if (active) setFailedKind(kind) })
    return () => { active = false }
  }, [kind])

  useEffect(() => {
    if (!selected) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches || failedKind === kind) {
      onComplete()
      return
    }
    const preferenceChanged = () => { if (reducedMotion.matches) onComplete() }
    reducedMotion.addEventListener('change', preferenceChanged)
    // Animation end normally navigates. Bound the wait if assets stall or events are suppressed.
    const timeout = window.setTimeout(onComplete, ready ? scene.durationMs + 500 : 4000)
    return () => {
      window.clearTimeout(timeout)
      reducedMotion.removeEventListener('change', preferenceChanged)
    }
  }, [selected, ready, failedKind, kind, scene.durationMs, onComplete])

  return <div className="illustration home-thumbnail">
    {!ready && <IllustrationContainer src={`/assets/illustrations/system/${kind === 'materials' ? 'book' : 'quiz'}.svg`} alt={kind === 'materials' ? 'Buku bergambar untuk belajar.' : 'Kartu untuk bermain kuis.'} eager />}
    <svg viewBox="0 0 530 530" width={530} height={530}
      className={`home-thumbnail-scene${ready ? ' is-ready' : ''}${selected ? ' is-selected' : ''}`}
      role="img" aria-label={descriptions[kind]} aria-hidden={!ready}
      data-node-id={scene.nodeId} style={{ '--thumbnail-duration': `${scene.durationMs}ms` } as CSSProperties}>
      {scene.layers.map(({ id, src, x, y, width, height, style }, index) => (
        <g key={`${id}-${selected ? 'selected' : 'preview'}`} transform={`translate(${x} ${y})`} aria-hidden="true">
          <g className="home-thumbnail-layer" data-node-id={id} style={{ ...style, animationName: playing ? style.animationName : 'none' } as CSSProperties}
            onAnimationEnd={selected && index === 0 ? event => { if (event.target === event.currentTarget) onComplete() } : undefined}>
            <image href={src} width={width} height={height} preserveAspectRatio="none" />
          </g>
        </g>
      ))}
    </svg>
  </div>
}

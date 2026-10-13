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

export function HomeThumbnail({ kind }: { kind: ThumbnailKind }) {
  const [readyKind, setReadyKind] = useState<ThumbnailKind | null>(null)
  const scene = homeThumbnails[kind]
  const ready = readyKind === kind

  useEffect(() => {
    let active = true
    preload(kind).then(() => { if (active) setReadyKind(kind) }, () => { /* Keep the existing illustration when an asset fails. */ })
    return () => { active = false }
  }, [kind])

  return <div className="illustration home-thumbnail">
    {!ready && <IllustrationContainer src={`/assets/illustrations/system/${kind === 'materials' ? 'book' : 'quiz'}.svg`} alt={kind === 'materials' ? 'Buku bergambar untuk belajar.' : 'Kartu untuk bermain kuis.'} eager />}
    <svg viewBox="0 0 530 530" width={530} height={530}
      className={`home-thumbnail-scene${ready ? ' is-ready' : ''}`}
      role="img" aria-label={descriptions[kind]} aria-hidden={!ready}
      data-node-id={scene.nodeId} style={{ '--thumbnail-duration': `${scene.durationMs}ms` } as CSSProperties}>
      {scene.layers.map(({ id, src, x, y, width, height, style }) => (
        <g key={id} transform={`translate(${x} ${y})`} aria-hidden="true">
          <g className="home-thumbnail-layer" data-node-id={id} style={style as CSSProperties}>
            <image href={src} width={width} height={height} preserveAspectRatio="none" />
          </g>
        </g>
      ))}
    </svg>
  </div>
}

import { useEffect, useState, type CSSProperties } from 'react'
import { celebrationLayers } from '../data/celebration'
import { IllustrationContainer } from './IllustrationContainer'
import '../styles/celebration.css'

// Start the whole cohort together only after all original vector assets are ready.
let assetReadiness: Promise<void> | undefined
function preloadAssets() {
  return assetReadiness ??= Promise.all(celebrationLayers.map(({ src }) => new Promise<void>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('Celebration asset unavailable'))
    image.src = src
  }))).then(() => undefined).catch((error: unknown) => {
    assetReadiness = undefined
    throw error
  })
}

const layers = celebrationLayers.map((layer) => ({
  ...layer,
  style: Object.fromEntries(layer.translate.map((value, index) => [`--move-${index}`, value])) as CSSProperties,
}))

export function CompletionCelebration({ fallbackImage, fallbackAlt }: { fallbackImage: string; fallbackAlt: string }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')

  useEffect(() => {
    let active = true
    preloadAssets().then(
      () => { if (active) setStatus('ready') },
      () => { if (active) setStatus('failed') },
    )
    return () => { active = false }
  }, [])

  if (status === 'failed') {
    return <IllustrationContainer src={fallbackImage} alt={fallbackAlt} className="learning-illustration" eager />
  }

  return <div className="completion-celebration">
    <svg viewBox="0 0 530 578" width={530} height={578}
      className={`celebration-scene is-${status}`}
      role="img" aria-label="Anak tersenyum mengangkat kedua tangan untuk merayakan keberhasilan belajar.">
      {layers.map(({ id, src, x, y, width, height, style }) => (
        <g key={id} transform={`translate(${x} ${y})`} aria-hidden="true">
          <g className="celebration-layer" data-node-id={id} style={style}>
            <image href={src} width={width} height={height} preserveAspectRatio="none" />
          </g>
        </g>
      ))}
    </svg>
  </div>
}

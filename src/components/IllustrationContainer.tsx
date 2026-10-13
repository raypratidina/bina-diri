import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import type { MaterialArtwork } from '../types/material'

export function IllustrationContainer({ src, alt, className = '', eager = false, layout, crop }: {
  src: string; alt: string; className?: string; eager?: boolean; layout?: 'portrait'; crop?: MaterialArtwork['imageCrop']
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const image = <img src={src} alt={alt} width={layout === 'portrait' ? 1024 : 240} height={layout === 'portrait' ? 1024 : 180}
    style={layout === 'portrait' && crop ? { width: `${crop.width}%`, height: `${crop.height}%`, left: `${crop.left}%`, top: `${crop.top}%`, right: 'auto', bottom: 'auto', maxWidth: 'none' } : undefined}
    loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailedSrc(src)} />
  return <div className={`illustration ${layout === 'portrait' ? 'illustration--portrait' : ''} ${className}`}>
    {failedSrc === src
      ? <div className="image-fallback" role="img" aria-label={`Gambar belum tersedia: ${alt}`}><ImageOff size={40} aria-hidden="true" /><span>Gambar belum tersedia.</span></div>
      : layout === 'portrait' ? <div className="illustration-portrait-frame">{image}</div> : image}
  </div>
}

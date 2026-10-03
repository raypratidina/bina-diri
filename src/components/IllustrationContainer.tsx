import { ImageOff } from 'lucide-react'
import { useState } from 'react'

export function IllustrationContainer({ src, alt, className = '', eager = false }: {
  src: string; alt: string; className?: string; eager?: boolean
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  return <div className={`illustration ${className}`}>
    {failedSrc === src
      ? <div className="image-fallback" role="img" aria-label={`Gambar belum tersedia: ${alt}`}><ImageOff size={40} aria-hidden="true" /><span>Gambar belum tersedia.</span></div>
      : <img src={src} alt={alt} width={240} height={180} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailedSrc(src)} />}
  </div>
}

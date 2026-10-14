import { ArrowRight, Heart } from 'lucide-react'
import { useCallback, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HomeThumbnail } from '../components/HomeThumbnail'

type Choice = 'materials' | 'quiz'

export function Home() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Choice | null>(null)
  const [hovered, setHovered] = useState<Choice | null>(null)
  const selection = useRef<Choice | null>(null)
  const finishSelection = useCallback(() => {
    const destination = selection.current
    if (!destination) return
    selection.current = null
    navigate(`/${destination}`)
  }, [navigate])

  function choose(event: MouseEvent<HTMLAnchorElement>, choice: Choice) {
    // Preserve native open-in-new-tab/window behavior.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (selection.current) return
    selection.current = choice
    setSelected(choice)
  }

  function preview(event: PointerEvent<HTMLAnchorElement>, choice: Choice) {
    if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setHovered(choice)
  }

  return <div className="home">
    <header className="home-intro"><span className="welcome-mark" aria-hidden="true"><Heart size={28} /></span><h1 tabIndex={-1}>Yuk, belajar <br /><span>merawat diri!</span></h1><p>Mau mulai dari mana?</p></header>
    <nav aria-label="Pilihan utama" className="home-choices">
      <Link to="/materials" className="home-card home-card--materials pressable" aria-labelledby="materi-title" aria-describedby="materi-description"
        onClick={event => choose(event, 'materials')} onPointerEnter={event => preview(event, 'materials')} onPointerLeave={() => setHovered(null)}
        aria-busy={selected === 'materials'} aria-disabled={selected !== null}>
        <div className="home-card-art"><HomeThumbnail kind="materials" selected={selected === 'materials'} hovered={selected === null && hovered === 'materials'} onComplete={finishSelection} /></div>
        <span className="home-card-content"><span id="materi-title" className="home-card-title">Materi</span><span id="materi-description" className="home-card-description">Belajar kegiatan sehari-hari</span><span className="home-card-action">Pilih Materi <ArrowRight size={24} aria-hidden="true" /></span></span>
      </Link>
      <Link to="/quiz" className="home-card home-card--quiz pressable" aria-labelledby="kuis-title" aria-describedby="kuis-description"
        onClick={event => choose(event, 'quiz')} onPointerEnter={event => preview(event, 'quiz')} onPointerLeave={() => setHovered(null)}
        aria-busy={selected === 'quiz'} aria-disabled={selected !== null}>
        <div className="home-card-art"><HomeThumbnail kind="quiz" selected={selected === 'quiz'} hovered={selected === null && hovered === 'quiz'} onComplete={finishSelection} /></div>
        <span className="home-card-content"><span id="kuis-title" className="home-card-title">Kuis</span><span id="kuis-description" className="home-card-description">Bermain tebak gambar</span><span className="home-card-action">Lihat Kuis <ArrowRight size={24} aria-hidden="true" /></span></span>
      </Link>
    </nav>
    <p className="home-note">Pelan-pelan, kita belajar bersama.</p>
  </div>
}

import { ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IllustrationContainer } from '../components/IllustrationContainer'

export function Home() {
  return <div className="home">
    <header className="home-intro"><span className="welcome-mark" aria-hidden="true"><Heart size={28} /></span><h1 tabIndex={-1}>Yuk, belajar <br /><span>merawat diri!</span></h1><p>Mau mulai dari mana?</p></header>
    <nav aria-label="Pilihan utama" className="home-choices">
      <Link to="/materials" className="home-card home-card--materials pressable" aria-labelledby="materi-title" aria-describedby="materi-description">
        <div className="home-card-art"><IllustrationContainer src="/assets/illustrations/system/book.svg" alt="Buku terbuka dengan gambar kaos dan sikat gigi" eager /></div>
        <span className="home-card-content"><span id="materi-title" className="home-card-title">Materi</span><span id="materi-description" className="home-card-description">Belajar kegiatan sehari-hari</span><span className="home-card-action">Pilih Materi <ArrowRight size={24} aria-hidden="true" /></span></span>
      </Link>
      <Link to="/quiz" className="home-card home-card--quiz pressable" aria-labelledby="kuis-title" aria-describedby="kuis-description">
        <div className="home-card-art"><IllustrationContainer src="/assets/illustrations/system/quiz.svg" alt="Kartu bergambar kaos, sendok, dan sikat gigi" eager /></div>
        <span className="home-card-content"><span id="kuis-title" className="home-card-title">Kuis</span><span id="kuis-description" className="home-card-description">Bermain tebak gambar</span><span className="home-card-action">Lihat Kuis <ArrowRight size={24} aria-hidden="true" /></span></span>
      </Link>
    </nav>
    <p className="home-note">Pelan-pelan, kita belajar bersama.</p>
  </div>
}

import type { MaterialArtwork } from '../types/material'

// Original Figma artwork, stored locally. Node-to-step mapping: docs/ASSET_MAPPING.md.
const portrait = (path: string, imageAlt: string): MaterialArtwork => ({
  image: `/assets/illustrations/figma/${path}.png`, imageAlt, imageLayout: 'portrait',
})

const dressedChild = portrait('dressing/tidy-shirt', 'Anak memakai kaos bersih dan merapikan bagian bawahnya.')
// Exact image bounds emitted by Figma for node 74:4.
const brushingCloseUp = { width: 181.82, height: 166.67, left: -40.91, top: -6.67 }

export const materialArtwork: Partial<Record<string, {
  thumbnail: MaterialArtwork
  intro?: MaterialArtwork
  steps: [MaterialArtwork, MaterialArtwork, MaterialArtwork, MaterialArtwork, MaterialArtwork, MaterialArtwork]
}>> = {
  'tooth-brushing': {
    thumbnail: portrait('tooth-brushing/thumbnail', 'Anak memegang sikat gigi di dekat mulut, siap menggosok gigi.'),
    steps: [
      portrait('tooth-brushing/take-brush', 'Tampak dekat tangan mengambil sikat gigi dari gelas di atas meja.'),
      portrait('tooth-brushing/apply-toothpaste', 'Tampak dekat tangan memberi pasta gigi pada bulu sikat.'),
      { ...portrait('tooth-brushing/brush-front', 'Tampak dekat anak menyikat gigi bagian depan.'), imageCrop: brushingCloseUp },
      portrait('tooth-brushing/brush-sides', 'Tampak dekat anak menggerakkan sikat pada gigi bagian samping.'),
      portrait('tooth-brushing/rinse-mouth', 'Anak berkumur sambil memegang gelas air.'),
      portrait('tooth-brushing/clean-brush', 'Anak membilas sikat gigi di bawah air keran.'),
    ],
  },
  bathing: {
    thumbnail: portrait('bathing/thumbnail', 'Pancuran mengalirkan air untuk mandi.'),
    intro: portrait('bathing/intro', 'Anak mandi di bawah pancuran sambil membersihkan tubuh.'),
    steps: [
      portrait('bathing/wet-body', 'Anak membasahi tubuh dengan air dari gayung.'),
      portrait('bathing/use-soap', 'Anak menuangkan sabun cair ke telapak tangan.'),
      portrait('bathing/wash-body', 'Anak menggosok tubuh dan lengan dengan busa sabun.'),
      portrait('bathing/rinse-body', 'Anak membilas busa sabun di bawah pancuran.'),
      portrait('bathing/dry-body', 'Anak mengeringkan tubuh dengan handuk kuning.'),
      dressedChild,
    ],
  },
  dressing: {
    thumbnail: portrait('dressing/thumbnail', 'Kaos bersih berwarna biru kehijauan.'),
    steps: [
      portrait('dressing/take-shirt', 'Anak mengambil dan memegang kaos bersih di depan tubuh.'),
      portrait('dressing/head-through-shirt', 'Anak menarik lubang leher kaos melewati kepala.'),
      // Revised source nodes now match the child's anatomical right/left.
      portrait('dressing/right-arm', 'Tampak dekat lengan kanan anak, di kiri gambar, melewati lengan kaos.'),
      portrait('dressing/left-arm', 'Tampak dekat lengan kiri anak, di kanan gambar, melewati lengan kaos.'),
      portrait('dressing/pull-shirt-down', 'Anak menarik bagian bawah kaos ke bawah dengan kedua tangan.'),
      dressedChild,
    ],
  },
  eating: {
    thumbnail: portrait('eating/thumbnail', 'Sepiring makanan, segelas air, dan sendok.'),
    steps: [
      portrait('eating/wash-hands', 'Anak mencuci kedua tangan dengan sabun di wastafel.'),
      portrait('eating/sit-at-table', 'Anak duduk rapi di depan meja berisi makanan dan air minum.'),
      portrait('eating/take-food', 'Anak mengambil makanan di piring menggunakan sendok.'),
      portrait('eating/food-to-mouth', 'Anak memasukkan sendok berisi makanan ke mulut.'),
      portrait('eating/chew', 'Anak mengunyah makanan dengan mulut tertutup.'),
      portrait('eating/tidy-table', 'Anak mengangkat piring dan membersihkan meja setelah makan.'),
    ],
  },
  shoes: {
    thumbnail: portrait('shoes/thumbnail', 'Anak berjalan dengan sepatu bertali yang sudah terpasang.'),
    steps: [
      portrait('shoes/take-shoes', 'Anak mengambil sepasang sepatu bertali dari rak.'),
      portrait('shoes/sit', 'Anak duduk di kursi, siap memakai sepatu di depan kakinya.'),
      portrait('shoes/right-foot', 'Kaki kanan berkaos kaki dimasukkan ke dalam sepatu kanan.'),
      portrait('shoes/left-foot', 'Kaki kiri berkaos kaki dimasukkan ke dalam sepatu kiri.'),
      portrait('shoes/fasten-shoes', 'Kedua tangan mengikat tali sepatu yang sudah dikenakan.'),
      portrait('shoes/tidy-shoes', 'Anak duduk dan merapikan kedua sepatu yang sudah dikenakan.'),
    ],
  },
}

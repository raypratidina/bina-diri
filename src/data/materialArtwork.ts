import type { MaterialArtwork } from '../types/material'

// Original Figma artwork, stored locally. Node-to-step mapping: docs/ASSET_MAPPING.md.
const portrait = (path: string, imageAlt: string): MaterialArtwork => ({
  image: `/assets/illustrations/figma/${path}.png`, imageAlt, imageLayout: 'portrait',
})

const dressedChild = portrait('dressing/tidy-shirt', 'Anak memakai kaos bersih dan merapikan bagian bawahnya.')

export const materialArtwork: Partial<Record<string, {
  thumbnail: MaterialArtwork
  intro?: MaterialArtwork
  steps: [MaterialArtwork, MaterialArtwork, MaterialArtwork, MaterialArtwork, MaterialArtwork, MaterialArtwork]
}>> = {
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
      portrait('dressing/head-through-shirt', 'Kepala anak sudah melewati lubang leher kaos.'),
      // The source layer labels are reversed; use the child's anatomical right/left.
      portrait('dressing/right-arm', 'Anak memasukkan lengan kanan, di kiri gambar, ke dalam lengan kaos.'),
      portrait('dressing/left-arm', 'Anak memasukkan lengan kiri, di kanan gambar, ke dalam lengan kaos.'),
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

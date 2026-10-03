import type { Material, MaterialSummary } from '../types/material'

const catalog: MaterialSummary[] = [
  { id: 'tooth-brushing', title: 'Menggosok Gigi', theme: 'pink', image: '/assets/illustrations/activities/tooth-brushing.svg', imageAlt: 'Sikat gigi dan gigi yang bersih' },
  { id: 'bathing', title: 'Mandi', theme: 'blue', image: '/assets/illustrations/activities/bathing.svg', imageAlt: 'Sabun dengan busa dan tetesan air' },
  { id: 'dressing', title: 'Memakai Baju', theme: 'mint', image: '/assets/illustrations/activities/dressing.svg', imageAlt: 'Kaos berlengan pendek' },
  { id: 'eating', title: 'Makan Sendiri', theme: 'yellow', image: '/assets/illustrations/activities/eating.svg', imageAlt: 'Piring berisi makanan dan sendok' },
  { id: 'shoes', title: 'Memakai Sepatu', theme: 'purple', image: '/assets/illustrations/activities/shoes.svg', imageAlt: 'Sepatu dengan perekat tanpa tali' },
]

const content: Record<string, { intro: string; completion: string; steps: [string, string][] }> = {
  'tooth-brushing': {
    intro: 'Yuk, belajar menggosok gigi!',
    completion: 'Hebat! Kamu sudah belajar menggosok gigi.',
    steps: [
      ['Ambil sikat gigi.', 'Tangan mengambil sikat gigi dari gelas.'],
      ['Beri pasta gigi pada sikat.', 'Pasta gigi diletakkan di atas bulu sikat.'],
      ['Sikat gigi bagian depan.', 'Sikat bergerak di permukaan gigi depan anak.'],
      ['Sikat gigi bagian kanan dan kiri.', 'Dua gambar mulut menunjukkan sikat pada sisi kanan dan kiri.'],
      ['Berkumur dengan air.', 'Anak berkumur dengan air dari gelas di dekat wastafel.'],
      ['Bersihkan sikat gigi.', 'Sikat gigi dibilas di bawah air keran.'],
    ],
  },
  bathing: {
    intro: 'Yuk, belajar mandi!',
    completion: 'Hebat! Kamu sudah belajar mandi.',
    steps: [
      ['Basahi tubuh dengan air.', 'Anak membasahi bahu dengan air pancuran.'],
      ['Gunakan sabun.', 'Tangan mengusap sabun hingga berbusa.'],
      ['Gosok seluruh tubuh.', 'Anak menggosok lengan dengan busa sabun.'],
      ['Bilas tubuh dengan air.', 'Air pancuran membilas busa dari bahu dan lengan anak.'],
      ['Keringkan tubuh dengan handuk.', 'Anak mengeringkan bahu dengan handuk.'],
      ['Pakai baju bersih.', 'Anak telah memakai kaos bersih.'],
    ],
  },
  dressing: {
    intro: 'Yuk, belajar memakai baju!',
    completion: 'Hebat! Kamu sudah belajar memakai baju.',
    steps: [
      ['Ambil baju yang bersih.', 'Tangan mengambil kaos bersih.'],
      ['Masukkan kepala ke lubang baju.', 'Kepala anak masuk melalui lubang leher kaos.'],
      ['Masukkan tangan kanan.', 'Lengan kanan anak, di kiri gambar depan, masuk ke lengan kaos.'],
      ['Masukkan tangan kiri.', 'Lengan kiri anak, di kanan gambar depan, masuk ke lengan kaos.'],
      ['Tarik baju sampai rapi.', 'Kedua tangan anak menarik bagian bawah kaos ke bawah.'],
      ['Rapikan pakaianmu.', 'Anak merapikan ujung kaos yang sudah dikenakan.'],
    ],
  },
  eating: {
    intro: 'Yuk, belajar makan sendiri!',
    completion: 'Hebat! Kamu sudah belajar makan sendiri.',
    steps: [
      ['Cuci tangan sebelum makan.', 'Kedua tangan dicuci dengan sabun di bawah keran.'],
      ['Duduk dengan rapi.', 'Anak duduk tegak di kursi menghadap meja makan.'],
      ['Ambil makanan dengan sendok.', 'Tangan menyendok nasi dari piring.'],
      ['Masukkan makanan ke mulut.', 'Anak membawa sendok berisi makanan ke mulut.'],
      ['Kunyah makanan perlahan.', 'Anak mengunyah dengan mulut tertutup.'],
      ['Rapikan setelah selesai makan.', 'Tangan meletakkan sendok dan piring kosong dengan rapi di atas baki.'],
    ],
  },
  shoes: {
    intro: 'Yuk, belajar memakai sepatu!',
    completion: 'Hebat! Kamu sudah belajar memakai sepatu.',
    steps: [
      ['Ambil sepatumu.', 'Tangan mengambil sepasang sepatu dengan perekat.'],
      ['Duduk dengan rapi.', 'Anak duduk di kursi dengan sepasang sepatu di depan kakinya.'],
      ['Masukkan kaki kanan.', 'Kaki kanan masuk ke sepatu kanan dengan perekat terbuka.'],
      ['Masukkan kaki kiri.', 'Kaki kiri masuk ke sepatu kiri dengan perekat terbuka.'],
      ['Pasangkan sepatu dengan benar.', 'Tangan menutup perekat sepatu yang sudah terpasang pada kedua kaki.'],
      ['Rapikan sepatumu.', 'Kedua sepatu telah terpasang rapi, perekat tertutup.'],
    ],
  },
}

export const materials: Material[] = catalog.map(item => {
  const detail = content[item.id]
  const steps = detail.steps.map(([text, imageAlt], index) => ({
    id: `${item.id}-${index + 1}`, text, imageAlt,
    image: `/assets/illustrations/materials/${item.id}/${index + 1}.svg`,
  }))
  return {
    ...item,
    intro: { text: detail.intro, image: item.image, imageAlt: item.imageAlt },
    steps,
    completion: { text: detail.completion, image: '/assets/illustrations/system/celebrate.svg', imageAlt: 'Anak tersenyum sambil mengangkat kedua tangan.' },
  }
})

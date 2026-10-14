# Thumbnail Beranda — 13 Oktober 2026

Sumber: [Figma Toonkit, Thumbnail 110:1191](https://www.figma.com/design/xue3V7CP24NSE3nIYOVC3k/Design-System-Toonkit?node-id=110-1191).

| Kartu | Node | Ilustrasi | Layer SVG |
| --- | --- | --- | --- |
| Materi | 106:553 | Anak membaca buku bergambar | 113 |
| Kuis | 106:667 | Anak memegang papan soal | 92 |

`HomeThumbnail` menggantikan ilustrasi pada kedua kartu Beranda. Kartu materi per kegiatan dan isi pelajaran tetap memakai aset sebelumnya. Halaman Kuis masih berupa placeholder Stage 2.

Seluruh 205 SVG asli disimpan utuh di `public/assets/illustrations/home-thumbnails/` (139.107 byte). Nama file mencantumkan hash konten; konfigurasi Vercel menyiapkan cache satu tahun hanya untuk direktori aset tersebut. Header production baru berlaku setelah deployment. Tidak ada URL aset sementara Figma dalam kode aplikasi.

Pemetaan layer, urutan, posisi, dan gerak disimpan di `src/data/homeThumbnails.ts`. Posisi mengikuti slot pada design context; bingkai SVG persegi 530 × 530 mengikuti desain. Setiap gambar memakai pembungkus posisi statis dan pembungkus animasi terpisah dengan origin 0,0. Animasi menggunakan CSS yang sudah dipakai proyek, tanpa dependensi baru.

Kedua timeline berulang 3.200 ms. Seluruh 615 track rotasi, translasi, skala, dan opacity difaktorkan menjadi 13 keyframe bersama dengan nilai per layer. Nilai, easing, dan persentase waktu tetap sesuai snippet Figma. Nilai translasi nol memakai default bersama agar data lebih ringkas. Tiap thumbnail mulai bergerak serentak setelah semua layernya siap. Ilustrasi lama tetap menjadi fallback selama memuat atau jika aset gagal. `prefers-reduced-motion` menampilkan gambar diam.

## Verifikasi

### Pembaruan interaksi — 14 Oktober 2026

- Berlaku untuk kedua kartu Beranda, Materi dan Kuis, sesuai konfirmasi pengguna.
- Saat halaman dibuka, thumbnail tampil diam. Pointer mouse pada perangkat dengan kemampuan hover memutar pratinjau berulang selama berada di kartu; keluar dari kartu mengembalikan gambar ke posisi awal. Pointer sentuh tidak memicu hover.
- Klik, ketukan, atau Enter memulai ulang animasi dari awal untuk satu siklus 3,2 detik. Event akhir animasi membuka halaman tujuan. Pilihan dikunci selama proses agar aktivasi berulang tidak menggandakan navigasi.
- Ctrl/Cmd/Shift/Alt-click dan klik non-primer mempertahankan perilaku tautan bawaan browser. Timer dibersihkan saat komponen dilepas. Jika aset gagal, reduced motion aktif, atau animasi tidak mengirim event selesai, tersedia jalur navigasi cadangan; pemuatan aset tidak menahan pengguna tanpa batas.
- Pemeriksaan lokal: build produksi lulus; browser menunjukkan kedua animasi awal `none`, pilihan Materi mempunyai satu iterasi dan tetap di Beranda saat animasi berjalan, lalu membuka daftar materi. Enter pada Kuis juga menunggu animasi lalu membuka halaman Kuis.
- Batas pengujian interaksi: hover fisik, sentuhan pada perangkat asli, perubahan preferensi reduced motion, dan simulasi jaringan gagal belum diuji langsung. Pratinjau sempat memakai halaman lama dari server yang berhenti; server lokal baru telah dijalankan dan halaman dimuat ulang sebelum verifikasi.

### Verifikasi aset awal — 13 Oktober 2026

- Build produksi dan enam pengujian sesi/konten lulus. JavaScript hasil build 468,28 kB (126,53 kB gzip), CSS 35,31 kB (6,52 kB gzip).
- Audit seluruh 205 file: non-kosong dan hash cocok dengan nama. Seluruh 615 track hasil factoring dibandingkan dengan snippet sumber; nilai dan easing sama.
- Chromium lokal: kedua scene siap, seluruh 113 + 92 layer tersedia. Delapan sampel gerakan melintasi lebih dari satu putaran menunjukkan rotasi, skala, dan translasi berubah lalu kembali ke posisi awal, durasi 3,2 detik.
- Pratinjau desktop memakai slot 190 × 190 px; layar 320 px memakai slot 156 × 156 px, tanpa overflow horizontal.
- Kartu Materi membuka daftar lima kegiatan; kartu Kuis membuka placeholder yang ada.
- Batas verifikasi: belum diuji pada perangkat fisik, koneksi lambat, atau emulasi preferensi OS reduced motion. Tidak ada push atau deployment dalam pembaruan ini.

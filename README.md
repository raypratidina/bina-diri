# Bina Diri — Stage 2

Web belajar merawat diri. **Stage 2 selesai; menunggu tinjauan.** Lima materi memiliki intro, enam langkah, dan halaman selesai. Kuis tetap halaman sementara; Stage 3 belum diimplementasikan.

Lokasi proyek: `C:\Users\Lenovo\OneDrive\Documents\ChatGPT\Bina Diri Project 2`.

## Menjalankan di Windows / PowerShell

Diuji dengan Node.js 22.11.0 dan npm 10.9.0. Versi dependensi dikunci dalam package-lock.json.

```powershell
cd "C:\Users\Lenovo\OneDrive\Documents\ChatGPT\Bina Diri Project 2"
npm.cmd ci
npm.cmd run dev -- --port 5173 --strictPort
```

Buka http://127.0.0.1:5173/. Hentikan server dengan Ctrl+C.

```powershell
npm.cmd run build
npm.cmd test
npm.cmd run preview -- --port 4173 --strictPort
```

Pratinjau build: http://127.0.0.1:4173/. `npm` juga dapat digunakan jika kebijakan PowerShell mengizinkan npm.ps1. Instalasi memerlukan internet; font dan ilustrasi disajikan lokal setelah dependensi terpasang.

## Yang tersedia

- Beranda dengan dua pilihan: Materi dan Kuis.
- Lima kartu materi dengan judul, gambar, dan warna sesuai handoff.
- Lima alur materi lengkap: intro → enam langkah → selesai. Instruksi, intro, dan teks selesai persis dari handoff.
- Progres “1 dari 6” hingga “6 dari 6”; Kembali menuju langkah sebelumnya atau intro pada langkah pertama.
- Halaman selesai dengan Pilih Materi Lain dan Kembali ke Beranda; sesi yang belum selesai tidak dapat membuka halaman selesai.
- State lokal di memori dan penahan input 450ms mencegah ketukan cepat melewati langkah. Membuka ulang materi memulai sesi baru.
- Kuis tetap halaman sementara dengan navigasi kembali.
- Pemulihan ID materi/URL tidak dikenal dan gambar gagal dimuat.
- Komponen Button, IconButton, PageHeader, ActivityCard, IllustrationContainer, ProgressIndicator, CompletionScreen, LoadingState, ErrorState, dan placeholder bersama.
- Token warna, tipografi, ukuran, bayangan, fokus, dan interaksi terpusat. Tailwind CSS terintegrasi melalui plugin Vite.
- Skip link, fokus judul saat pindah halaman, kontrol utama minimal 56px, dan reduced motion.
- Setiap pemuatan dokumen penuh kembali ke Beranda, termasuk membuka URL dalam secara langsung. Navigasi SPA mendukung Back/Forward.
- Tidak ada backend, akun, audio, API aplikasi, penyimpanan progres, skor, atau timer.

## Struktur

- `src/app`: shell, router, Beranda.
- `src/components`: komponen reusable dan pola keadaan.
- `src/data/materials.ts`: katalog, intro, 30 langkah, dan teks selesai.
- `src/features/materials`: daftar, tampilan bersama, state dan transisi sesi. `src/features/quiz`: placeholder.
- `src/styles/tokens.css`: sumber token; `app.css` dan `materials.css`: tata letak serta interaksi.
- `public/assets/illustrations`: SVG sederhana; 30 adegan langkah di `materials/` dan ilustrasi selesai bersama. Ganti melalui path data/props.
- `scripts/generate-material-art.mjs`: sumber pembentukan SVG langkah; jalankan `node scripts/generate-material-art.mjs` untuk menghasilkan ulang aset tersebut.
- `tests/material-session.test.mjs`: enam pengujian isi handoff, kelengkapan aset, batas langkah, reset, dan ketukan cepat; tidak menambah dependensi pengujian.
- `docs/BINA_DIRI_CODEX_HANDOFF.md`: salinan spesifikasi.
- `docs/STAGE_1_VERIFICATION.md`: hasil pemeriksaan aktual.
- `docs/STAGE_2_VERIFICATION.md`: hasil pemeriksaan Stage 2.

## Dependensi terpasang

| Paket | Versi |
| --- | --- |
| React / React DOM | 19.3.0 |
| Vite | 6.4.3 |
| TypeScript | 5.9.3 |
| Tailwind CSS / @tailwindcss/vite | 4.3.3 |
| React Router DOM | 7.18.4 |
| Lucide React | 0.468.0 |
| @vitejs/plugin-react | 4.7.0 |
| @fontsource-variable/fredoka | 5.3.0 |
| @fontsource-variable/nunito | 5.3.0 |

## Arah visual dan batasan

Screenshot referensi Figma node 9:2 berhasil dilihat. Pengambilan konteks/token gagal dengan pesan tidak ada layer terpilih; kesesuaian Toonkit secara persis tidak diklaim.

Token handoff: Ink #211D2B, Surface #FFFFFF, Pink #FF99C2, Mint #81E4B9, Yellow #FFDF57. **Sementara untuk ditinjau:** Blue #92C9F5, Purple #C2ACF3, Red #B92E45. Canvas #FFFEF5 dan Muted #5D5668 adalah tambahan fondasi lokal.

Fredoka dan Nunito berasal dari Fontsource, berlisensi OFL-1.1 (lisensi pada paket). Browser mengonfirmasi kedua font termuat. Tidak ada permintaan Google Fonts saat aplikasi berjalan.

Kartu dan intro memakai gambar benda dari Stage 1. Stage 2 menambah 30 ilustrasi tindakan sederhana dengan tokoh/benda yang dipakai ulang, termasuk kepala/lengan saat memakai kaos serta sepatu perekat tanpa tali. Seluruh ilustrasi masih aset representatif yang perlu tinjauan pengguna, bukan produksi artwork final. Gambar kuis aktivitas pada Stage 3 masih perlu dipilih secara khusus; kuis belum dibuat.

Build dan enam pengujian otomatis lulus. Seluruh 30 langkah diuji di Chromium pada 320px. Contoh langkah dan halaman selesai diperiksa pada 320, 390, 768, 1440px tanpa overflow. Uji keyboard, ketukan ganda, fallback gambar, reset, dan penjagaan sesi lulus. Detail serta batas pengujian ada di laporan Stage 2.

## Berikutnya — hanya setelah persetujuan

- Stage 3: sepuluh soal tetap, umpan balik, percobaan ulang, kesiapan gambar, konfirmasi keluar, selesai/main lagi.
- Stage 4: verifikasi seluruh MVP.

**Berhenti di Stage 2 untuk tinjauan pengguna.**

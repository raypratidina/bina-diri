# Pemetaan aset Figma — 13 Oktober 2026

Sumber: [Toonkit, bagian Asset 82:42](https://www.figma.com/design/xue3V7CP24NSE3nIYOVC3k/Design-System-Toonkit?node-id=82-42).

28 PNG asli (1024 × 1024) disimpan di `public/assets/illustrations/figma/`. Gambar tidak digambar ulang, dicerminkan, atau diubah. Tampilan mengikuti slot Figma 530 × 578, `object-fit: cover` terpusat. URL sementara Figma tidak dipakai oleh aplikasi.

## Keputusan pemetaan

- Menggosok Gigi tidak tersedia pada bagian yang diberikan; aset lama tetap digunakan.
- Mandi: thumbnail pancuran (`77:9`), intro adegan mandi (`75:2`), langkah 1–5 memakai `75:3`–`75:7`. Langkah 6 “Pakai baju bersih” memakai gambar anak berpakaian `76:8` dari set Memakai Baju.
- Memakai Baju: label layer kanan/kiri terbalik terhadap anatomi anak pada gambar. Langkah kanan memakai `76:6` (lengan di kiri penonton), langkah kiri memakai `76:5` (lengan di kanan penonton). File asli tidak dicerminkan. Gambar kepala melalui baju `76:4` memperlihatkan posisi setelah kepala keluar dari lubang, sesuai aset sumber.
- Makan: `82:41` adalah thumbnail paling atas pada posisi yang sama dengan `77:2`; keduanya berisi PNG identik. Hanya satu disimpan.
- Sepatu: seluruh set baru memakai tali; alt text disesuaikan. Instruksi langkah 5 tetap “Pasangkan sepatu dengan benar.” sesuai handoff.
- Teks instruksi, urutan enam langkah, state sesi, dan halaman selesai tidak diubah.

## Daftar file dan node

Path berikut relatif terhadap `public/assets/illustrations/figma/`.

| Materi | File | Node Figma |
| --- | --- | --- |
| dressing | `dressing/thumbnail.png` | `76:2` |
| dressing | `dressing/take-shirt.png` | `76:3` |
| dressing | `dressing/head-through-shirt.png` | `76:4` |
| dressing | `dressing/right-arm.png` | `76:6` |
| dressing | `dressing/left-arm.png` | `76:5` |
| dressing | `dressing/pull-shirt-down.png` | `76:7` |
| dressing | `dressing/tidy-shirt.png` | `76:8` |
| bathing | `bathing/thumbnail.png` | `77:9` |
| bathing | `bathing/intro.png` | `75:2` |
| bathing | `bathing/wet-body.png` | `75:3` |
| bathing | `bathing/use-soap.png` | `75:4` |
| bathing | `bathing/wash-body.png` | `75:5` |
| bathing | `bathing/rinse-body.png` | `75:6` |
| bathing | `bathing/dry-body.png` | `75:7` |
| eating | `eating/thumbnail.png` | `82:41` |
| eating | `eating/wash-hands.png` | `77:3` |
| eating | `eating/sit-at-table.png` | `77:4` |
| eating | `eating/take-food.png` | `77:5` |
| eating | `eating/food-to-mouth.png` | `77:6` |
| eating | `eating/chew.png` | `77:7` |
| eating | `eating/tidy-table.png` | `77:8` |
| shoes | `shoes/thumbnail.png` | `84:9` |
| shoes | `shoes/take-shoes.png` | `84:3` |
| shoes | `shoes/sit.png` | `84:4` |
| shoes | `shoes/right-foot.png` | `84:5` |
| shoes | `shoes/left-foot.png` | `84:6` |
| shoes | `shoes/fasten-shoes.png` | `84:7` |
| shoes | `shoes/tidy-shoes.png` | `84:8` |

## Integrasi dan verifikasi

- `src/data/materialArtwork.ts` memetakan thumbnail, intro, langkah, alt text, serta layout portrait. `materials.ts` menggabungkan pemetaan dengan konten handoff.
- `ActivityCard` dan `MaterialFlow` meneruskan layout ke `IllustrationContainer`. Bingkai portrait mengisolasi ukuran raster; aset SVG lama tetap memakai contain.
- Semua 28 file non-kosong dan hash SHA-256 cocok dengan hasil unduhan asli Figma.
- `npm run build` dan keenam tes `npm test` lulus; teks handoff serta batas transisi sesi tetap sesuai.
- Seluruh 24 langkah pada empat materi mencapai halaman selesai di browser Chromium, viewport 320px. Gambar termuat, rasio bingkai 530/578, tidak ada overflow horizontal.
- Kartu lima materi termuat di desktop dan 320px. Intro dan langkah memakai gambar lokal sesuai pemetaan. Ukuran portrait langkah 187.05 × 204px pada 320px; intro 217.13 × 236.80px pada 768px dan 291.58 × 318px pada 1440px.
- Contoh intro juga diperiksa pada 390px. Konsol browser tidak mencatat error selama pemeriksaan.
- PNG asli dipertahankan; total aset sekitar 19 MB. Browser mengambil gambar setiap langkah ketika dibuka dan memakai cache saat digunakan kembali.
- Batas verifikasi: Chromium desktop dengan emulasi viewport; belum diuji pada perangkat fisik atau screen reader.

## Selebrasi penyelesaian materi — 13 Oktober 2026

- Sumber: [Figma Toonkit, node 86:47](https://www.figma.com/design/xue3V7CP24NSE3nIYOVC3k/Design-System-Toonkit?node-id=86-47), “Selebrasi Berhasil [Vectorized]”.
- Seluruh 112 aset SVG asli (node 86:48–86:159, total 73.222 byte) disimpan di `public/assets/illustrations/celebration/`, tanpa URL sementara atau penggambaran ulang. Urutan layer dan batas dari desain disimpan di `src/data/celebration.ts`.
- `CompletionCelebration` digunakan oleh `CompletionScreen` untuk kelima materi. Animasi baru dimulai bersama setelah semua gambar siap; jika gambar gagal dimuat, ilustrasi selesai sebelumnya menjadi fallback. Navigasi tetap tersedia selama pemuatan.
- Satu siklus 2.650 ms berulang mengikuti cohort Figma. Dua keyframe CSS bersama mempertahankan waktu, easing, scale, serta translation masing-masing layer dari motion context; tidak menambah pustaka animasi. Pembungkus posisi dipisahkan dari pembungkus gerak dengan origin 0,0 dalam koordinat vektor. SVG viewBox 530 × 578 menjaga gerakan saat ukuran berubah.
- Tersedia tombol “Jeda animasi” / “Putar animasi”. `prefers-reduced-motion: reduce` mematikan animasi dan menyembunyikan kontrol, sehingga ilustrasi tampil diam. Semua layer dekoratif disatukan menjadi satu label gambar yang dapat dibaca pembaca layar.
- Verifikasi: build produksi dan 6 tes sesi/konten lulus. Browser memeriksa penyelesaian seluruh 5 materi, 112 layer siap, satu putaran penuh, sinkronisasi scale, jeda yang mempertahankan posisi, putar kembali, navigasi ke materi lain, serta kontrol Enter. Ukuran 320, 390, 768, dan 1440px tidak menunjukkan overflow horizontal; konsol tanpa warning/error.
- Semua posisi pada 20 keyframe sumber berada di dalam viewBox. Seluruh aset non-kosong. Pengurangan gerak ditinjau pada aturan CSS; emulasi preferensi OS, kegagalan jaringan, perangkat fisik, dan pembaca layar belum diuji pada pembaruan ini.

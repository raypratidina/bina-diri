# Pemeriksaan Stage 2

Tanggal: 3 Oktober 2026 (Asia/Jakarta). Proyek tetap `C:\Users\Lenovo\OneDrive\Documents\ChatGPT\Bina Diri Project 2`. Handoff asli dibaca seluruhnya; otorisasi pengguna terbaru memperluas pekerjaan ke Stage 2 saja. Tidak ada AGENTS.md yang ditemukan pada proyek atau jalur induknya. Fondasi dan dependensi Stage 1 dipertahankan.

## Implementasi

- Lima materi, masing-masing intro, enam langkah, dan selesai; semua teks sesuai bagian 6 handoff.
- Satu tampilan bersama dengan data terpisah. Langkah disimpan dalam state, bukan route terpisah.
- Route `/materials/:id`, `/materials/:id/learn`, `/materials/:id/complete`.
- State lokal dengan fase intro/learning/complete dan indeks langkah terbatas. Referensi sinkron plus interval penjagaan 450ms menolak input berulang sebelum React menyelesaikan render.
- Kembali dari langkah pertama menuju intro; langkah lain ke langkah sebelumnya. Selesai menyediakan kedua aksi yang disyaratkan.
- Pembukaan learn/complete tanpa sesi yang sah dipulihkan ke intro. Membuka ulang materi memulai ulang; refresh kembali ke Beranda. Browser Back dari alur kembali ke intro, karena langkah tidak menambah riwayat URL.
- Fokus berpindah ke instruksi pada setiap langkah, progres dihubungkan ke heading secara aksesibel, tombol native mendukung Enter/Space.
- 30 SVG tindakan sederhana dan 1 SVG selesai. Gambar gagal menjaga tata letak, instruksi, dan navigasi; gambar langkah baru memiliki keadaan terpisah.
- Kuis tetap placeholder, tanpa soal atau logika Stage 3.

## Hasil aktual

Browser: **Headless Chromium 154 di Windows**, Agent Browser 0.38.2. Server lokal Vite di http://127.0.0.1:5173/.

| Pemeriksaan | Hasil |
| --- | --- |
| `npm.cmd run build` | Lulus TypeScript dan bundel Vite setelah koreksi akhir |
| `npm.cmd test` | 6 pengujian lulus, 0 gagal |
| Isi materi | Pengujian mencocokkan intro, semua 30 instruksi, dan completion dengan salinan handoff |
| Aset | Lima materi × enam path langkah unik, semua file ada; 30 adegan diperiksa dalam lembar gambar |
| Seluruh alur pada 320px | Kelima intro → langkah 1–6 → selesai → daftar berhasil; gambar termuat, fokus H1, progres benar, tanpa overflow |
| Responsif | Contoh langkah Memakai Baju dan selesai Memakai Sepatu di 320/390/768/1440px: scrollWidth sama dengan viewport; screenshot diperiksa |
| Ukuran kontrol | Tombol utama ≥56px; tombol kembali 56×56px; label panjang pada 320px membungkus tanpa terpotong |
| Kembali | Browser menguji langkah 2 → 1 → intro serta 6 → 5; pengujian logika memeriksa batas langkah |
| Ketukan cepat | Double-click native pada Lanjut dari langkah pertama berakhir tepat di langkah kedua; pengujian logika mencakup burst dan campuran Next/Back |
| Keyboard | Tab/Space untuk Mulai, Shift+Tab/Enter untuk langkah sebelumnya, Space untuk kembali ke intro; fokus outline ink 3px terlihat |
| Aksi selesai | Pilih Materi Lain membawa ke daftar; link Kembali ke Beranda diperiksa dan diuji memakai referensi elemen browser hingga Beranda tampil |
| Penjagaan sesi | Pembukaan complete sebelum selesai dipulihkan ke intro; pembukaan learn tanpa sesi juga dipulihkan ke intro |
| Materi invalid | `/materials/no-such-material/learn` menampilkan “Materi tidak ditemukan.” dengan pemulihan ke daftar |
| Gambar gagal | Src gambar langkah pertama diganti dengan file yang tidak ada; placeholder muncul, instruksi tetap, Lanjut bekerja dan gambar langkah kedua termuat |
| Refresh | Dari learn kembali ke `/` |
| Reduced motion | Preference aktif menghasilkan transition-duration 0s |
| Penyimpanan | localStorage/sessionStorage berisi 0 entri; cookie kosong pada sesi uji |
| Axe 4.12.1 | 0 violations pada contoh intro, langkah, dan completion |
| Runtime | Pemeriksaan akhir page errors kosong; kegagalan resource gambar saat injeksi adalah skenario uji yang disengaja |

## Masalah yang ditemukan dan dituntaskan

Pemeriksaan browser menemukan race pada transisi langkah keenam: state complete dapat terpasang sebelum Router mengganti URL, sehingga guard awal salah mengarah ke intro. Guard kini mengenali fase complete ketika route learn masih terpasang, lalu mengarahkan ke complete. Seluruh lima alur diuji ulang sampai selesai setelah koreksi.

Skrip browser async panjang mengalami timeout; pemeriksaan diganti menjadi rangkaian interaksi langsung. Beberapa pembacaan URL terlalu dini dan hitungan langkah pada skrip pemeriksaan dikoreksi; hasil sukses di atas berasal dari pemeriksaan ulang dengan halaman/elemen tujuan yang benar-benar tampil.

## Batasan dan tinjauan

Ilustrasi masih SVG representatif berdetail rendah, belum artwork final atau tervalidasi bersama anak/pendamping. Posisi pasta pada bulu sikat dan keterlihatan kursi diperbaiki dari inspeksi gambar. Semua aset bisa diganti melalui path tanpa mengubah logika.

Warna provisional tetap dari Stage 1: Blue #92C9F5, Purple #C2ACF3, Red #B92E45. Tidak mengklaim kecocokan Toonkit persis.

Belum diuji pada Firefox, Safari, Edge, perangkat sentuh fisik, atau pembaca layar nyata. Audit otomatis tidak menggantikan pengujian tersebut. Alur lengkap semua materi dijalankan pada 320px; ukuran lain memakai contoh representatif template langkah/selesai, bukan seluruh kombinasi materi dan ukuran.

Stage 3 (kuis) dan Stage 4 (verifikasi MVP menyeluruh) menunggu otorisasi berikutnya. Tidak ada publikasi/deploy.

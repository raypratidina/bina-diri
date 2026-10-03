# Pemeriksaan Stage 1

Tanggal: 3 Oktober 2026 (Asia/Jakarta). Browser aktual: Headless Chromium 154 pada Windows melalui Agent Browser 0.38.2. Aplikasi lokal Vite di 127.0.0.1:5173.

| Pemeriksaan | Hasil |
| --- | --- |
| TypeScript dan build Vite produksi | Lulus; bundel dan font lokal dihasilkan |
| Beranda dan daftar materi pada 320, 390, 768, 1440px | Lulus pengukuran DOM; scrollWidth sama dengan lebar viewport |
| Screenshot Beranda dan daftar | Diperiksa secara visual; gambar melampaui batas pada pemeriksaan awal telah diperbaiki dan diperiksa ulang |
| Kelima materi dan Kuis, buka/kembali pada keempat lebar | Seluruh 24 kombinasi lulus; judul sesuai, teks sementara, fokus H1, tanpa overflow |
| Target sentuh | IconButton 56×56px; tombol kembali ≥56px; kartu merupakan link besar |
| Tab/Enter, Shift+Tab/Enter | Lulus masuk Materi, membuka materi, menuju Kuis, dan kembali |
| Fokus terlihat | Outline ink 3px, offset 6px pada link fokus |
| Fokus perpindahan halaman | H1 aktif; judul dokumen mengikuti halaman |
| Browser Back/Forward | Kembali ke daftar dan maju ke materi berfungsi |
| Reload pada materi | Kembali ke `/` |
| ID materi invalid dalam sesi | “Materi tidak ditemukan.”; Kembali ke Materi berfungsi |
| URL invalid dalam sesi | “Halaman tidak ditemukan.”; Kembali ke Beranda berfungsi |
| Font | Fredoka Variable dan Nunito Variable berstatus loaded dalam FontFaceSet browser |
| Gambar normal | Gambar Beranda dan katalog complete dengan naturalWidth > 0 |
| Gambar gagal (src diganti sementara di browser) | Placeholder netral dan teks tetap muncul; tombol kembali berfungsi |
| Reduced motion | Media preference aktif; transition-duration terukur 0s |
| Penyimpanan | localStorage/sessionStorage kosong dan cookie kosong pada sesi uji |
| Axe 4.12.1 | 0 violations pada Beranda, daftar, placeholder Menggosok Gigi, dan placeholder Kuis |
| Runtime | Tidak ada page error pada pemeriksaan akhir |
| Git whitespace | `git diff --check` lulus |

Pemeriksaan pertama terhalang izin sandbox Windows. Build dan alat browser kemudian dijalankan dengan akses yang diperlukan. Path impor font yang salah dan ukuran gambar yang melampaui area telah diperbaiki sebelum verifikasi akhir. Skrip navigasi semula membaca sebelum pembaruan React selesai; pemeriksaan ulang menunggu tujuan tampil dan seluruh kombinasi lulus.

Belum diverifikasi: Firefox/Safari/Edge, perangkat sentuh fisik, pembaca layar nyata, serta pengujian dengan anak/pendamping. Audit otomatis bukan pengganti pengujian tersebut. Pola error aplikasi dan initial loading tersedia tetapi kegagalan JavaScript global tidak diinjeksi dalam uji ini.

Alur Stage 2/3 belum dibuat sehingga tidak dinyatakan lulus.

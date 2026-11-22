# POS.IT — Point of Sale & Retail Management System

> **"Usaha tertata. Hari lebih tenang."**  
> Sistem kasir dan manajemen ritel modern berbasis web yang ringan, cepat, dan intuitif untuk mendukung operasional bisnis UMKM, kafe, restoran, hingga toko ritel.

---

## 📋 Daftar Isi
1. [Tentang Proyek](#-tentang-proyek)
2. [Fitur Utama](#-fitur-utama)
3. [Akun Demo & Hak Akses](#-akun-demo--hak-akses)
4. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
5. [Sistem Desain & Palet Warna](#-sistem-desain--palet-warna)
6. [Struktur Berkas & Direktori](#-struktur-berkas--direktori)
7. [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
8. [Panduan Penggunaan Singkat](#-panduan-penggunaan-singkat)

---

## 💡 Tentang Proyek

**POS.IT** dirancang untuk menjawab kebutuhan pemilik usaha dan staf kasir dalam mencatat transaksi harian, mengelola persediaan barang, serta memantau perkembangan finansial tanpa kerumitan instalasi server atau dependensi database yang berat. 

Aplikasi ini berjalan secara *fully client-side* menggunakan teknologi web standar (Vanilla JavaScript, Bootstrap 5, dan Web Storage API) sehingga dapat langsung dibuka dan dijalankan di berbagai perangkat desktop maupun tablet melalui peramban web modern.

---

## ✨ Fitur Utama

### 1. 🛍️ Manajemen Katalog & Produk
- **Daftar Produk Terintegrasi**: Tampilan tabel ringkas dengan filter kategori, pencarian nama/SKU, dan indikator status aktif/non-aktif.
- **Tambah & Perbarui Produk**: Form lengkap mencakup SKU, nama, kategori, harga jual, harga modal, stok awal, serta opsi status.
- **Ikon Visual Dinamis**: Ikon SVG tematik seragam untuk makanan (sandwich/roti, croissant), minuman (kopi, matcha), dan snack.
- **Proteksi Hapus Data**: Konfirmasi dialog berbasis Sonner untuk mencegah penghapusan produk yang tidak disengaja.

### 2. ⚡ Kasir & Point of Sale (POS)
- **Katalog Cepat**: Grid kartu produk visual dengan badge harga dan status stok.
- **Keranjang Belanja Real-Time**: Tambah/kurang kuantitas secara instan, hitung subtotal, diskon fleksibel, serta kalkulasi PPN otomatis (11%).
- **Reset Keranjang Aman**: Konfirmasi interaktif toast sebelum mengosongkan keranjang aktif.

### 3. 💳 Pembayaran & Struk Digital
- **Metode Pembayaran Ganda**:
  - **Tunai (Cash)**: Penghitungan otomatis nominal bayar, tombol pecahan cepat (*exact*, +10rb, +20rb, +50rb, +100rb), serta kalkulasi kembalian akurat.
  - **QRIS**: Simulator kode QR dinamis dengan hitung mundur (*countdown timer*) verifikasi pembayaran otomatis.
- **Struk Digital & Cetak**: Rincian transaksi lengkap dengan nomor referensi, daftar item, metode bayar, dan opsi cetak struk (format thermal receipt).

### 4. 📦 Manajemen & Riwayat Stok
- **Ringkasan Stok**: Kartu statistik total SKU, total unit stok, produk menipis (*low stock warning*), dan produk habis.
- **Log Perubahan Stok**: Riwayat pencatatan setiap perubahan stok (penjualan, penambahan barang masuk, atau penyesuaian manual).

### 5. 📊 Laporan & Analitik Penjualan
- **Metrik Finansial**: Total omzet harian/bulanan, laba kotor, volume transaksi, dan rata-rata nilai transaksi (*average basket size*).
- **Grafik Interaktif Chart.js**: Visualisasi tren penjualan harian dan perbandingan performa kategori produk.
- **Filter Fleksibel**: Pemfilteran riwayat transaksi berdasarkan rentang tanggal dan status transaksi.

### 6. 🔔 Sistem Notifikasi Sonner Elegan
- Notifikasi bergaya minimalis modern (**Sonner Toast**) di pojok kanan atas layar (`top-right`).
- Variasi status: `success`, `error`, `warning`, `info`, dan modal `confirm`.
- Konfirmasi interaktif untuk aksi penting seperti penghapusan produk, pengosongan keranjang kasir, dan konfirmasi keluar (*logout*).

### 7. 👥 Multi-Role & Hak Akses Terpisah
- **Pemilik (Owner)**: Akses penuh ke seluruh menu (Dashboard Analitik, Produk, Tambah Produk, Kasir, Laporan Penjualan, Stok, dan Profil Usaha).
- **Kasir (Staff)**: Tampilan kerja terfokus (Dashboard Kasir, Transaksi Kasir, Katalog Produk Kasir, dan Manajemen Stok terbatas).

---

## 🔐 Akun Demo & Hak Akses

Anda dapat langsung mencoba login menggunakan kredensial demo berikut:

| Peran (Role) | Kredensial Login | Kata Sandi | Cakupan Akses |
|---|---|---|---|
| **Pemilik Usaha (Owner)** | `damar@imkafe.id` *(atau via email baru)* | `kafe1234` | Akses penuh ke seluruh modul, pengaturan, dan analitik. |
| **Kasir (Staff)** | `081234567890` | `kasir123` | Akses operasional penjualan kasir, monitoring stok, dan katalog. |

> 💡 **Registrasi Baru**: Anda juga dapat membuat akun baru melalui halaman [register.html](register.html). Akun yang didaftarkan akan otomatis tersimpan di peramban Anda (`localStorage`) dan dapat langsung digunakan untuk masuk.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5 & CSS3 Modern**: Struktur semantik dengan CSS kustom dan flexbox/grid layout yang responsif.
- **Bootstrap v5.3.8**: Komponen antarmuka dasar dan layout grid responsif.
- **Bootstrap Icons (v1.11.3)**: Ikonografi sistem antarmuka.
- **Vanilla JavaScript (ES6+)**: Logika aplikasi tanpa framework berat, menjamin kecepatan rendering maksimal.
- **Chart.js (v4.4.1)**: Visualisasi grafik performa dan laporan analitik keuangan.
- **Sonner Toast Engine (`js/sonner.js`)**: Modul notifikasi toast kustom bergaya Sonner yang mandiri (*standalone*, tanpa library pihak ketiga).
- **Web Storage API**: `localStorage` untuk persistensi produk, transaksi, stok, profil usaha, dan akun; `sessionStorage` untuk sesi login aktif.

---

## 🎨 Sistem Desain & Palet Warna

Aplikasi ini menggunakan palet warna terharmonisasi bergaya hangat dan profesional (*warm modern retail*):

| Kategori | Hex Code | Tampilan / Penggunaan |
|---|---|---|
| **Primary Accent** | `#c0421a` | Warna utama tombol aksi, tab aktif, ikon fokus, dan aksen brand. |
| **Primary Hover** | `#a03612` | Efek hover pada tombol dan elemen interaktif utama. |
| **Success** | `#16a34a` | Status transaksi lunas, badge stok cukup, dan notifikasi sukses. |
| **Warning** | `#d97706` | Peringatan stok menipis dan notifikasi perhatian. |
| **Danger** | `#dc2626` | Tombol batal/hapus, status stok habis, dan notifikasi eror. |
| **Dark / Text** | `#0f172a` | Tipografi judul dan teks utama (*slate-900*). |
| **Muted Text** | `#64748b` | Teks sekunder, label, dan keterangan (*slate-500*). |
| **Background** | `#f8fafc` | Latar belakang area kerja aplikasi (*slate-50*). |
| **Surface** | `#ffffff` | Kartu putih bersih (*clean card surface*). |
| **Font Family** | `Inter, sans-serif` | Tipografi bersih dan mudah dibaca pada berbagai ukuran layar. |

---

## 📂 Struktur Berkas & Direktori

```text
pos.it/
├── index.html                    # Halaman landing page publik & pengenalan produk
├── login.html                    # Halaman masuk (validasi kredensial & Sonner toast)
├── register.html                 # Halaman pendaftaran akun baru
│
├── dashboard.html                # Dashboard utama untuk Pemilik (Owner)
├── dashboard-cashier.html        # Dashboard operasional untuk Kasir
│
├── products.html                 # Manajemen daftar produk (Owner)
├── products-cashier.html         # Tampilan katalog produk (Kasir)
├── add-product.html              # Form tambah produk baru
├── edit-product.html             # Form edit & hapus produk (Owner)
├── edit-product-cashier.html     # Form edit produk (Kasir)
│
├── cashier.html                  # Layar transaksi POS kasir (Owner view)
├── cashier-cashier.html          # Layar transaksi POS kasir (Staff view)
├── payment.html                  # Layar pemrosesan pembayaran & struk (Owner)
├── payment-cashier.html          # Layar pemrosesan pembayaran & struk (Kasir)
│
├── stock.html                    # Monitoring & manajemen stok barang (Owner)
├── stock-cashier.html            # Monitoring stok barang (Kasir)
│
├── report.html                   # Laporan analitik keuangan & grafik penjualan
├── transaction-detail.html       # Rincian detail transaksi tersimpan
├── profile.html                  # Pengaturan data profil usaha & operasional
│
├── css/                          # Lembar gaya CSS terpisah per modul
│   ├── loginStyle.css
│   ├── registerStyle.css
│   ├── dashboardStyle.css
│   ├── productsStyle.css
│   ├── addProductStyle.css
│   ├── cashierStyle.css
│   ├── paymentStyle.css
│   ├── stockStyle.css
│   ├── reportStyle.css
│   ├── trxDetailStyle.css
│   └── profileStyle.css
│
├── js/                           # Skrip JavaScript fungsional
│   ├── sonner.js                 # Engine notifikasi toast & dialog konfirmasi Sonner
│   ├── productsData.js           # Pengelola data produk & helper SVG ikon dinamis
│   ├── companyProfile.js         # Pengelola informasi & konfigurasi profil usaha
│   └── transactionDetail.js      # Pengelola rincian data transaksi
│
└── README.md                     # Dokumentasi komprehensif proyek
```

---

## 🚀 Panduan Instalasi & Menjalankan

Aplikasi ini tidak memerlukan instalasi Node.js, kompilasi build, atau konfigurasi database server tambahan.

### Cara 1: Buka Langsung di Browser (Paling Mudah)
1. Unduh atau salin seluruh repositori ke komputer Anda.
2. Klik ganda berkas [index.html](index.html) atau klik kanan lalu pilih **Open with Google Chrome / Microsoft Edge / Firefox**.
3. Navigasi ke halaman Login untuk memulai penjelajahan.

### Cara 2: Menggunakan VS Code Live Server (Direkomendasikan untuk Pengembang)
1. Buka folder proyek di **Visual Studio Code**.
2. Pasang ekstensi **Live Server** (oleh Ritwick Dey).
3. Klik kanan pada berkas [index.html](index.html), lalu pilih **Open with Live Server**.
4. Aplikasi akan otomatis berjalan pada alamat `http://127.0.0.1:5500/index.html`.

### Cara 3: Menggunakan Python HTTP Server
Jika Anda memiliki Python terpasang di terminal/command prompt:
```bash
# Masuk ke direktori proyek
cd path/to/pos.it

# Jalankan local HTTP server
python -m http.server 8000
```
Buka peramban dan akses: `http://localhost:8000/index.html`.

---

## 📖 Panduan Penggunaan Singkat

1. **Masuk ke Sistem**:
   - Buka [login.html](login.html). Masukkan email/no. HP dan kata sandi sesuai peran yang ingin Anda uji (lihat bagian [Akun Demo](#-akun-demo--hak-akses)).
2. **Membuat Transaksi Penjualan**:
   - Masuk ke menu **Kasir**.
   - Pilih produk dengan menekan tombol **Tambah** atau mengklik kartu produk.
   - Sesuaikan jumlah kuantitas pesanan pada keranjang di panel sebelah kanan.
   - Klik tombol **Lanjut ke Pembayaran**.
3. **Menyelesaikan Pembayaran**:
   - Pilih metode pembayaran **Tunai** atau **QRIS**.
   - Untuk pembayaran tunai, masukkan nominal uang pelanggan atau gunakan tombol pecahan cepat.
   - Tekan **Bayar Sekarang**. Anda dapat melihat ringkasan struk pembayaran dan mencetaknya.
4. **Memeriksa Laporan**:
   - Masuk ke menu **Laporan Penjualan** (tersedia untuk akun Owner).
   - Pantau grafik tren pendapatan serta daftar transaksi yang baru saja diselesaikan.
5. **Keluar Sistem (Logout)**:
   - Klik menu **Keluar** pada bilah navigasi samping (*sidebar*).
   - Dialog konfirmasi Sonner akan muncul untuk memastikan Anda ingin mengakhiri sesi.

---

## 📄 Lisensi
Proyek ini dikembangkan untuk kebutuhan operasional retail modern UMKM dan manajemen kasir berbasis web. Bebas digunakan, dimodifikasi, dan dikembangkan lebih lanjut.

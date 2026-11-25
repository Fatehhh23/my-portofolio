# Nature Landscape Portfolio — React + Tailwind CSS

Website portofolio modern bertema pemandangan alam dengan efek lapisan transparansi atmosferik dan navigasi kapsul mengambang (*floating pill glassmorphism*), dibangun menggunakan **React.js**, **Vite**, dan **Tailwind CSS**.

---

## 📸 Spesifikasi Desain (100% Identik Sesuai Mockup)

1. **Background Caldera Gunung Rinjani:**
   - Transparansi / Opacity: **65%** (`opacity-[0.65]`).
2. **Overlay Frame Pepohonan (Foliage PNG):**
   - Transparansi / Opacity: **55%** (`opacity-[0.55]`).
   - Membingkai sisi kiri, kanan, atas, dan bebatuan di bawah secara presisi.
3. **Floating Glassmorphism Pill Navbar:**
   - Berada di posisi tengah atas (`fixed top-6 left-1/2 -translate-x-1/2`).
   - Warna kapsul transparan dengan efek frosted glass (`bg-[#b5b9c2]/75 backdrop-blur-md`).
   - Menu item: **Home** (aktif dengan latar kapsul halus), **About**, **Portofolio**, **Contact**.
4. **Struktur Lanjutan yang Siap Dikembangkan:**
   - Komponen bagian **About**, **Portofolio (Galeri Karya)**, dan **Contact** sudah disiapkan di bawah Hero Section sehingga Anda dapat langsung melanjutkan desain dan memasukkan karya-karya Anda berikutnya.

---

## 📁 Struktur Direktori

```text
Myportopolio/
├── src/
│   ├── assets/
│   │   ├── mountain-bg.jpg     # Foto background Gunung Rinjani
│   │   └── trees-frame.png     # PNG transparansi bingkai pepohonan
│   ├── components/
│   │   ├── Navbar.jsx          # Komponen Floating Glassmorphism Pill Nav
│   │   └── Hero.jsx            # Komponen Tampilan Utama Layering 65% & 55%
│   ├── App.jsx                 # Komponen Utama (Hero + Section Lanjutan)
│   ├── main.jsx                # Entry point React
│   └── index.css               # Konfigurasi Tailwind CSS
├── public/
│   └── assets/                 # Aset publik
├── dist/                       # Build produksi siap saji
├── tailwind.config.js          # Konfigurasi tema Tailwind CSS
├── vite.config.js              # Konfigurasi Vite bundler
└── package.json                # Dependensi proyek
```

---

## 🚀 Cara Menjalankan

### Mode Pengembangan (Development Server):
Jalankan perintah berikut di terminal:
```bash
npm run dev
```
Buka browser pada alamat yang muncul (biasanya `http://localhost:3000` atau `http://localhost:5173`). Setiap kali Anda mengedit kode, browser akan otomatis memperbarui tampilan secara instan (*Hot Module Replacement*).

### Mode Build Produksi:
```bash
npm run build
```
File hasil build yang sudah dioptimasi akan berada di dalam folder `dist/`.

# Felix Raymond — Personal Portfolio v2

Portfolio website pribadi Felix Raymond. Dibangun dengan React + Vite + Tailwind CSS v4, mendukung 3 bahasa dan dark mode, siap deploy ke GitHub Pages.

---

## 🚀 Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| React | 19 | UI Framework |
| Vite | 6 | Build Tool |
| Tailwind CSS | v4 | Styling |
| React Router | v7 | Routing (HashRouter) |
| Framer Motion | v11 | Animasi |
| react-i18next | v14 | Multi bahasa (ID/EN/ZH) |
| Zustand | v4 | State management |
| Recharts | v2 | Radar chart skills |
| react-type-animation | v3 | Typing effect hero |
| react-countup | v6 | Animasi angka |
| react-intersection-observer | v9 | Scroll reveal |
| react-helmet-async | v2 | SEO |
| lucide-react | latest | Icons |

---

## 📁 Struktur Project

```
felix-portfolio/
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.jsx          Navbar responsif + language switcher + dark mode
│   │   │   └── footer.jsx
│   │   ├── ui/
│   │   │   ├── page_wrapper.jsx    Animasi transisi halaman
│   │   │   ├── section_header.jsx  Header section dengan scroll reveal
│   │   │   └── welcome_modal.jsx   Modal nama pengunjung
│   │   └── widgets/
│   │       ├── scroll_progress.jsx Bar progres scroll di atas
│   │       ├── back_to_top.jsx     Tombol kembali ke atas
│   │       ├── whatsapp_button.jsx Floating WhatsApp button
│   │       └── command_palette.jsx Command palette (Ctrl+K)
│   ├── pages/
│   │   ├── home_page.jsx           Beranda + hero + stats + featured
│   │   ├── about_page.jsx          Autobiografi lengkap
│   │   ├── skills_page.jsx         Skills + radar chart + progress bar
│   │   ├── achievement_page.jsx    Prestasi + modal gambar
│   │   ├── education_page.jsx      Pendidikan + timeline
│   │   ├── experience_page.jsx     Pengalaman + timeline + events
│   │   ├── certificate_page.jsx    Sertifikat + filter + search + lightbox
│   │   ├── gallery_page.jsx        Galeri + lightbox + navigasi
│   │   ├── cv_page.jsx             CV online + print
│   │   ├── contact_page.jsx        Kontak semua platform
│   │   ├── timeline_page.jsx       Timeline hidup interaktif
│   │   ├── now_page.jsx            Halaman "sekarang"
│   │   └── not_found_page.jsx      404
│   ├── store/
│   │   ├── use_theme_store.js      Dark/light mode state
│   │   └── use_user_store.js       Nama pengunjung state
│   ├── i18n/
│   │   ├── i18n.js                 Setup i18next
│   │   ├── id.json                 Teks Indonesia
│   │   ├── en.json                 Teks English
│   │   └── zh.json                 Teks Mandarin
│   ├── data/
│   │   ├── profile.js              Data pribadi Felix
│   │   ├── skills.js               Data keterampilan
│   │   ├── achievements.js         Data prestasi
│   │   ├── education.js            Data pendidikan
│   │   ├── experience.js           Data pengalaman + events
│   │   ├── certificates.js         Data sertifikat
│   │   ├── projects.js             Data proyek
│   │   ├── timeline.js             Data timeline hidup
│   │   └── gallery.js              Data galeri foto
│   ├── styles/
│   │   └── index.css               Global styles + CSS variables
│   ├── app.jsx                     Root app + routes
│   └── main.jsx                    Entry point
├── index.html
├── vite.config.js
├── package.json
└── readme.md
```

---

## ⚙️ Setup & Instalasi

```bash
# 1. Clone / extract project
cd felix-portfolio

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
# → http://localhost:5173
```

---

## 🌐 Deploy ke GitHub Pages

### Repo: lixsukagits.github.io (sudah dikonfigurasi)

```bash
# Build + deploy otomatis
npm run deploy
```

Ini akan:
1. Build project ke folder `/dist`
2. Push ke branch `gh-pages`
3. GitHub Pages akan serve dari branch tersebut

> **Catatan:** `vite.config.js` sudah dikonfigurasi dengan `base: '/'` untuk repo `username.github.io`.

---

## 🖼️ Cara Ganti Foto & Gambar

Semua gambar menggunakan placeholder. Untuk menggantinya:

1. Upload foto ke **Imgur** ([imgur.com](https://imgur.com)) atau **Cloudinary**
2. Salin URL langsung gambarnya
3. Edit file di `src/data/` sesuai kebutuhan:
   - Foto profil → `src/pages/home_page.jsx` dan `src/pages/about_page.jsx`
   - Foto prestasi → `src/data/achievements.js` (field `img`)
   - Foto sertifikat → `src/data/certificates.js` (field `img`)
   - Foto galeri → `src/data/gallery.js` (field `img`)

---

## ➕ Cara Tambah Data

### Tambah Sertifikat Baru
Edit `src/data/certificates.js`, tambahkan object baru:
```js
{
  id: 9,                          // nomor unik
  title: 'Nama Sertifikat',
  issuer: 'Penerbit',
  date: 'Januari 2026',
  category: 'Pelatihan',          // Kompetisi / Pelatihan / Organisasi
  img: 'https://...',             // URL gambar dari Imgur
  tags: ['Tag1', 'Tag2'],
}
```

### Tambah Prestasi Baru
Edit `src/data/achievements.js`, ikuti format yang sama.

### Update Status "Sekarang"
Edit `src/data/profile.js`, bagian `now`:
```js
now: {
  learning: 'Apa yang sedang dipelajari',
  working_on: 'Apa yang sedang dikerjakan',
  reading: 'Apa yang sedang dibaca',
  updated: 'Bulan Tahun',
}
```

---

## 🎨 Kustomisasi Warna

Edit CSS variables di `src/styles/index.css`:
```css
:root {
  --primary: #3758F9;      /* Warna utama */
  --primary-dark: #1B44C8; /* Warna utama gelap */
}
```

---

## ✨ Fitur

- 🌙 Dark / Light mode (auto-detect OS)
- 🌐 3 bahasa: Indonesia, English, 中文
- ⌨️ Command palette (Ctrl+K)
- 📊 Radar chart keterampilan
- 🖼️ Lightbox galeri dengan navigasi
- 📜 Filter & search sertifikat
- 📈 Scroll progress bar
- 🔝 Back to top button
- 💬 WhatsApp floating button
- 🖨️ CV print-friendly
- ✨ Animasi page transition
- 📱 Fully responsive

---

## 📞 Kontak

**Felix Raymond**
- 📧 lixforschl@gmail.com
- 📱 +62 812-6272-9243
- 🌐 [lixsukagits.github.io](https://lixsukagits.github.io)
- 📸 [@lixforschl](https://instagram.com/lixforschl)
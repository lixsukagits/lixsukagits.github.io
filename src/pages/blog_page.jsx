import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { BookOpen, Clock, Tag, ChevronRight, X } from 'lucide-react'
import PageWrapper from '../components/ui/page_wrapper'

/**
 * blog_page.jsx
 * Halaman blog/catatan — data dari array lokal, tanpa CMS/backend.
 * Untuk tambah post baru, edit array POSTS di bawah.
 * Taruh di: src/pages/blog_page.jsx
 */

const POSTS = [
  {
    id: 1,
    title: 'Perjalanan Belajar Mandarin dari Nol',
    subtitle: 'Dari huruf pinyin sampai percakapan dasar HSK 3',
    date: '10 Mei 2026',
    readTime: '4 menit',
    category: 'Mandarin',
    emoji: '🇨🇳',
    color: '#dc2626',
    tags: ['Mandarin', 'HSK', 'Belajar Bahasa'],
    content: `Belajar Mandarin bukan keputusan yang datang tiba-tiba. Sejak kecil, saya sudah terbiasa mendengar Hokkien di rumah — tapi Mandarin standar adalah hal yang berbeda.

Motivasi terbesar saya jelas: beasiswa ke China. Tapi seiring berjalannya waktu, saya mulai jatuh cinta dengan bahasa ini sendiri. Ada sesuatu yang unik dari cara karakter Mandarin dibentuk — setiap karakter punya cerita.

**Strategi belajar yang saya pakai:**

Pertama, saya fokus ke pinyin dulu selama 2 minggu penuh. Banyak orang skip ini dan langsung ke karakter — jangan. Pinyin adalah fondasi.

Kedua, saya pakai aplikasi HSK Online dan menonton drama China dengan subtitle dual bahasa. Exposure itu penting banget.

Ketiga, saya biasakan nulis karakter tangan. Nulis di kertas, bukan ngetik. Ini yang bantu saya ingat lebih lama.

**Progress sekarang:**

Saat ini saya sedang di level HSK 3, sudah bisa baca sekitar 600 karakter dan percakapan dasar sehari-hari. Target saya HSK 4 sebelum mendaftar beasiswa.

学无止境 — perjalanan masih panjang, tapi setiap langkah kecil itu berarti.`,
  },
  {
    id: 2,
    title: 'Membangun Portfolio Web dari Nol sebagai Siswa SMA',
    subtitle: 'React, Vite, dan banyak trial & error',
    date: '2 Mei 2026',
    readTime: '6 menit',
    category: 'Web Dev',
    emoji: '💻',
    color: '#3758F9',
    tags: ['React', 'Vite', 'Portfolio', 'Web Dev'],
    content: `Portfolio ini bukan proyek pertama saya, tapi ini yang paling ambisius. Versi pertama cuma HTML + CSS statis, bisa diakses di GitHub Pages tapi tampilannya... ya begitulah.

Versi kedua ini saya putuskan untuk pakai React + Vite. Kenapa? Karena saya ingin belajar framework yang relevan industri, sekaligus bikin sesuatu yang keren.

**Tantangan terbesar:**

Tailwind CSS v4 — dokumentasinya masih baru dan banyak hal berubah dari v3. Saya habiskan waktu cukup lama untuk ngerti sistem CSS variables baru di v4.

Framer Motion juga punya learning curve tersendiri. AnimatePresence, layoutId, gesture animations — semua butuh waktu untuk dipahami dengan benar.

**Yang paling saya banggakan:**

Sistem multi-bahasa (ID/EN/ZH) menggunakan i18next. Saya harus nerjemahin semua konten ke 3 bahasa sekaligus. Untuk Mandarin, saya pastikan terjemahannya natural, bukan Google Translate.

Dark mode + color theme switcher — pengguna bisa pilih 6 warna tema berbeda. Ini fitur yang saya tambahkan belakangan, tapi jadi salah satu yang paling banyak dikomentari teman-teman.

**Pesan untuk siswa SMA lain:**

Mulai dari yang kecil. Jangan langsung mau bikin aplikasi kompleks. Bikin satu halaman dulu, pelajari satu konsep dulu, lalu kembangkan.`,
  },
  {
    id: 3,
    title: 'Tips Persiapan Olimpiade Informatika',
    subtitle: 'Dari pengalaman meraih 5 medali emas',
    date: '20 April 2026',
    readTime: '5 menit',
    category: 'Kompetisi',
    emoji: '🏆',
    color: '#d97706',
    tags: ['Olimpiade', 'Informatika', 'Kompetisi', 'Tips'],
    content: `Lima medali emas — angka itu bukan datang dari bakat semata. Di baliknya ada jam-jam latihan, banyak soal yang salah sebelum benar, dan mental yang harus terus dijaga.

**Fondasi yang harus kuat:**

Algoritma dasar — sorting, searching, graph traversal. Ini yang selalu keluar di setiap kompetisi. Kalau fondasi ini belum solid, susah untuk naik level.

Matematika diskrit — kombinatorik, teori bilangan, probabilitas. Banyak soal olimpiade yang butuh pendekatan matematis kuat.

**Cara latihan yang efektif:**

Saya biasakan latihan minimal 3 soal per hari di platform seperti SPOJ, CodeForces, atau LeetCode. Tapi yang lebih penting dari jumlahnya adalah kualitasnya — pahami solusi, jangan cuma submit sampai accept.

Setelah dapat solusi, saya selalu coba cari solusi alternatif yang lebih efisien. Ini yang bikin kemampuan analisis naik drastis.

**Mental saat kompetisi:**

Jangan panik kalau soal pertama susah. Di olimpiade, soal biasanya diurutkan dari mudah ke susah — tapi tidak selalu. Skip soal yang stuck, kerjakan yang lebih yakin dulu.

Manajemen waktu itu krusial. Lebih baik 3 soal selesai sempurna daripada 5 soal setengah-setengah.`,
  },
  {
    id: 4,
    title: 'Kenapa Saya Memilih China untuk Kuliah',
    subtitle: 'Antara mimpi, peluang, dan pertimbangan realistis',
    date: '5 April 2026',
    readTime: '3 menit',
    category: 'Kehidupan',
    emoji: '🎓',
    color: '#10b981',
    tags: ['Kuliah', 'China', 'Beasiswa', 'Mimpi'],
    content: `Keputusan untuk mengincar beasiswa ke China bukan sesuatu yang saya ambil dalam semalam. Ada proses panjang di baliknya.

**Kenapa China?**

Pertama, China adalah pusat teknologi dunia saat ini. Alibaba, Huawei, DJI, ByteDance — perusahaan teknologi terbesar dan paling inovatif banyak lahir dari sana. Belajar di ekosistem itu punya nilai tersendiri.

Kedua, koneksi budaya. Sebagai keturunan Tionghoa-Hokkien, ada bagian dari saya yang ingin terhubung lebih dalam dengan akar budaya itu. Bahasa Mandarin yang sedang saya pelajari bukan hanya untuk beasiswa — tapi untuk identitas.

Ketiga, biaya. Beasiswa pemerintah China (CSC) menanggung biaya kuliah, asrama, dan memberi uang saku bulanan. Untuk keluarga saya, ini sangat membantu.

**Apa yang membuat saya ragu dulu:**

Jauh dari keluarga. Perbedaan budaya yang signifikan. Tekanan akademis yang dikenal tinggi di universitas China.

Tapi setelah dipikir panjang — semua itu adalah bagian dari proses tumbuh. Comfort zone tidak pernah menghasilkan sesuatu yang luar biasa.

**Langkah yang sedang saya ambil:**

Fokus meningkatkan HSK ke level 4. Jaga nilai akademik. Perkuat portofolio IT. Dan yang paling penting — tetap percaya prosesnya.`,
  },
]

const CATEGORIES = ['Semua', ...new Set(POSTS.map(p => p.category))]

export default function BlogPage() {
  const [active, setActive] = useState('Semua')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'Semua' ? POSTS : POSTS.filter(p => p.category === active)

  return (
    <PageWrapper>
      <Helmet>
        <title>Blog — Felix Raymond</title>
        <meta name="description" content="Catatan pikiran Felix Raymond — Mandarin, web dev, kompetisi, dan kehidupan." />
        <meta property="og:url" content="https://lixsukagits.github.io/blog" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-20">

        {/* Header */}
        <div className="text-center mb-12">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            Tulisan & Pikiran
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--dark)' }}>
            Blog
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--body-color)' }}>
            Catatan perjalanan belajar, refleksi, dan hal-hal yang saya pikir layak dibagikan.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active === cat ? 'var(--primary)' : 'var(--card-bg)',
                color: active === cat ? '#fff' : 'var(--body-color)',
                border: `1px solid ${active === cat ? 'var(--primary)' : 'var(--border)'}`,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Post list */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
                className="card p-6 cursor-pointer"
                onClick={() => setSelected(post)}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${post.color}15`, border: `1px solid ${post.color}25` }}>
                    {post.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${post.color}15`, color: post.color }}>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--body-color)' }}>
                        <Clock size={11} /> {post.readTime}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--body-color)' }}>{post.date}</span>
                    </div>
                    <h2 className="font-display font-bold text-base leading-snug mb-1" style={{ color: 'var(--dark)' }}>
                      {post.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--body-color)' }}>{post.subtitle}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                  <ChevronRight size={18} style={{ color: 'var(--border)', flexShrink: 0, marginTop: 4 }} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📭</p>
            <p style={{ color: 'var(--body-color)' }}>Belum ada tulisan di kategori ini.</p>
          </div>
        )}
      </div>

      {/* Post modal / reader */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', zIndex: 100 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                position: 'fixed', inset: '1rem',
                maxWidth: 680, margin: '0 auto',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '1.25rem',
                zIndex: 101,
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b shrink-0"
                style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selected.emoji}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${selected.color}15`, color: selected.color }}>
                    {selected.category}
                  </span>
                </div>
                <motion.button onClick={() => setSelected(null)}
                  whileTap={{ rotate: 90 }} style={{ color: 'var(--body-color)', background: 'none', border: 'none' }}>
                  <X size={20} />
                </motion.button>
              </div>

              {/* Modal body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <h1 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--dark)' }}>
                  {selected.title}
                </h1>
                <p className="text-sm mb-4" style={{ color: 'var(--body-color)' }}>{selected.subtitle}</p>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--body-color)' }}>
                    <Clock size={11} /> {selected.readTime}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--body-color)' }}>{selected.date}</span>
                </div>
                {/* Content — render newlines as paragraphs */}
                <div className="prose-felix">
                  {selected.content.split('\n\n').map((block, i) => {
                    if (block.startsWith('**') && block.endsWith('**')) {
                      return (
                        <h3 key={i} className="font-display font-bold text-base mt-5 mb-2" style={{ color: 'var(--dark)' }}>
                          {block.replace(/\*\*/g, '')}
                        </h3>
                      )
                    }
                    return (
                      <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--body-color)' }}>
                        {block.replace(/\*\*(.*?)\*\*/g, '$1')}
                      </p>
                    )
                  })}
                </div>
                <div className="flex flex-wrap gap-1 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  {selected.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
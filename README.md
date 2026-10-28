Kategori: Web App — Media Sosial Platform

# Saparia — Media Sosial Kreatif

> **Kategori proyek: Web App — Media Sosial Platform.**
> Feed postingan dengan like, komentar, bookmark, dan share; composer posting;
> saran akun yang bisa diikuti; trending hashtag; dan profil pengguna.

Aplikasi media sosial fiktif "Saparia" — komunitas kreatif Indonesia (desainer,
fotografer, penulis, pemilik kedai kopi) berbagi karya dan cerita harian.
Proyek ini adalah **concept demo** untuk portofolio jasa pembuatan web app —
seluruh nama, akun, postingan, dan angka bersifat fiktif. Nama "Saparia"
sengaja dibuat unik (belum dipakai entitas mana pun di internet).

**Live:** https://saparia.vercel.app

## Fitur

- **Feed beranda**: 9 postingan awal (teks + 1–2 foto), avatar & role akun,
  waktu relatif ("2 jam", "kemarin"), dan hashtag yang bisa diklik untuk
  memfilter feed.
- **Interaksi lengkap per postingan**: like (live count), komentar yang bisa
  di-expand + tambah komentar sebagai akun sendiri, bookmark (ikon terisi),
  dan share dengan penghitung + notifikasi "Dibagikan!".
- **Composer posting**: teks maks. 280 karakter dengan penghitung, opsi
  melampirkan 1 foto dari galeri demo, postingan baru langsung muncul di atas
  feed dan tersimpan.
- **Sidebar kanan**: kartu profil saya (statistik postingan/mengikuti/
  pengikut), saran akun dengan tombol Ikuti/Mengikuti yang berubah live, dan
  trending hashtag yang dihitung otomatis dari seluruh postingan.
- **Profil pengguna lain**: kartu profil (bio, lokasi, bergabung, statistik),
  tombol ikuti, dan seluruh postingannya — interaksi tetap berfungsi.
- **Semua state** (postingan, komentar, like, bookmark, share, daftar
  mengikuti) persist di **localStorage**.
- Responsif desktop + mobile (tab navigasi bawah), animasi halus
  Framer Motion, ikon Lucide, tanpa backend & tanpa library chart.

## Untuk siapa demo ini?

Komunitas kreatif, startup yang butuh fitur sosial (feed, komentar, follow),
atau brand yang ingin membangun ruang komunitas sendiri di website mereka.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (token tema `@theme`)
- Framer Motion
- Lucide Icons

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # production build ke folder dist/
npm run preview  # preview hasil build
```

---

Dibuat oleh [Agni Miftah Fauzi](https://github.com/Atazyyy) — jasa pembuatan
website & web app.

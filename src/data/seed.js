// Data contoh Saparia — seluruh nama, akun, postingan, dan angka bersifat FIKTIF.
// Timestamp dihitung relatif terhadap waktu halaman dibuka supaya feed
// selalu terlihat "hidup" (ada postingan 2 jam lalu, kemarin, dsb).

const H = 3600000; // satu jam dalam ms
const M = 60000; // satu menit dalam ms

export const WA_NUMBER = "6281234567890";

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;

// ---------- Akun "saya" (persona fiktif) ----------
export const ME = {
  id: "me",
  name: "Dirga Prasetya",
  username: "dirgaprasetya",
  avatar: img("1599566150163-29194dcaad36"),
  bio: "Desainer produk. Penggemar kopi, fotografi jalanan, dan antarmuka yang rapi. Sering muncul di kedai paling ramai kota.",
  role: "Desainer Produk",
  location: "Bandung",
  joined: "Mei 2023",
  followers: 182,
  followingBase: 240, // akun lain di luar daftar demo ini
};

// ---------- Pengguna lain (semua fiktif) ----------
export const USERS = [
  {
    id: "u1",
    name: "Rania Putri",
    username: "raniaputri",
    avatar: img("1494790108377-be9c29b29330"),
    bio: "Ilustrator freelance. Melukis digital, palet hangat, dan komisi terbuka tiap awal bulan.",
    role: "Ilustrator",
    location: "Yogyakarta",
    joined: "Jan 2022",
    followers: 2410,
    following: 318,
  },
  {
    id: "u2",
    name: "Bagas Ardiansyah",
    username: "bagasard",
    avatar: img("1500648767791-00dcc994a43e"),
    bio: "Fotografer jalanan. Berburu cahaya emas sebelum kota bangun. Cetak analog, Upload digital.",
    role: "Fotografer",
    location: "Bandung",
    joined: "Agu 2021",
    followers: 1875,
    following: 204,
  },
  {
    id: "u3",
    name: "Salsabila Rahma",
    username: "salsarahma",
    avatar: img("1438761681033-6461ffad8d80"),
    bio: "Mahasiswa sastra yang menulis tiap subuh. Sedang merampungkan kumpulan cerpen bertema pelabuhan.",
    role: "Penulis",
    location: "Surabaya",
    joined: "Mar 2023",
    followers: 942,
    following: 187,
  },
  {
    id: "u4",
    name: "Fajar Nugroho",
    username: "fajarnug",
    avatar: img("1472099645785-5658abf4ff4e"),
    bio: "Web developer. Senin–Jumat kerja kantoran, malamnya membangun proyek pribadi yang tidak selesai-selesai.",
    role: "Web Developer",
    location: "Jakarta Selatan",
    joined: "Nov 2022",
    followers: 1231,
    following: 356,
  },
  {
    id: "u5",
    name: "Melati Kusuma",
    username: "melatikopi",
    avatar: img("1580489944761-15a19d654956"),
    bio: "Pemilik Kedai Teratai. Kopi susu gula aren terbaik di gang kecil Kemang, kata pelanggan yang baik hati.",
    role: "Pemilik Kedai Kopi",
    location: "Jakarta Selatan",
    joined: "Jun 2021",
    followers: 3208,
    following: 412,
  },
  {
    id: "u6",
    name: "Reza Amrullah",
    username: "rezamr",
    avatar: img("1560250097-0b93528c311a"),
    bio: "Videographer event & pernikahan. Kamera kedua selalu siap, baterai ketiga hidup selalu.",
    role: "Videographer",
    location: "Bandung",
    joined: "Feb 2022",
    followers: 1567,
    following: 289,
  },
  {
    id: "u7",
    name: "Nadia Zahra",
    username: "nadiazahra",
    avatar: img("1573496359142-b8d87734a5a2"),
    bio: "Suka naik gunung tanpa mengunggah puncak. Kolektor tanaman hias yang setengahnya sudah diserahkan ke lilin aromaterapi.",
    role: "Pendaki Akhir Pekan",
    location: "Malang",
    joined: "Sep 2023",
    followers: 683,
    following: 245,
  },
];

export const ALL_USERS = [ME, ...USERS];

export const userById = (id) => ALL_USERS.find((u) => u.id === id) || ME;

// ---------- Komentar awal ----------
const c = (id, authorId, h, text) => ({
  id,
  authorId,
  ts: Date.now() - h * H,
  text,
});

// ---------- Postingan awal (9) ----------
export const SEED_POSTS = [
  {
    id: "p1",
    authorId: "u2",
    ts: Date.now() - 2 * H,
    text: "Buruan pagi di Jalan Braga belum ada siapa-siapa. Cahaya emas seperti ini cuma bertahan dua puluh menit — sisanya kaki yang menentukan. #FotografiJalanan #Bandung",
    photos: [img("1493397212122-2b85dda8106b"), img("1554118811-1e0d58224f24")],
    likes: 214,
    liked: false,
    bookmarked: false,
    shares: 18,
    comments: [
      c("c1a", "u6", 1.6, "Frame kedua gila sih, komposisinya rapi banget. Lensa 35mm?"),
      c("c1b", "u1", 1.2, "Warnanya hangat sekali, boleh jadi referensi palet lukisan aku 😄"),
      c("c1c", ME.id, 0.9, "Rute biasanya lewat mana, Mas? Aku mau ikut hunting akhir pekan ini."),
    ],
  },
  {
    id: "p2",
    authorId: "u5",
    ts: Date.now() - 4 * H,
    text: "Menu baru minggu ini: Es Kopi Teratai Aren — kombinasikan gula aren tembakan sendiri dengan susu segar. Yang pakai aplikasi dapat diskon 20% sampai Jumat! #KedaiKopi #Ngopi #MenuBaru",
    photos: [img("1476224203421-9ac39bcb3327")],
    likes: 156,
    liked: false,
    bookmarked: false,
    shares: 11,
    comments: [
      c("c2a", "u4", 3.1, "Jadwal meeting jam 3 sore langsung aku pindah ke sini deh."),
      c("c2b", "u7", 2.4, "Manisnya bisa kurang gak, Mba? Biasanya tahan gula."),
    ],
  },
  {
    id: "p3",
    authorId: "u4",
    ts: Date.now() - 6 * H,
    text: "Akhirnya berani juga rilis side project ke publik walau masih kasar. Tiga bulan ngoding tiap malam, dua kali mau nyerah, sekali deploy berhasil. Besok coba tulis catatan prosesnya. #Ngoding #WebDev #SideProject",
    photos: [],
    likes: 89,
    liked: false,
    bookmarked: false,
    shares: 7,
    comments: [
      c("c3a", ME.id, 5.2, "Selamat, Kak! Yang penting rilis dulu, poles belakangan."),
      c("c3b", "u3", 4.6, "Tunggu catatan prosesnya, biasanya bagian gagalnya paling menarik dibaca."),
    ],
  },
  {
    id: "p4",
    authorId: "u3",
    ts: Date.now() - 9 * H,
    text: "Perpustakaan kampus itu tempat perpisahan yang paling jujur. Kamu datang bawa satu buku, pulang bawa empat, dan satu cerita yang belum selesai kamu tulis. #Menulis #Buku #Kutipan",
    photos: [img("1481627834876-b7833e8f5570")],
    likes: 203,
    liked: false,
    bookmarked: false,
    shares: 24,
    comments: [
      c("c4a", "u1", 8.2, "Kalimat terakhirnya nempel di kepala. Semoga cerpennya segera terbit!"),
      c("c4b", "u6", 7.5, "Kalau sudah terbit kabari, aku pesan yang dicetak."),
    ],
  },
  {
    id: "p5",
    authorId: "u1",
    ts: Date.now() - 12 * H,
    text: "Proses commission hari ini: sketsa → blok warna → detail. Tema kali ini gang kota waktu hujan, palet ungu-fuchsia sesuai request klien. Tahap paling lama? Menahan diri untuk tidak menambah detail lagi. #Ilustrasi #SeniDigital #ProsesKreatif",
    photos: [img("1541961017774-22349e4a1262")],
    likes: 178,
    liked: false,
    bookmarked: false,
    shares: 9,
    comments: [
      c("c5a", "u5", 10.4, "Aku mau pesan satu untuk kemasan kopi, nanti aku DM ya."),
      c("c5b", ME.id, 9.8, "Palet ungu-fuchsia-nya pas banget sama tren sekarang."),
    ],
  },
  {
    id: "p6",
    authorId: "u7",
    ts: Date.now() - 20 * H,
    text: "Naik pendek saja akhir pekan ini: start 4 pagi, puncak sebelum matahari terlalu tinggi, turun sebelum hujan. Total 11 km dan satu jasa titip doa dari ibu-ibu di basecamp. #Pendakian #Alam #AkhirPekan",
    photos: [img("1470071459604-3b5ec3a7fe05")],
    likes: 97,
    liked: false,
    bookmarked: false,
    shares: 4,
    comments: [
      c("c6a", "u2", 17.2, "Gunung mana nih? Kayaknya cocok buat foto sunrise."),
    ],
  },
  {
    id: "p7",
    authorId: "u6",
    ts: Date.now() - 28 * H,
    text: "Behind the scene kemarin: satu panggung, dua kamera, empat belas jam rekaman, dan satu cadangan di kartu ketiga yang akhirnya dipakai. Konser aman, kaki belum. #Sinematografi #BehindTheScene #Event",
    photos: [img("1492684223066-81342ee5ff30")],
    likes: 132,
    liked: false,
    bookmarked: false,
    shares: 15,
    comments: [
      c("c7a", "u4", 25.6, "Empat belas jam itu berapa gigi kertas, Bang? 😅"),
      c("c7b", "u1", 24.1, "Kabari kalau butuh poster, komisi terbuka kok."),
    ],
  },
  {
    id: "p8",
    authorId: ME.id,
    ts: Date.now() - 26 * H,
    text: "Riset antarmuka di kedai baru dekat kampus. Temuan hari ini: orang lebih sabar menunggu kopi daripada menunggu halaman dimuat. Catatan desain lanjutan menyusul. #DesainUI #Ngopi #Bandung",
    photos: [img("1517248135467-4c7edcad34c4")],
    likes: 42,
    liked: false,
    bookmarked: false,
    shares: 2,
    comments: [
      c("c8a", "u5", 24.3, "Kutipan itu layak ditempel di kasir kedai, serius."),
    ],
  },
  {
    id: "p9",
    authorId: "u2",
    ts: Date.now() - 34 * H,
    text: "Tanya buat yang main kamera: buat street photography malam, lebih enak prime 35mm f/1.8 atau zoom standar yang fleksibel? Budget terbatas, alasan paling masuk akal menang. #Fotografi #TanyaJawab",
    photos: [],
    likes: 45,
    liked: false,
    bookmarked: false,
    shares: 1,
    comments: [
      c("c9a", "u6", 30.4, "Prime 35mm. Keterbatasan justru melatih kaki dan mata."),
      c("c9b", ME.id, 29.7, "Setuju, prime. Kita jalan lebih banyak kalau tidak bisa zoom."),
      c("c9c", "u4", 28.9, "Zoom dulu, nanti kalau sudah rajin jalan upgrade ke prime."),
      c("c9d", "u7", 27.5, "Pinjam dulu dua-duanya, baru beli. Hemat paling besar."),
    ],
  },
];

// ---------- Galeri foto untuk composer (semua URL terverifikasi) ----------
export const PICKER_PHOTOS = [
  { id: "ph1", label: "Makanan", url: img("1504674900247-0877df9cc836") },
  { id: "ph2", label: "Karya seni", url: img("1541961017774-22349e4a1262") },
  { id: "ph3", label: "Alam", url: img("1470071459604-3b5ec3a7fe05") },
  { id: "ph4", label: "Meja kerja", url: img("1460925895917-afdab827c52f") },
  { id: "ph5", label: "Acara", url: img("1492684223066-81342ee5ff30") },
  { id: "ph6", label: "Buku", url: img("1524995997946-a1c2e315a42f") },
];

// Akun yang sudah diikuti "saya" sejak awal (supaya saran akun tidak kosong)
export const SEED_FOLLOWS = ["u3", "u6"];

// ---------- Util hashtag ----------
export const extractHashtags = (text) => {
  const matches = String(text || "").match(/#[A-Za-z0-9_]+/g) || [];
  return matches.map((t) => t.slice(1).toLowerCase());
};

// Hashtag tren: hitung frekuensi di semua postingan, urutkan terbanyak
export function trendingHashtags(posts, top = 5) {
  const count = new Map();
  for (const p of posts) {
    for (const tag of new Set(extractHashtags(p.text))) {
      count.set(tag, (count.get(tag) || 0) + 1);
    }
  }
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, top)
    .map(([tag, n]) => ({ tag, count: n }));
}

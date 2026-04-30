# KognitiF — Project Handoff

## Repository

| | |
|---|---|
| **GitHub** | https://github.com/palevvi-art/test-siap-kerja |
| **Live URL** | https://test-siap-kerja.vercel.app |
| **Local path** | `~/Documents/test-siap-kerja` |
| **Branch** | `main` (langsung push ke sini) |
| **Deploy** | Auto-deploy via Vercel saat push ke `main` |

### Setup lokal

```bash
cd ~/Documents/test-siap-kerja
npm install
npm run dev        # localhost:8080
npm run build      # production build ke /dist
npm run test       # vitest
```

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Routing | react-router-dom v6 |
| Charts | Recharts |
| State | React useState/useRef (no external state manager) |
| Storage | localStorage (tidak ada backend/database) |
| Deploy | Vercel — SPA rewrite via `vercel.json` |
| Fonts | Inter dari Google Fonts |

---

## Struktur File Penting

```
src/
├── App.tsx                          # Routes — semua 10 tes sudah terdaftar
├── index.css                        # CSS variables (color tokens), utilities
│
├── lib/
│   ├── testRegistry.ts              # ← SINGLE SOURCE OF TRUTH untuk semua modul
│   │                                #   Tambah/ubah tes di sini, bukan di tempat lain
│   └── storage.ts                   # localStorage: saveResult, getResults, getResultById
│
├── components/
│   ├── Layout.tsx                   # Sticky navbar, digunakan semua halaman kecuali Index
│   ├── TestCard.tsx                 # Kartu tes di /tes, baca best score dari storage
│   └── TestWrapper.tsx              # ← ENGINE utama tes: state machine intro→latihan→tes→hasil
│
├── pages/
│   ├── Index.tsx                    # Landing page (punya navbar sendiri, tidak pakai Layout)
│   ├── TestSelection.tsx            # /tes — grid semua modul + progress bar
│   ├── Results.tsx                  # /hasil/:id — ringkasan hasil + chart per segmen
│   ├── Dashboard.tsx                # /dashboard — riwayat + summary stats
│   ├── NotFound.tsx                 # 404
│   └── tests/                       # 10 file tes individual
│       ├── PatternTest.tsx          # /tes/pengenalan-pola
│       ├── WorkingMemoryTest.tsx    # /tes/daya-ingat
│       ├── ProcessingSpeedTest.tsx  # /tes/kecepatan-pemrosesan
│       ├── KraepelinTest.tsx        # /tes/kraepelin
│       ├── VisualAccuracyTest.tsx   # /tes/ketelitian-visual
│       ├── SustainedFocusTest.tsx   # /tes/fokus-berkelanjutan
│       ├── QuickMathTest.tsx        # /tes/hitung-cepat
│       ├── NumberAccuracyTest.tsx   # /tes/ketelitian-angka
│       ├── EnduranceTest.tsx        # /tes/ketahanan-tugas
│       └── VerbalReasoningTest.tsx  # /tes/penalaran-verbal
│
public/
├── robots.txt                       # Allow all + sitemap reference
└── sitemap.xml                      # 13 URL terdaftar

vercel.json                          # SPA rewrite rules — JANGAN dihapus
index.html                           # Meta, JSON-LD WebApplication schema, Inter font
```

---

## Cara Kerja TestWrapper (Pola Utama)

Semua halaman tes menggunakan satu komponen `TestWrapper` dengan state machine:

```
intro → trial-intro → trial → trial-done → running → done
```

- **intro**: tampil nama + deskripsi tes
- **trial-intro**: pilih mulai latihan atau lewati
- **trial**: 5 soal tidak dinilai, ada feedback benar/salah
- **trial-done**: konfirmasi sebelum tes dimulai
- **running**: timer aktif, soal berulang, jawaban dicatat ke ref
- **done**: hitung skor, simpan ke localStorage, navigate ke `/hasil/:id`

### Cara menambah tes baru

1. Tambah entry di `src/lib/testRegistry.ts`
2. Tambah route di `src/App.tsx`
3. Buat file `src/pages/tests/NamaTest.tsx`
4. Tambah URL ke `public/sitemap.xml`

Contoh template tes baru:

```tsx
import TestWrapper from "@/components/TestWrapper";

const MyTest = () => (
  <TestWrapper
    testType="id-tes-sesuai-registry"
    testName="Nama Tes"
    description="Deskripsi singkat."
    durationSeconds={180}
    segmentDurationSeconds={60}
  >
    {({ onResponse, isRunning }) => (
      <MyTestEngine onResponse={onResponse} isRunning={isRunning} />
    )}
  </TestWrapper>
);
```

`onResponse(correct: boolean, responseTimeMs: number)` — panggil ini setiap user menjawab.

---

## Data Model

```typescript
// src/lib/storage.ts
interface TestResult {
  id: string;           // auto-generated (timestamp+random)
  testType: string;     // harus match id di testRegistry.ts
  testName: string;
  date: string;         // ISO string
  duration: number;     // detik
  totalResponses: number;
  correctResponses: number;
  accuracy: number;     // 0–100
  avgResponseTime: number; // ms
  segmentData: SegmentData[];
}

interface SegmentData {
  segment: number;
  correct: number;
  incorrect: number;
  avgTime: number;  // ms
}
```

Semua disimpan di `localStorage` key `'cognitive-test-results'`. Tidak ada backend.

---

## Design Tokens (index.css)

```
--primary: 172 50% 36%     → teal/hijau tua
--foreground: 220 20% 10%  → hampir hitam
--muted-foreground: 220 10% 46%
--border: 214 20% 90%
--background: 210 20% 98%  → off-white
```

**Aturan desain yang harus diikuti:**
- Tidak ada em dash (—) di konten manapun
- Tidak ada shadow besar atau card dengan border-radius besar
- Heading hierarchy: H1 di hero, H2 untuk section, H3 untuk sub-item
- Warna primary hanya untuk aksen, bukan background besar
- CTA utama pakai `bg-foreground text-background` (hitam), bukan gradient

---

## SEO — Status Saat Ini

| Item | Status |
|---|---|
| vercel.json rewrite | ✅ Ada |
| Title + meta desc | ✅ Keyword-intent |
| Canonical | ✅ Ada |
| og:title, og:description | ✅ Ada |
| twitter:card summary_large_image | ✅ Ada |
| robots.txt + sitemap ref | ✅ Ada |
| sitemap.xml (13 URL) | ✅ Ada |
| JSON-LD WebApplication | ✅ Ada di index.html |
| H1/H2/H3 hierarchy | ✅ Ada di landing |
| og:image / twitter:image | ❌ Belum ada asset |
| FAQ schema per halaman tes | ❌ Belum |
| BreadcrumbList schema | ❌ Belum |
| Halaman statis per tes (konten SEO) | ❌ Belum |
| SSR/SSG | ❌ Masih pure SPA |

---

## Backlog — Hal yang Perlu Dikerjakan

Urutan berdasarkan dampak.

### 🔴 Prioritas Tinggi

**1. OG Image**
Buat gambar statis `public/og-image.png` (1200×630px) dengan teks "KognitiF" dan tagline.
Tambahkan ke `index.html`:
```html
<meta property="og:image" content="https://test-siap-kerja.vercel.app/og-image.png" />
<meta name="twitter:image" content="https://test-siap-kerja.vercel.app/og-image.png" />
```

**2. FAQ Schema per halaman tes**
Setiap halaman tes perlu JSON-LD `FAQPage` untuk GEO (muncul di AI Overview, Perplexity, dll).
Contoh untuk `/tes/kraepelin`:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apa itu tes Kraepelin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tes Kraepelin adalah tes penjumlahan angka vertikal yang digunakan untuk mengukur..."
      }
    }
  ]
}
```
Implementasi: buat komponen `<TestPageMeta />` yang inject script JSON-LD per tes.

**3. Halaman per tes dengan konten SEO**
Saat ini `/tes/kraepelin` langsung masuk ke tes. Seharusnya ada halaman intro yang crawlable dengan:
- H1: "Tes Kraepelin Digital Online"
- Paragraf: apa itu tes ini, dipakai di seleksi apa (BUMN, CPNS, bank)
- FAQ accordion
- Tombol "Mulai Tes"
Ini yang akan ranking di Google untuk keyword seperti "tes kraepelin online gratis".

**4. Custom domain**
`test-siap-kerja.vercel.app` tidak punya domain authority. Daftarkan domain seperti `kognitis.id` atau `teskerja.id` dan pasang di Vercel.

---

### 🟠 Prioritas Menengah

**5. Halaman hasil shareable**
Saat ini `/hasil/:id` sudah ada dan unik per sesi, tapi hasilnya hilang saat localStorage di-clear.
Yang perlu ditambah:
- Tombol "Bagikan Hasil" yang copy URL ke clipboard
- Preview visual hasil (box dengan skor besar) yang bisa di-screenshot
- Pertimbangkan simpan hasil ke Supabase agar URL tetap valid di device lain

**6. BreadcrumbList schema**
Tambah JSON-LD di halaman tes dan hasil:
```
KognitiF > Pilih Tes > Kraepelin Digital
```

**7. Tes tambahan yang paling dicari**
Berdasarkan keyword intent Indonesia:
- **Tes Pauli** (mirip Kraepelin tapi format beda — dicari sebanding dengan Kraepelin)
- **Tes Army Alpha** (sinonim/antonim + logika — dipakai TNI/Polri)
- **Tes Rotasi Matriks** (mirip Raven — dipakai hampir semua assessment center)
Tambah ke `testRegistry.ts`, buat file tes, tambah route + sitemap.

**8. Dashboard: grafik radar kognitif**
Setelah user menyelesaikan minimal 3 tes berbeda, tampilkan radar chart yang menunjukkan profil kognitif mereka (fokus vs ketelitian vs kecepatan vs memori vs verbal).
Library sudah tersedia: Recharts `RadarChart`.

---

### 🟡 Prioritas Rendah

**9. Migrasi ke Next.js (SSR/SSG)**
Ini perubahan arsitektur besar. Lakukan hanya jika organic traffic sudah ada dan SEO jadi prioritas utama. Manfaat: halaman per tes jadi static HTML yang crawlable, PSEO jadi mungkin.

**10. Konten blog**
Target keyword long-tail dengan artikel:
- `/blog/cara-latihan-tes-kraepelin`
- `/blog/perbedaan-tes-kraepelin-dan-pauli`
- `/blog/tes-psikologi-bumn-2025`
Perlu CMS atau MDX setup jika mau di-maintain.

**11. Mode HR/Rekruter**
Landing page B2B: "Kirim link tes ke kandidat, lihat hasilnya." Butuh backend + auth.

**12. Benchmark percentile**
Jika ada cukup pengguna, tampilkan "Skor kamu lebih tinggi dari X% pengguna lain." Butuh backend untuk aggregate data anonim.

---

## Aturan Coding (dari agent_rule.txt)

- **TDD**: Tulis tes gagal dulu sebelum kode produksi (Red → Green → Refactor)
- **State machine**: Definisikan states, events, transitions sebelum implementasi
- **Readability first**: Nama jelas, fungsi kecil, early return
- **No cleverness**: Kode harus bisa dibaca orang lain dalam 5 detik
- Test dianggap selesai hanya jika semua tes passing

---

## Yang JANGAN Dilakukan

- Jangan hapus atau ubah `vercel.json` — ini yang bikin routing tidak 404
- Jangan tambah data tes di luar `testRegistry.ts` — selalu update registry dulu
- Jangan pakai em dash (—) di konten apapun
- Jangan pakai gradient besar atau shadow tebal — desain flat/minimal
- Jangan commit `node_modules` atau `.env`
- Jangan push langsung tanpa build check: `npm run build` harus sukses

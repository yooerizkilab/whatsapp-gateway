# Auto-Responder / Chatbot Builder

Fitur Auto-Responder memungkinkan _User_ untuk memberikan balasan pesan otomatis ke _Contact_ berdasarkan pesan masuk, tanpa perlu campur tangan admin secara langsung.

## Mode Operasi

Fitur ini memiliki 2 lapis (_Layer_) respon:

1.  **Keyword Rules (Lapisan 1)**
    Sistem akan mengecek terlebih dahulu apakah pesan yang masuk mengandung Keyword yang telah ditentukan oleh Admin. Terdapat 4 tipe pencocokan (Match Type):
    - **CONTAINS:** Pesan mengandung keyword di tengah, awal, atau akhir kalimat.
    - **EXACT:** Pesan sama persis dengan keyword (hanya mengabaikan huruf besar/kecil).
    - **STARTSWITH:** Pesan di awali dengan keyword tertentu (misal: "Halo").
    - **REGEX:** Ekspresi Reguler lebih advance untuk menangkap pola kalimat.

2.  **AI Fallback (Lapisan 2)**
    Jika tidak ada satupun _Keyword Rule_ yang cocok, dan Admin mengaktifkan fitur AI, pesan akan diproses dan dibalas menggunakan _Artificial Intelligence_.
    Provider AI yang didukung saat ini:
    - OpenAI (GPT)
    - Anthropic (Claude)
    - Google Gemini

## Struktur Database

Model Prisma yang terlibat:

- `AutoResponder`: Mewakili pengaturan master per-Device (Nama, Status Aktif, Provider AI, Prompt).
- `AutoResponderRule`: Mewakili masing-masing keyword dan balasan terusan milik suatu AutoResponder (Relasi One-To-Many).

## Alur Sistem Backend (`sessionManager.ts`)

1. Pada adapter _Baileys_ (`messages.upsert`), sistem memfilter pesan yang bertipe _notify_ (pesan masuk sesungguhnya).
2. Sistem mengekstrak isi teks di payload, baik dari `conversation`, `extendedTextMessage`, atau _caption_ pada media gambar/video.
3. Memanggil `handleAutoRespond(deviceId, from, text)`.
4. Jika menemukan Rule cocok, balas pesan ke User dan _Bypass_ AI.
5. Jika tidak ada Rule cocok, lempar ke AI, tunggu _response_, lalu kirim hasil balasan teks AI.

## Konfigurasi Env

Untuk menggunakan AI, set kunci rahasia (_API Keys_) pada file `backend/.env`:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
```

# Konfigurasi Environment (`.env`)

Bagian ini menjelaskan detail konfigurasi environment yang diperlukan untuk menjalankan sistem.

## Konfigurasi Backend (`backend/.env`)

Silakan sesuaikan isi file `.env` di dalam folder `backend`:

```env
# Koneksi Database (Ubah root & password sesuai lokal PC Anda)
DATABASE_URL="mysql://root:password@localhost:3306/whatsapp_gateway"

# Port berjalannya API Backend
PORT=3001

# Rahasia JWT (Ganti dengan string acak)
JWT_SECRET="rahasia_jwt_sangat_kuat_123"

# Lokasi penyimpanan sesi cache WhatsApp (Local Folder)
SESSION_DIR="./sessions"

# Interval worker untuk mengecek DB (MiliDetik)
WORKER_INTERVAL_MS=5000

# Jeda waktu pengiriman antar pesan untuk menghindari Banned (MiliDetik)
MESSAGE_DELAY_MS=3000

# URL Frontend (Untuk keamanan CORS)
FRONTEND_URL="http://localhost:3000"

# AI API Keys (Default Global)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...

# NOTE: API Keys di atas adalah nilai default global. 
# Jika Anda mengisi API Key pada halaman pengaturan Auto-Responder di Dashboard, 
# maka key khusus per-device tersebut akan digunakan menggantikan key di atas.
```

---

## Konfigurasi Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

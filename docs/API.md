# Dokumentasi API & WebSocket

Bagian ini berisi referensi teknis untuk integrasi dengan API WhatsApp Gateway.

## 🔌 Dokumentasi Singkat API Terintegrasi

Backend REST API ini berjalan di prefix `/api/`. Seluruh API diamankan dengan mode Bearer Token JWT (kecuali `/api/auth/login`). Header yang harus dikirimkan:
`Authorization: Bearer <token_anda>`

### 1. Authentication

- **`POST /api/auth/login`**: Untuk mendapatkan token JWT.
  - Payload: `{ "email": "admin@example.com", "password": "..." }`
- **`GET /api/auth/me`**: Mendapatkan profil pengguna yang sedang login.

### 2. Devices (Perangkat WA)

- **`GET /api/devices`**: Menampilkan semua sesi perangkat.
- **`POST /api/devices`**: Mendaftarkan sesi perangkat baru untuk login.
- **`DELETE /api/devices/:id`**: Melakukan remote logout dan menghapus sesi di server.

### 3. Messaging (Pesan)

- **`POST /api/messages/send`**: Mengirim pesan Real-time (seperti HTTP API Whatsapp pada umumnya).
  - Payload: `{ "deviceId": "123", "to": "6281...", "type": "TEXT", "content": "Pesan Tes" }`
  - Mendukung `"type": "IMAGE" | "DOCUMENT"` dengan opsi parameter `"mediaUrl"`.
- **`GET /api/logs`**: Menampilkan riwayat pengiriman pesan beserta status (_PENDING, SENT, DELIVERED, READ, FAILED_).

### 4. Blast Campaign (Broadcast Massal)

- **`POST /api/blasts`**: Mendaftarkan jadwal blast massal kepada sekumpulan Kontak (Grup).
  - Payload akan langsung dimasukkan ke database Queue, dan akan otomatis dikerjakan oleh **Worker**.

---

## 5. Websocket Server (Realtime)

Koneksi websocket berada di `ws://localhost:3001/ws`.
Digunakan oleh frontend untuk menerima update status device secara _Live_, kode QR, dan riwayat status pesan tanpa perlu melakukan manual refresh halaman.

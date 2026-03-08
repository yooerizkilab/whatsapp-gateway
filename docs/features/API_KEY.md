# 🔑 API Key Management (Developer Feature)

Fitur API Key memungkinkan developer untuk mengintegrasikan WhatsApp Gateway ke sistem eksternal tanpa harus mengandalkan sesi login (JWT) yang memiliki masa kadaluarsa singkat.

## 🌟 Keunggulan API Key

- **Permanen**: Tidak akan expired kecuali dihapus oleh user.
- **Sederhana**: Cukup sertakan dalam header HTTP.
- **Aman**: Hanya ditampilkan satu kali saat pembuatan. Di database, key disimpan dalam format yang terenkripsi (atau di-masking saat ditampilkan kembali).

## 🚀 Cara Penggunaan

### 1. Membuat API Key

1. Buka menu **Settings** di Sidebar.
2. Pada bagian **Developer API Keys**, masukkan nama untuk key Anda (misal: "Server Production").
3. Klik **Generate Key**.
4. **PENTING**: Salin dan simpan key tersebut. Anda tidak akan bisa melihatnya lagi setelah menutup notifikasi.

### 2. Integrasi ke Kode (Server-Side)

Gunakan header `x-api-key` pada setiap request API.

**Contoh menggunakan Node.js (Axios):**

```javascript
const axios = require("axios");

const API_KEY = "ak_your_generated_random_key_here";

async function sendNotification() {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/messages/send",
      {
        deviceId: "...",
        to: "628123...",
        content: "Halo dari server!",
      },
      {
        headers: { "x-api-key": API_KEY },
      },
    );
    console.log("Success:", response.data);
  } catch (err) {
    console.error("Failed:", err.response.data);
  }
}
```

### 3. Keamanan (Revoke)

Jika API Key Anda bocor atau tidak lagi digunakan, Anda bisa menghapusnya melalui tombol **Revoke** di halaman Settings. Akses menggunakan key tersebut akan langsung ditolak oleh sistem.

---

## 🛠 Detail Teknis Backend

- Header: `x-api-key`
- Database: Tabel `api_keys` berelasi dengan `users`.
- Middleware: Authentication secara otomatis mendeteksi header ini sebelum mengecek JWT.

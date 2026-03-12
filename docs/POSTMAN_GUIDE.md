# 🚀 Panduan Postman (Integrasi API)

Dokumen ini menjelaskan langkah-langkah bagi pengembang untuk menguji atau mengintegrasikan API WhatsApp Gateway menggunakan **Postman**.

---

## 🏗️ 1. Persiapan (Base URL)

Pastikan backend Anda sudah berjalan. Secara default:
- **Base URL**: `http://localhost:3001/v1`

---

## 🔑 2. Tahap Autentikasi (Mendapatkan Token)

Hampir semua API membutuhkan token JWT. Ikuti langkah ini:

1.  Buat Request baru di Postman.
2.  Set Method ke **POST**.
3.  URL: `{{BASE_URL}}/auth/login`
4.  Pilih tab **Body** -> **raw** -> **JSON**.
5.  Masukkan email dan password Anda:
    ```json
    {
      "email": "admin@example.com",
      "password": "password123"
    }
    ```
6.  Klik **Send**. Anda akan mendapatkan `token` di dalam response.

> [!TIP]
> Salin nilai `token` tersebut untuk digunakan di langkah berikutnya.

---

## ✉️ 3. Mengirim Pesan (Authorized Request)

Setelah mendapatkan token, Anda bisa mencoba mengirim pesan:

1.  Buat Request baru (Method: **POST**).
2.  URL: `{{BASE_URL}}/messages/send`
3.  Pilih tab **Authorization**:
    - Type: **Bearer Token**
    - Token: (Tempel token yang Anda salin tadi)
4.  Pilih tab **Body** -> **raw** -> **JSON**:
    ```json
    {
      "deviceId": "isi-id-device-anda",
      "to": "628123456789",
      "content": "Halo dari Postman!"
    }
    ```
5.  Klik **Send**.

---

## 🛠️ Tips Postman (Environment Variables)

Agar lebih efisien, disarankan menggunakan **Environment** di Postman:
1.  Buat Environment baru (misal: "WA Gateway Local").
2.  Tambahkan variabel `BASE_URL` dengan nilai `http://localhost:3001/v1`.
3.  Gunakan variabel tersebut di URL request menggunakan kurung kurawal ganda: `{{BASE_URL}}/auth/login`.

---

[🔌 Kembali ke Referensi API](API.md) | [🏠 Home](README.md)

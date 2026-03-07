# Panduan Penggunaan & Format Data

Halaman ini berisi instruksi cara menggunakan aplikasi setelah instalasi selesai, serta format data yang didukung.

## 📖 Cara Penggunaan & Login

1. Buka browser dan akses **`http://localhost:3000`**
2. Login menggunakan akun Seed bawaan:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
3. Masuk ke halaman **Devices** di menu sebelah kiri.
4. Klik **"+ Connect Device"** dan beri nama perangkat Anda.
5. Modal QR Code akan muncul. Scan QR tersebut menggunakan aplikasi WhatsApp di HP Anda (Pilih _Tautkan Perangkat / Linked Devices_).
6. Setelah status berubah menjadi **Connected**, Anda sudah bisa menggunakan seluruh fitur (kirim pesan satuan & blast).

---

## 📝 Format CSV (Untuk Import Kontak massal)

Saat menggunakan fitur Import Kontak, file harus berupa format `.csv` dengan header (baris pertama) persis seperti berikut: `name, phone, email`.
Aturan nomor telepon: Harus menyertakan kode negara tanpa spasi atau plus (contoh: 62812...).

```csv
name,phone,email
Budi Santoso,628123456789,budi@example.com
Andi,628987654321,
```

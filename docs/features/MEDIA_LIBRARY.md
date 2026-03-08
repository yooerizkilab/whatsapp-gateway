# Media Library (Management & Hosting)

Fitur ini memungkinkan pengguna untuk mengunggah dan mengelola aset media (Gambar, Video, Dokumen) secara mandiri di dalam gateway. Aset ini kemudian dapat digunakan kembali dalam kampanye _Blast_ atau pengiriman pesan tunggal.

## Fitur Utama

- **Self-Hosting**: Menghindari ketergantungan pada hosting eksternal yang seringkali memiliki link yang kedaluwarsa.
- **Support Multi-Format**: Mendukung Gambar (JPG, PNG), Video (MP4), dan Dokumen (PDF, DOCX).
- **Media Selector**: Integrasi modal pencarian aset di halaman kirim pesan dan blast.
- **Copy Asset URL**: Memungkinkan pengambilan URL aset untuk keperluan integrasi API eksternal.

## Detail Teknis

### Penyimpanan File

- File disimpan secara lokal di direktori `backend/uploads/`.
- File dilayani secara publik melalui endpoint `/uploads/*` menggunakan `fastify-static`.

### Database Model (`Media`)

- `id`: Unique identifier.
- `name`: Nama asli file.
- `url`: URL publik untuk mengakses file.
- `type`: MIME type file.
- `size`: Ukuran file dalam bytes.

### Endpoint API (`/api/media`)

- `GET /`: Daftar semua aset milik user.
- `POST /upload`: Mengunggah file baru (Multipart).
- `DELETE /:id`: Menghapus aset dari database dan filesystem.

## Cara Penggunaan di UI

1. Buka menu **Media Library** di sidebar.
2. Unggah file menggunakan area _drag-and-drop_.
3. Di halaman **Send Message** atau **Blast**, pilih tipe pesan "Image" atau "Document".
4. Klik tombol **📁 Library** untuk membuka selector dan memilih aset yang sudah diunggah.

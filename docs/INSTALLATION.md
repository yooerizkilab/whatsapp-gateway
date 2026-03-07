# Instalasi WhatsApp Gateway

Ikuti langkah-langkah berikut untuk menginstal project ini di lingkungan lokal Anda.

## 📋 Prasyarat Sistem

Sebelum memulai instalasi, pastikan sistem Anda memiliki:

- Node.js (versi 20 atau lebih baru)
- MySQL / MariaDB (minimal versi 8.0)
- Git (jika ingin clone dari repositori)

---

## 🚀 Cara Instalasi (Jika Clone dari GitHub)

Ikuti langkah-langkah berikut jika Anda baru saja melakukan _clone_ project ini dari GitHub.

### 1. Clone Repositori

```bash
git clone <url-repositori-github>
cd whatsapp-gateway
```

### 2. Setup Database

Buat database baru di MySQL dengan nama `whatsapp_gateway` (atau nama lain sesuai keinginan Anda).

### 3. Instalasi Backend & Konfigurasi

```bash
cd backend

# Install semua dependensi
npm install

# Copass .env dan sesuaikan dengan database Anda
# (Pastikan MySQL sudah berjalan dan kredensialnya benar)
cp .env.example .env

# Jalankan migrasi database (Membuat tabel-tabel di MySQL)
npx prisma migrate dev --name init

# Generate Prisma Client (Wajib dijalankan setelah migrasi)
npx prisma generate

# Jalankan seeder (Untuk membuat akun Admin bawaan)
npm run prisma:seed
```

### 4. Instalasi Frontend & Konfigurasi

Buka terminal/tab baru dan masuk ke folder frontend.

```bash
cd frontend

# Install dependensi frontend
npm install

# Buat file env (untuk menyambungkan frontend ke backend)
cp .env.example .env.local
```

# Cara Menjalankan Aplikasi

Aplikasi ini menggunakan sistem Queue terpisah, sehingga harus ada **3 proses yang berjalan bersamaan**. Buka **3 CMD/Terminal** yang berbeda:

### **Terminal 1: Menjalankan Backend API Server**

```bash
cd backend
npm run dev
# Menjalankan server Fastify di http://localhost:3001
```

### **Terminal 2: Menjalankan Background Worker (Untuk Blast Job)**

```bash
cd backend
npm run worker
# Worker ini bertugas memproses antrean pengiriman pesan blast di latar belakang.
# Wajib dijalankan jika ingin fitur "Blast" berfungsi.
```

### **Terminal 3: Menjalankan Frontend (UI Dashboard)**

```bash
cd frontend
npm run dev
# Menjalankan UI Next.js di http://localhost:3000
```

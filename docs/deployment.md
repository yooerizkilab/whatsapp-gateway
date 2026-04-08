# Panduan Deployment (VPS & Docker)

Dokumen ini menjelaskan cara men-deploy aplikasi WhatsApp Gateway ke server VPS menggunakan Docker Compose dan otomatisasi GitHub Actions.

## 1. Persiapan Server (VPS)
Pastikan server Anda menggunakan OS Linux (disarankan Ubuntu 22.04 LTS) dan memiliki komponen berikut:

- **Docker**: [Panduan Instalasi](https://docs.docker.com/engine/install/ubuntu/)
- **Docker Compose**: Terintegrasi pada Docker versi terbaru.
- **Git**: Untuk manajemen kode sumber.

## 2. Langkah Deployment Awal (Manual)

Jalankan langkah-langkah ini saat pertama kali menyiapkan server:

1. **Clone Repositori**
   ```bash
   git clone <url-repository-anda>
   cd whatsapp-gateway
   ```

2. **Konfigurasi Environment**
   Salin dan sesuaikan file `.env` di folder `backend/` dan `frontend/`.
   > [!IMPORTANT]
   > Pastikan `DATABASE_URL` mengarah ke servis `db` di dalam network docker (contoh: `mysql://root:password@db:3306/whatsapp_gateway`).

3. **Jalankan Aplikasi**
   ```bash
   docker-compose up -d --build
   ```

## 3. Konfigurasi Domain & SSL (Nginx)

Untuk akses publik melalui domain, gunakan Nginx sebagai Reverse Proxy.

### Contoh Konfigurasi Nginx
Buat file di `/etc/nginx/sites-available/whatsapp-gateway`:

```nginx
server {
    server_name app.domainanda.com;

    location / {
        proxy_pass http://localhost:3000; # Frontend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /v1 {
        proxy_pass http://localhost:3001; # Backend API
    }

    location /ws {
        proxy_pass http://localhost:3001; # WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

### Aktivasi SSL (HTTPS)
Jalankan Certbot untuk keamanan:
```bash
sudo apt install python3-certbot-nginx
sudo certbot --nginx -d app.domainanda.com
```

## 4. Otomatisasi CI/CD (GitHub Actions)

Proyek ini sudah dilengkapi dengan `.github/workflows/cd.yml`. Agar otomatisasi berjalan:

1. Masuk ke **Settings > Secrets and variables > Actions** di repositori GitHub Anda.
2. Tambahkan variabel berikut:
   - `SERVER_HOST`: IP Address VPS.
   - `SERVER_USER`: Username SSH (contoh: `root`).
   - `SERVER_PASSWORD` atau `SERVER_SSH_KEY`: Kredensial akses.
3. Setiap kali Anda melakukan `push` ke branch `master`, server akan otomatis melakukan update kode dan restart service.

## 5. Pemeliharaan (Maintenance)

- **Cek Log**: `docker-compose logs -f backend`
- **Restart**: `docker-compose restart`
- **Monitoring**: Akses Grafana di port `3002` untuk melihat performa sistem secara real-time.

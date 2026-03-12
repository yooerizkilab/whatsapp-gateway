import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">W</span>
            </div>
            Whatsappin
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/api" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              API Reference
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-[280px_1fr] gap-12">
        {/* Sidebar Nav */}
        <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Mulai Cepat</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><a href="#prerequisites" className="hover:text-brand-400 transition-colors">Prasyarat</a></li>
              <li><a href="#installation" className="hover:text-brand-400 transition-colors">Instalasi</a></li>
              <li><a href="#running" className="hover:text-brand-400 transition-colors">Menjalankan Aplikasi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Integrasi API</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><a href="#authentication" className="hover:text-brand-400 transition-colors">Autentikasi API Key</a></li>
              <li><a href="#code-example" className="hover:text-brand-400 transition-colors">Contoh Implementasi</a></li>
              <li><a href="#limits" className="hover:text-brand-400 transition-colors">Limitasi & Keamanan</a></li>
            </ul>
          </div>
          <div className="pt-4 border-t border-white/5">
            <Link href="/api" className="text-sm font-bold text-brand-400 hover:text-brand-300">
              Lihat API Reference →
            </Link>
          </div>
        </aside>

        {/* Content */}
        <main className="max-w-4xl space-y-20">
          <section className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight">Development Guide</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Selamat datang di panduan pengembangan Whatsappin. Halaman ini mencakup instruksi teknis untuk setup lokal dan integrasi sistem.
            </p>
          </section>

          {/* Setup / Installation */}
          <section id="prerequisites" className="space-y-6 pt-10 border-t border-white/5">
            <h2 className="text-3xl font-bold">📋 Prasyarat</h2>
            <p className="text-gray-400">Pastikan lingkungan pengembangan Anda memiliki komponen berikut:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-sm font-medium">Node.js v20.x+</span>
                </li>
                <li className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-sm font-medium">MySQL v8.0+</span>
                </li>
                <li className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="text-sm font-medium">Redis (Optional for Blast)</span>
                </li>
            </ul>
          </section>

          <section id="installation" className="space-y-6">
            <h2 className="text-3xl font-bold">🛠️ Instalasi</h2>
            <div className="space-y-4">
                <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">1. Clone & Install</p>
                <div className="bg-black border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-300">
                    <div>git clone https://github.com/your/repo.git</div>
                    <div className="text-gray-600"># Masuk ke folder backend & frontend lalu jalankan:</div>
                    <div>npm install</div>
                </div>
            </div>
            <div className="space-y-4">
                <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">2. Database Migration</p>
                <div className="bg-black border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-300">
                    <div className="text-gray-600"># Di folder backend:</div>
                    <div>npx prisma migrate dev --name init</div>
                    <div>npm run prisma:seed</div>
                </div>
            </div>
          </section>

          {/* Integration Guide */}
          <section id="authentication" className="space-y-6 pt-10 border-t border-white/5">
            <h2 className="text-3xl font-bold">🔑 Autentikasi API Key</h2>
            <p className="text-gray-400 leading-relaxed">
                Untuk integrasi server-ke-server, kami merekomendasikan penggunaan <strong>API Key</strong>. 
                Anda dapat membuat key ini di halaman dashboard akun Anda.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
                <h4 className="font-bold">Cara Menggunakan:</h4>
                <p className="text-sm text-gray-400">Masukkan key Anda di header HTTP setiap permintaan:</p>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-brand-400">
                    x-api-key: your_secret_key_here
                </div>
            </div>
          </section>

          <section id="code-example" className="space-y-6">
            <h2 className="text-3xl font-bold">💻 Contoh Implementasi (Node.js)</h2>
            <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden">
                <div className="bg-white/5 px-6 py-3 flex justify-between items-center text-xs font-bold text-gray-400">
                    <span>AXIOS EXAMPLE</span>
                    <span className="text-emerald-500">JAVASCRIPT</span>
                </div>
                <pre className="p-8 text-sm leading-relaxed text-gray-300 overflow-x-auto">
{`const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.whatsappin.com/v1",
  headers: { "x-api-key": "your_api_key_here" }
});

async function sendWelcomeMessage() {
  try {
    const res = await api.post("/messages/send", {
      deviceId: "device-uuid-...",
      to: "628123456789",
      content: "Halo! Selamat bergabung di Whatsappin."
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Failed:", err.response.data);
  }
}

sendWelcomeMessage();`}
                </pre>
            </div>
          </section>

          <section id="limits" className="space-y-6 pt-10 border-t border-white/5">
            <h2 className="text-3xl font-bold text-red-400">⚠️ Batasan & Keamanan</h2>
            <p className="text-gray-400 leading-relaxed">
                Penting untuk mematuhui pedoman penggunaan agar akun WhatsApp Anda tetap aman dari blokir:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-bold mb-2">Rate Limiting</h4>
                    <p className="text-sm text-gray-500">Batas default adalah 100 request/menit per API Key.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-bold mb-2">Message Delay</h4>
                    <p className="text-sm text-gray-500">Gunakan jeda minimal 3-5 detik antar pesan manual.</p>
                </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="py-12 border-t border-white/5 bg-black/50 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Whatsappin. All rights reserved.
      </footer>
    </div>
  );
}

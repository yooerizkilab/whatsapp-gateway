import Link from 'next/link';

export default function ApiReferencePage() {
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
            <Link href="/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Development Guide
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-brand-400 transition-colors">
              Login
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

      <div className="container mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-[250px_1fr] gap-12">
        {/* Sidebar Nav */}
        <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Introduction</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><a href="#getting-started" className="hover:text-brand-400 transition-colors">Getting Started</a></li>
              <li><a href="#authentication" className="hover:text-brand-400 transition-colors">Authentication</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><a href="#devices" className="hover:text-brand-400 transition-colors">Devices</a></li>
              <li><a href="#messages" className="hover:text-brand-400 transition-colors">Messages</a></li>
              <li><a href="#auto-responder" className="hover:text-brand-400 transition-colors">Auto Responder</a></li>
              <li><a href="#webhooks" className="hover:text-brand-400 transition-colors">Webhooks</a></li>
            </ul>
          </div>
        </aside>

        {/* Content */}
        <main className="max-w-4xl space-y-16">
          <section id="getting-started" className="space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight">API Reference</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Whatsappin menyediakan REST API yang kuat dan mudah digunakan untuk mengintegrasikan layanan WhatsApp ke dalam aplikasi Anda.
            </p>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
              <strong>Base URL:</strong> <code className="bg-black/30 px-2 py-1 rounded">https://api.yourdomain.com/v1</code>
            </div>
          </section>

          <section id="authentication" className="space-y-6 pt-8 border-t border-white/5">
            <h2 className="text-3xl font-bold">Authentication</h2>
            <p className="text-gray-400">
              Gunakan JWT Token di header Authorization atau gunakan Header X-API-KEY untuk akses terprogram.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-white/5 px-6 py-3 text-xs font-bold text-gray-400 border-b border-white/10">HEADER EXAMPLE</div>
              <pre className="p-6 text-sm text-brand-400 overflow-x-auto">
                <code>Authorization: Bearer YOUR_JWT_TOKEN{"\n"}x-api-key: YOUR_API_KEY</code>
              </pre>
            </div>
          </section>

          <section id="messages" className="space-y-6 pt-8 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">POST</span>
              <h2 className="text-3xl font-bold">Send Message</h2>
            </div>
            <p className="text-gray-400">Kirim pesan teks ke nomor tujuan tertentu.</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex border-b border-white/10">
                    <div className="px-6 py-3 text-xs font-bold text-brand-400 border-b-2 border-brand-400 bg-white/5">REQUEST</div>
                </div>
                <pre className="p-6 text-sm text-gray-300 overflow-x-auto bg-[#050505]">
{`{
  "deviceId": "uuid-device-123",
  "to": "628123456789",
  "content": "Halo dari API Whatsappin!"
}`}
                </pre>
            </div>
          </section>

          <section id="webhooks" className="space-y-6 pt-8 border-t border-white/5">
            <h2 className="text-3xl font-bold">Webhooks</h2>
            <p className="text-gray-400">
              Terima notifikasi real-time untuk pesan masuk dan status pengiriman langsung ke server Anda.
            </p>
            <Link 
              href="/docs" 
              className="inline-flex items-center text-brand-400 hover:text-brand-300 font-bold transition-colors"
            >
              Baca selengkapnya di dokumentasi →
            </Link>
          </section>
        </main>
      </div>

      <footer className="py-12 border-t border-white/5 bg-black/50 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Whatsappin. All rights reserved.
      </footer>
    </div>
  );
}

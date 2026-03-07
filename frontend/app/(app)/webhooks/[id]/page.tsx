'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { webhookAPI } from '@/services/api';

interface Device {
  id: string;
  name: string;
  phoneNumber: string | null;
}

interface Webhook {
  id: string;
  deviceId: string;
  url: string;
  secret: string | null;
  isActive: boolean;
  device: Device;
}

export default function WebhookDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [webhook, setWebhook] = useState<Webhook | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Form Edit
  const [url, setUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [isActive, setIsActive] = useState(true);

  const load = async () => {
    try {
      const res = await webhookAPI.getById(id);
      const data = res.data.data;
      setWebhook(data);
      setUrl(data.url || '');
      setSecret(data.secret || '');
      setIsActive(data.isActive);
    } catch {
      setError('Failed to load webhook detail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleSave = async () => {
    if (!url.trim()) {
      setError('Target URL is required');
      return;
    }
    
    setSaving(true);
    try {
      await webhookAPI.update(id, {
        url,
        secret: secret || undefined,
        isActive
      });
      router.push('/webhooks');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update webhook');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-gray-900 border border-gray-800 rounded-xl animate-pulse">
        <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-800 rounded w-full"></div>
          <div className="h-10 bg-gray-800 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!webhook) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="text-4xl mb-4">🔗</div>
        <h2 className="text-xl font-bold text-white mb-2">Webhook Not Found</h2>
        <p className="text-gray-400 mb-6">Webhook yang Anda cari tidak ada atau sudah dihapus.</p>
        <Link href="/webhooks" className="btn-secondary">Kembali</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/webhooks" className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          ←
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Webhook</h1>
          <p className="text-sm text-gray-400 mt-1">
            Device: <span className="text-white font-medium">{webhook.device.name} {webhook.device.phoneNumber ? `(${webhook.device.phoneNumber})` : ''}</span>
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-900/40 border border-red-700 text-red-300">
          {error}
        </div>
      )}

      {/* Main Settings Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Konfigurasi Endpoint</h2>
            <p className="text-sm text-gray-400 mt-1">Ubah URL atau secret untuk event webhook</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 text-right">
              {isActive ? 'Active' : 'Disabled'}
            </span>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isActive ? 'bg-green-500' : 'bg-gray-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Target URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target URL Endpoint *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input w-full font-mono text-sm"
              placeholder="https://api.yourdomain.com/webhook/whatsapp"
            />
            <p className="text-xs text-gray-500 mt-2">Pola payload POST berupa `{"{"} event: "messages.upsert", device: "id", message: {"{"} from, text {"}"} {"}"}`</p>
          </div>

          {/* Secret Key */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="input w-full font-mono text-sm"
              placeholder="Kosongkan jika tidak ada"
            />
            <p className="text-xs text-gray-500 mt-2">
              Jika diisi, payload akan dilampiri header HTTP <code>X-Hub-Signature-256</code> dengan nilai HMAC SHA-256 hash dari secret.
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-gray-800/20 border-t border-gray-800 flex items-center justify-end gap-3">
          <Link href="/webhooks" className="btn-secondary">
            Batal
          </Link>
          <button 
            onClick={handleSave} 
            disabled={saving || !url} 
            className="btn-primary"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}

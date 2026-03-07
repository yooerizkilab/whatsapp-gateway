'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { webhookAPI, deviceAPI } from '@/services/api';

interface Device {
  id: string;
  name: string;
  phoneNumber: string | null;
  status: string;
}

interface Webhook {
  id: string;
  deviceId: string;
  url: string;
  secret: string | null;
  isActive: boolean;
  createdAt: string;
  device: Device;
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ deviceId: '', url: '', secret: '' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const [whRes, devRes] = await Promise.all([
        webhookAPI.list(),
        deviceAPI.list(),
      ]);
      setWebhooks(whRes.data.data);
      setDevices(devRes.data.data);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!form.deviceId || !form.url.trim()) {
      setError('Device and URL are required');
      return;
    }
    setCreating(true);
    try {
      await webhookAPI.create({ 
        deviceId: form.deviceId, 
        url: form.url, 
        secret: form.secret || undefined 
      });
      setShowCreate(false);
      setForm({ deviceId: '', url: '', secret: '' });
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create webhook');
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (wh: Webhook) => {
    try {
      await webhookAPI.update(wh.id, { isActive: !wh.isActive });
      load();
    } catch {
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this webhook?')) return;
    try {
      await webhookAPI.delete(id);
      load();
    } catch {
      setError('Failed to delete');
    }
  };

  // Devices without an active webhook already
  const availableDevices = devices.filter(
    (d) => !webhooks.some((wh) => wh.deviceId === d.id)
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">🔗 Webhooks</h1>
          <p className="text-sm text-gray-400 mt-1">
            Teruskan pesan WhatsApp yang masuk ke Endpoint URL / API milik Anda
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary"
          disabled={availableDevices.length === 0}
          title={availableDevices.length === 0 ? "All devices already have webhooks." : ""}
        >
          + Buat Webhook
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-900/40 border border-red-700 text-red-300 text-sm">
          {error}
          <button className="ml-3 text-red-400 underline" onClick={() => setError('')}>Tutup</button>
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4">Buat Webhook</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Device</label>
                <select
                  value={form.deviceId}
                  onChange={(e) => setForm({ ...form, deviceId: e.target.value })}
                  className="input w-full"
                >
                  <option value="">-- Pilih Device --</option>
                  {availableDevices.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} {d.phoneNumber ? `(${d.phoneNumber})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Target URL</label>
                <input
                  type="url"
                  placeholder="https://api.domain.com/webhook"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Secret Key (Opsional)</label>
                <input
                  type="text"
                  placeholder="Secret untuk HMAC SHA-256 validation"
                  value={form.secret}
                  onChange={(e) => setForm({ ...form, secret: e.target.value })}
                  className="input w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Digunakan untuk validasi header X-Hub-Signature-256</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                disabled={creating}
                onClick={() => setShowCreate(false)}
                className="btn-secondary"
              >
                Batal
              </button>
              <button
                disabled={creating || !form.deviceId || !form.url}
                onClick={handleCreate}
                className="btn-primary"
              >
                {creating ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 animate-pulse">Loading webhooks...</div>
        ) : webhooks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-3">🔗</div>
            Belum ada webhook yang dikonfigurasi.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800/50 text-gray-400 text-sm border-b border-gray-800">
                <th className="p-4 font-medium">Device & URL</th>
                <th className="p-4 font-medium">Status & Secret</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {webhooks.map((wh) => (
                <tr key={wh.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center text-lg">
                        📱
                      </div>
                      <div>
                        <div className="font-medium text-white">{wh.device.name}</div>
                        <div className="text-sm text-gray-400 truncate max-w-[250px]" title={wh.url}>
                          {wh.url}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => handleToggle(wh)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            wh.isActive ? 'bg-green-500' : 'bg-gray-700'
                        }`}
                        >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            wh.isActive ? 'translate-x-4' : 'translate-x-0'
                            }`}
                        />
                      </button>
                      <span className="text-sm text-gray-300">
                        {wh.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    {wh.secret ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-purple-900/30 text-purple-400 border border-purple-800/50">
                        🔒 Secured
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-500">
                        No Secret
                      </span>
                    )}
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link
                          href={`/webhooks/${wh.id}`}
                          className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                          title="Edit Webhook"
                        >
                          ✏️ Edit
                        </Link>
                      <button
                        onClick={() => handleDelete(wh.id)}
                        className="p-2 text-red-400 hover:text-white bg-red-900/20 hover:bg-red-600 rounded transition-colors"
                        title="Hapus"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

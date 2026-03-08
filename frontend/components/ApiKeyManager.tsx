'use client';

import { useState, useEffect } from 'react';
import { apiKeyAPI } from '@/services/api';
import toast from 'react-hot-toast';

interface ApiKey {
    id: string;
    key: string;
    name: string;
    createdAt: string;
}

export default function ApiKeyManager() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [creating, setCreating] = useState(false);
    const [newKey, setNewKey] = useState<string | null>(null);

    const loadKeys = async () => {
        try {
            const res = await apiKeyAPI.list();
            setApiKeys(res.data.data);
        } catch (err) {
            toast.error('Failed to load API keys');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadKeys();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return toast.error('Enter a name for the key');
        
        setCreating(true);
        try {
            const res = await apiKeyAPI.create(name.trim());
            setNewKey(res.data.data.key);
            setName('');
            loadKeys();
            toast.success('API Key generated successfully');
        } catch (err) {
            toast.error('Failed to generate API key');
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this API Key? Any integration using it will stop working.')) return;
        
        try {
            await apiKeyAPI.delete(id);
            toast.success('API Key deleted');
            loadKeys();
        } catch (err) {
            toast.error('Failed to delete API key');
        }
    };

    return (
        <div className="space-y-6">
            <div className="card">
                <h2 className="section-title mb-4">Generate API Key</h2>
                <p className="text-sm text-gray-400 mb-4">
                    Use API keys to authenticate with our REST API without needing a user session. 
                    Keep your keys secure and never share them.
                </p>
                
                <form onSubmit={handleCreate} className="flex gap-3">
                    <input 
                        className="input"
                        placeholder="Key Name (e.g. Production Server)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={creating}
                    />
                    <button className="btn-primary" type="submit" disabled={creating}>
                        {creating ? 'Generating...' : 'Generate Key'}
                    </button>
                </form>

                {newKey && (
                    <div className="mt-4 p-4 bg-brand-950/20 border border-brand-800 rounded-xl">
                        <p className="text-xs font-bold text-brand-400 uppercase mb-2">New API Key Generated:</p>
                        <div className="flex gap-2 items-center">
                            <code className="flex-1 bg-black/40 p-2 rounded text-brand-500 font-mono text-sm break-all">
                                {newKey}
                            </code>
                            <button 
                                onClick={() => { navigator.clipboard.writeText(newKey); toast.success('Copied to clipboard'); }}
                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400"
                                title="Copy to clipboard"
                            >
                                📋
                            </button>
                        </div>
                        <p className="text-[10px] text-brand-600 mt-2">
                            ⚠️ Copy this key now! This is the only time you will see it.
                        </p>
                        <button 
                            onClick={() => setNewKey(null)}
                            className="mt-2 text-xs text-gray-400 hover:text-white underline"
                        >
                            Done, I've saved it
                        </button>
                    </div>
                )}
            </div>

            <div className="card">
                <h2 className="section-title mb-4">Your API Keys</h2>
                {loading ? (
                    <p className="text-gray-500 text-sm">Loading keys...</p>
                ) : apiKeys.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">You don't have any API keys yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-gray-800">
                                <tr>
                                    <th className="px-2 py-3">Name</th>
                                    <th className="px-2 py-3">Key</th>
                                    <th className="px-2 py-3">Created At</th>
                                    <th className="px-2 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {apiKeys.map((key) => (
                                    <tr key={key.id} className="text-sm">
                                        <td className="px-2 py-4 text-white font-medium">{key.name}</td>
                                        <td className="px-2 py-4 font-mono text-xs text-gray-400">{key.key}</td>
                                        <td className="px-2 py-4 text-gray-500">
                                            {new Date(key.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-2 py-4 text-right">
                                            <button 
                                                onClick={() => handleDelete(key.id)}
                                                className="text-red-500 hover:text-red-400 text-xs font-bold uppercase transition-colors"
                                            >
                                                Revoke
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { mediaAPI } from '@/services/api';

interface MediaSelectorProps {
    onSelect: (url: string) => void;
    onClose: () => void;
}

export default function MediaSelector({ onSelect, onClose }: MediaSelectorProps) {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const res = await mediaAPI.list();
            setMedia(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = media.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'image') return item.type.startsWith('image/');
        if (filter === 'video') return item.type.startsWith('video/');
        if (filter === 'docs') return !item.type.startsWith('image/') && !item.type.startsWith('video/');
        return true;
    });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Select Media</h2>
                        <p className="text-xs text-gray-500">Pick an asset from your library</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">✕</button>
                </div>

                <div className="p-4 border-b border-gray-800 flex gap-2 overflow-x-auto">
                    {['all', 'image', 'video', 'docs'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                                filter === f ? 'bg-brand-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-48 italic text-gray-500">Loading library...</div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                            <span className="text-4xl mb-4 opacity-20">🔍</span>
                            <p>No matching files found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {filtered.map(item => (
                                <div 
                                    key={item.id} 
                                    onClick={() => onSelect(item.url)}
                                    className="group cursor-pointer bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-500 transition-all hover:scale-[1.02]"
                                >
                                    <div className="aspect-square bg-black flex items-center justify-center">
                                        {item.type.startsWith('image/') ? (
                                            <img src={item.url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl">{item.type.startsWith('video/') ? '🎬' : '📄'}</span>
                                        )}
                                    </div>
                                    <div className="p-2 bg-gray-900">
                                        <p className="text-[10px] text-white truncate font-medium" title={item.name}>{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="p-6 border-t border-gray-800 bg-gray-950 flex justify-end">
                    <button onClick={onClose} className="btn-secondary !py-2">Close</button>
                </div>
            </div>
        </div>
    );
}

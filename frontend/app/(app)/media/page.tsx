'use client';

import { useState, useEffect, useCallback } from 'react';
import { mediaAPI } from '@/services/api';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export default function MediaLibraryPage() {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const res = await mediaAPI.list();
            setMedia(res.data.data);
        } catch (err) {
            toast.error('Failed to load media');
        } finally {
            setLoading(false);
        }
    };

    const onDrop = useCallback(async (files: File[]) => {
        const file = files[0];
        if (!file) return;
        setUploading(true);
        try {
            await mediaAPI.upload(file);
            toast.success('Upload success');
            load();
        } catch (err) {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/*': [],
            'video/*': [],
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
        }
    });

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;
        try {
            await mediaAPI.delete(id);
            toast.success('Deleted successfully');
            load();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const formatSize = (bytes: number) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title">Media Library</h1>
                    <p className="text-gray-400 mt-1">Host and manage your assets for messaging</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div className="card">
                        <h2 className="section-title mb-4">Quick Upload</h2>
                        <div 
                            {...getRootProps()} 
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                                isDragActive ? 'border-brand-400 bg-brand-900/20' : 'border-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <input {...getInputProps()} />
                            <div className="text-4xl mb-2">📁</div>
                            <p className="text-sm text-gray-400">
                                {uploading ? 'Uploading...' : isDragActive ? 'Drop file here' : 'Drop or click to upload'}
                            </p>
                            <p className="text-[10px] text-gray-600 mt-2">Max 16MB (Images, Video, PDF)</p>
                        </div>
                    </div>

                    <div className="card bg-brand-900/10 border-brand-900/20">
                        <h3 className="text-sm font-bold text-brand-400 mb-2">💡 Deployment Tip</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Hosting your media directly on your gateway ensures that recipients see your images/videos immediately without external broken links.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="card min-h-[500px]">
                        <h2 className="section-title mb-6">Your Files</h2>

                        {loading ? (
                            <div className="flex items-center justify-center h-48">
                                <span className="text-gray-500 italic">Finding your assets...</span>
                            </div>
                        ) : media.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-center">
                                <div className="text-5xl mb-4 opacity-20">📭</div>
                                <p className="text-gray-500">Your library is empty. Upload some assets!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {media.map((item) => (
                                    <div key={item.id} className="group relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-all hover:border-gray-600">
                                        <div className="aspect-square bg-black flex items-center justify-center overflow-hidden">
                                            {item.type.startsWith('image/') ? (
                                                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : item.type.startsWith('video/') ? (
                                                <div className="text-4xl">🎬</div>
                                            ) : (
                                                <div className="text-4xl">📄</div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-medium text-white truncate mb-1" title={item.name}>{item.name}</p>
                                            <p className="text-[10px] text-gray-500 uppercase">{formatSize(item.size)} • {item.type.split('/')[1]}</p>
                                        </div>
                                        
                                        <div className="absolute inset-x-0 bottom-0 p-2 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-between gap-2">
                                            <button 
                                                onClick={() => {
                                                    navigator.clipboard.writeText(item.url);
                                                    toast.success('URL copied');
                                                }}
                                                className="flex-1 py-1 text-[10px] bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
                                            >
                                                Copy URL
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-1 px-2 text-[10px] bg-red-900/30 hover:bg-red-900/50 text-red-500 rounded transition-colors"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

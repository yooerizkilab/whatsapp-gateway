import { prisma } from '../config/prisma';
import { Webhook } from '@prisma/client';

export const webhookRepository = {
    // Cari semua webhook milik user tertentu
    async findAllByUserId(userId: string) {
        return prisma.webhook.findMany({
            where: { userId },
            include: { device: { select: { id: true, name: true, phoneNumber: true } } },
            orderBy: { createdAt: 'desc' }
        });
    },

    async findById(id: string) {
        return prisma.webhook.findUnique({
            where: { id },
            include: { device: true }
        });
    },

    // Cari webhook aktif berdasarkan ID perangkat
    async findActiveByDeviceId(deviceId: string) {
        return prisma.webhook.findFirst({
            where: { deviceId, isActive: true },
        });
    },

    async create(data: { userId: string; deviceId: string; url: string; secret?: string; isActive?: boolean }) {
        return prisma.webhook.create({ data });
    },

    async update(id: string, data: Partial<{ url: string; secret: string; isActive: boolean }>) {
        return prisma.webhook.update({
            where: { id },
            data
        });
    },

    async delete(id: string) {
        return prisma.webhook.delete({
            where: { id }
        });
    }
};

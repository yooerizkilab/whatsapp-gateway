import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../config/prisma';
import { cryptoUtils } from '../utils/crypto';

export const apiKeyController = {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request.user as any).id;

        const apiKeys = await prisma.apiKey.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                key: true,
                name: true,
                createdAt: true,
            }
        });

        // Masking the key for security, only showing last 4 chars
        const maskedKeys = apiKeys.map(k => ({
            ...k,
            key: `****${k.key.slice(-4)}`
        }));

        return reply.send({ data: maskedKeys });
    },

    async create(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request.user as any).id;
        const { name } = request.body as { name: string };

        if (!name) {
            return reply.status(400).send({ message: 'Name is required' });
        }

        // Generate a random key
        const key = `ak_${cryptoUtils.generateRandomString(32)}`;

        const apiKey = await prisma.apiKey.create({
            data: {
                userId,
                name,
                key,
            }
        });

        return reply.status(201).send({
            message: 'API Key created successfully. Please copy it now as it won\'t be shown again.',
            data: apiKey
        });
    },

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request.user as any).id;
        const { id } = request.params as { id: string };

        const apiKey = await prisma.apiKey.findFirst({
            where: { id, userId }
        });

        if (!apiKey) {
            return reply.status(404).send({ message: 'API Key not found' });
        }

        await prisma.apiKey.delete({
            where: { id }
        });

        return reply.send({ message: 'API Key deleted successfully' });
    }
};

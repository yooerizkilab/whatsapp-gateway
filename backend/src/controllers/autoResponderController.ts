import { FastifyRequest, FastifyReply } from 'fastify';
import { autoResponderRepository } from '../repositories/autoResponderRepository';

export const autoResponderController = {
    // ── List all for current user ────────────────────────────
    async list(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const data = await autoResponderRepository.findByUserId(user.id);
        return reply.send({ success: true, data });
    },

    // ── Get one by id ────────────────────────────────────────
    async getById(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const { id } = request.params as { id: string };
        const data = await autoResponderRepository.findById(id, user.id);
        if (!data) return reply.status(404).send({ success: false, message: 'Auto-responder not found' });
        return reply.send({ success: true, data });
    },

    // ── Create ───────────────────────────────────────────────
    async create(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const { deviceId, name, isActive, aiProvider, aiModel, systemPrompt } = request.body as {
            deviceId: string;
            name: string;
            isActive?: boolean;
            aiProvider?: string;
            aiModel?: string;
            systemPrompt?: string;
        };

        // Only one auto-responder per device
        const existing = await autoResponderRepository.findActiveByDeviceId(deviceId);
        if (existing && existing.userId !== user.id) {
            return reply.status(409).send({ success: false, message: 'Another user already has an auto-responder for this device' });
        }

        const data = await autoResponderRepository.create({
            userId: user.id,
            deviceId,
            name,
            isActive: isActive ?? true,
            aiProvider: aiProvider || null,
            aiModel: aiModel || null,
            systemPrompt: systemPrompt || null,
        });
        return reply.status(201).send({ success: true, data });
    },

    // ── Update ───────────────────────────────────────────────
    async update(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const { id } = request.params as { id: string };
        const body = request.body as Partial<{
            name: string;
            isActive: boolean;
            aiProvider: string | null;
            aiModel: string | null;
            systemPrompt: string | null;
        }>;

        const result = await autoResponderRepository.update(id, user.id, body);
        if (result.count === 0) return reply.status(404).send({ success: false, message: 'Auto-responder not found' });
        const updated = await autoResponderRepository.findById(id, user.id);
        return reply.send({ success: true, data: updated });
    },

    // ── Delete ───────────────────────────────────────────────
    async delete(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const { id } = request.params as { id: string };
        const result = await autoResponderRepository.delete(id, user.id);
        if (result.count === 0) return reply.status(404).send({ success: false, message: 'Auto-responder not found' });
        return reply.send({ success: true, message: 'Auto-responder deleted' });
    },

    // ── Rules ────────────────────────────────────────────────
    async createRule(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const { id } = request.params as { id: string };

        // Verify ownership
        const ar = await autoResponderRepository.findById(id, user.id);
        if (!ar) return reply.status(404).send({ success: false, message: 'Auto-responder not found' });

        const { keywords, matchType, response, order, isActive } = request.body as {
            keywords: string;
            matchType?: string;
            response: string;
            order?: number;
            isActive?: boolean;
        };

        const data = await autoResponderRepository.createRule({
            autoResponderId: id,
            keywords,
            matchType: matchType || 'CONTAINS',
            response,
            order: order ?? 0,
            isActive: isActive ?? true,
        });
        return reply.status(201).send({ success: true, data });
    },

    async updateRule(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const { id, ruleId } = request.params as { id: string; ruleId: string };

        const ar = await autoResponderRepository.findById(id, user.id);
        if (!ar) return reply.status(404).send({ success: false, message: 'Auto-responder not found' });

        const body = request.body as Partial<{
            keywords: string;
            matchType: string;
            response: string;
            order: number;
            isActive: boolean;
        }>;

        const result = await autoResponderRepository.updateRule(ruleId, id, body);
        if (result.count === 0) return reply.status(404).send({ success: false, message: 'Rule not found' });

        const rule = await autoResponderRepository.findRuleById(ruleId, id);
        return reply.send({ success: true, data: rule });
    },

    async deleteRule(request: FastifyRequest, reply: FastifyReply) {
        const user = (request as any).user;
        const { id, ruleId } = request.params as { id: string; ruleId: string };

        const ar = await autoResponderRepository.findById(id, user.id);
        if (!ar) return reply.status(404).send({ success: false, message: 'Auto-responder not found' });

        const result = await autoResponderRepository.deleteRule(ruleId, id);
        if (result.count === 0) return reply.status(404).send({ success: false, message: 'Rule not found' });
        return reply.send({ success: true, message: 'Rule deleted' });
    },
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../config/prisma';

export const planController = {
    async getPlans(request: FastifyRequest, reply: FastifyReply) {
        const plans = await prisma.subscriptionPlan.findMany({
            orderBy: { price: 'asc' }
        });
        return reply.send({ success: true, data: plans });
    },

    async createPlan(request: FastifyRequest, reply: FastifyReply) {
        const { name, price, maxDevices, maxMessagesPerMonth, features } = request.body as any;
        const plan = await prisma.subscriptionPlan.create({
            data: {
                name,
                price: parseInt(price),
                maxDevices: parseInt(maxDevices),
                maxMessagesPerMonth: parseInt(maxMessagesPerMonth),
                features: features || {}
            }
        });
        return reply.status(201).send({ success: true, data: plan });
    },

    async updatePlan(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const data = request.body as any;

        // Sanitize numeric fields
        if (data.price !== undefined) data.price = parseInt(data.price);
        if (data.maxDevices !== undefined) data.maxDevices = parseInt(data.maxDevices);
        if (data.maxMessagesPerMonth !== undefined) data.maxMessagesPerMonth = parseInt(data.maxMessagesPerMonth);

        const plan = await prisma.subscriptionPlan.update({
            where: { id },
            data
        });
        return reply.send({ success: true, data: plan });
    },

    async deletePlan(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await prisma.subscriptionPlan.delete({ where: { id } });
        return reply.send({ success: true, message: 'Plan deleted' });
    }
};

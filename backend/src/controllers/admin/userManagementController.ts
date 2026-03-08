import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../config/prisma';

export const userManagementController = {
    async listUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                subscriptionStatus: true,
                subscriptionEndDate: true,
                messagesSentThisMonth: true,
                subscriptionPlan: {
                    select: { name: true }
                },
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return reply.send({ success: true, data: users });
    },

    async updateUserSubscription(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const {
            subscriptionPlanId,
            subscriptionStatus,
            subscriptionEndDate,
            messagesSentThisMonth
        } = request.body as any;

        const updateData: any = {};
        if (subscriptionPlanId !== undefined) updateData.subscriptionPlanId = subscriptionPlanId;
        if (subscriptionStatus !== undefined) updateData.subscriptionStatus = subscriptionStatus;
        if (subscriptionEndDate !== undefined) updateData.subscriptionEndDate = new Date(subscriptionEndDate);
        if (messagesSentThisMonth !== undefined) updateData.messagesSentThisMonth = parseInt(messagesSentThisMonth);

        const user = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return reply.send({ success: true, data: user, message: 'User subscription updated' });
    }
};

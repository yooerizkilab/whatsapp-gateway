import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { planController } from '../controllers/admin/planController';
import { userManagementController } from '../controllers/admin/userManagementController';
import { isAdmin } from '../middlewares/auth';

export async function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // All routes in this plugin require JWT + Admin Role
    fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
            await isAdmin(request, reply);
        } catch (err: any) {
            reply.status(err.statusCode || 401).send(err);
        }
    });

    // Subscriptions Plans
    fastify.get('/plans', planController.getPlans);
    fastify.post('/plans', planController.createPlan);
    fastify.put('/plans/:id', planController.updatePlan);
    fastify.delete('/plans/:id', planController.deletePlan);

    // User Management
    fastify.get('/users', userManagementController.listUsers);
    fastify.put('/users/:id/subscription', userManagementController.updateUserSubscription);
}

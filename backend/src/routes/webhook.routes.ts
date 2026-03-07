import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { webhookController } from '../controllers/webhookController';

export default async function webhookRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Terapkan middleware otentikasi JWT pada semua rute webhook
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });

    // Rute CRUD
    fastify.get('/', webhookController.list);
    fastify.post('/', webhookController.create);
    fastify.put('/:id', webhookController.update);
    fastify.delete('/:id', webhookController.delete);
}

import { FastifyInstance } from 'fastify';
import { apiKeyController } from '../controllers/apiKeyController';
import { authenticate } from '../middlewares/auth';

export async function apiKeyRoutes(fastify: FastifyInstance) {
    fastify.addHook('preHandler', authenticate);

    fastify.get('/', apiKeyController.list);
    fastify.post('/', apiKeyController.create);
    fastify.delete('/:id', apiKeyController.delete);
}

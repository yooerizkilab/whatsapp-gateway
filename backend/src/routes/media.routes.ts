import { FastifyInstance } from 'fastify';
import { mediaController } from '../controllers/mediaController';
import { authenticate } from '../middlewares/auth';

export async function mediaRoutes(fastify: FastifyInstance) {
    fastify.addHook('preHandler', authenticate);

    fastify.get('/', mediaController.list);
    fastify.post('/upload', mediaController.upload);
    fastify.delete('/:id', mediaController.delete);
}

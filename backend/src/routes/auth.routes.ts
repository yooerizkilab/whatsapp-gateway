import { FastifyInstance } from 'fastify';
import { authController } from '../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', authController.login);
    fastify.post('/register', authController.register);
    fastify.get('/me', { preHandler: [fastify.authenticate] }, authController.me);
}

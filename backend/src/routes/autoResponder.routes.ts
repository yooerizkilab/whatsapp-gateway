import { FastifyInstance } from 'fastify';
import { autoResponderController } from '../controllers/autoResponderController';

export async function autoResponderRoutes(fastify: FastifyInstance) {
    // All routes require authentication
    fastify.addHook('onRequest', (fastify as any).authenticate);

    // AutoResponder CRUD
    fastify.get('/', autoResponderController.list);
    fastify.post('/', autoResponderController.create);
    fastify.get('/:id', autoResponderController.getById);
    fastify.put('/:id', autoResponderController.update);
    fastify.delete('/:id', autoResponderController.delete);

    // Rules CRUD
    fastify.post('/:id/rules', autoResponderController.createRule);
    fastify.put('/:id/rules/:ruleId', autoResponderController.updateRule);
    fastify.delete('/:id/rules/:ruleId', autoResponderController.deleteRule);
}

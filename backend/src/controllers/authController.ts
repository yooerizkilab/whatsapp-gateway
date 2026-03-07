import { FastifyRequest, FastifyReply } from 'fastify';
import { comparePassword } from '../utils/hash';
import { userRepository } from '../repositories/userRepository';

export const authController = {
    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string; password: string };

        const user = await userRepository.findByEmail(email);
        if (!user) {
            return reply.status(401).send({ success: false, message: 'Invalid credentials' });
        }

        const valid = await comparePassword(password, user.password);
        if (!valid) {
            return reply.status(401).send({ success: false, message: 'Invalid credentials' });
        }

        const token = await reply.jwtSign(
            { id: user.id, email: user.email, role: user.role },
            { expiresIn: '7d' }
        );

        return reply.send({
            success: true,
            data: {
                token,
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
            },
        });
    },

    async register(request: FastifyRequest, reply: FastifyReply) {
        const { email, password, name } = request.body as {
            email: string;
            password: string;
            name: string;
        };

        const existing = await userRepository.findByEmail(email);
        if (existing) {
            return reply.status(400).send({ success: false, message: 'Email already registered' });
        }

        const user = await userRepository.create({
            email,
            password,
            name,
            role: 'USER',
            subscriptionPlanId: 'free',
            subscriptionStatus: 'ACTIVE',
        });

        const token = await reply.jwtSign(
            { id: user.id, email: user.email, role: user.role },
            { expiresIn: '7d' }
        );

        return reply.status(201).send({
            success: true,
            data: {
                token,
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
            },
        });
    },

    async me(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.user as { id: string };
        const user = await userRepository.findById(id);
        if (!user) return reply.status(404).send({ success: false, message: 'User not found' });
        const { password: _, ...safe } = user;
        return reply.send({ success: true, data: safe });
    },
};

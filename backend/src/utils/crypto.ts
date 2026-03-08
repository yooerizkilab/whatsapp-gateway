import crypto from 'crypto';

export const cryptoUtils = {
    generateRandomString(length: number): string {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    }
};

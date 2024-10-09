import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const authValidationRouter = new Elysia({ name: 'Service.Auth' })
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET!
    }))
    .derive({ as: 'scoped' }, async ({ headers, jwt }) => {
        const authHeader = headers.authorization || headers.Authorization;
        if (!authHeader) return {};

        const token = authHeader.split(' ')[1];
        if (!token) return {};

        try {
            const payload = await jwt.verify(token);
            if (typeof payload === 'object' && 'userId' in payload) {
                return {
                    User: payload
                };
            }
            return {};
        } catch (error) {
            return {}; // Token is invalid
        }
    })
    .macro(({ onBeforeHandle }) => ({
        requireAuth() {
            onBeforeHandle(({ User, error }) => {
                if (!User) return error(401, 'Unauthorized');
            });
        },
    }));

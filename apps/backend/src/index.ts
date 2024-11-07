import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authRouter } from './routes/auth';
import { classRouter } from './routes/class';
import { jwt } from '@elysiajs/jwt';
import { assignmentRouter } from './routes/assignment';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
    .use(swagger())
    .use(cors({
        origin: ['.modelith.com', 'localhost'],
        credentials: true
    }))
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET!,
        schema: t.Object({
            userId: t.String()
        })
    }))
    .get('/hi', () => {
        console.log('it got triggered');
        return { hi: 'Bun👋' }
    })
    .post('/hi', ({ body }) => ({ hi: body.name }), {
        body: t.Object({
            name: t.String(),
        })
    })
    .use(authRouter)
    .use(classRouter)
    .use(assignmentRouter)
    .listen(8080);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

type App = typeof app;

export type { App };




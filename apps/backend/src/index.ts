import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors'
import { authRouter } from './routes/auth'
import { classRouter } from './routes/class'
import { jwt } from '@elysiajs/jwt'
import { assignmentRouter } from './routes/assignment'

// const isProduction = process.env.NODE_ENV === 'production';

// const allowedOrigins = isProduction
//     ? ['www.modelith.com', 'modelith.com']
//     : ['localhost:3000'];

const app = new Elysia()
    .use(cors({
        origin: '*',
        credentials: true

    }
    ))
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET!
    }))
    .get('/', () => ({ hello: 'Bun👋' }))
    .get('/hello/:name', ({ params }) => ({ hello: params.name }))
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
    .listen(8080)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)


type App = typeof app;

export type { App }




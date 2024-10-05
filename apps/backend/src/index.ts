import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors'

const app = new Elysia()
    .use(cors({
        origin: ['http://localhost:3000']
    }
    ))
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
    .listen(8080);

console.log(`Listening on ${app.server!.url}`);

type App = typeof app;

export type { App }
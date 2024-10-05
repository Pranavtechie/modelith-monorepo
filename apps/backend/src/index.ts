import { Elysia, t } from 'elysia';

const app = new Elysia()
    .get('/', () => ({ hello: 'Bun👋' }))
    .get('/hello/:name', ({ params }) => ({ hello: params.name }))
    .get('/hi', () => ({ hi: 'Bun👋' }))
    .post('/hi', ({ body }) => ({ hi: body.name }), {
        body: t.Object({
            name: t.String(),
        })
    })
    .listen(8080);

console.log(`Listening on ${app.server!.url}`);

export type App = typeof app;
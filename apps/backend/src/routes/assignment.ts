import { Elysia, t } from 'elysia'
import { db } from '../db/db'
import { NotFoundError } from 'elysia'
import { uuidv7 } from 'uuidv7';

export const assignmentRouter = new Elysia({ prefix: '/assignment' })
    .get('/', () => {
        console.log('this is being printed');
        return 'hello assignments';
    })
    .get('/:id', async ({ params }) => {
        const id = params.id;
        // Add your logic here
        return `Assignment with ID: ${id}`;
    }, {
        params: t.Object({
            id: t.String()
        })
    });
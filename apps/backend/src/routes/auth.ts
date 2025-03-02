import { Elysia, t } from 'elysia'
import { db } from '../db/db'
import { uuidv7 } from "uuidv7";
import { Role } from '../db/enums';
import { jwt } from '@elysiajs/jwt'

// make a new router here 
// this router will be used for all authentication related routes
// it will have a prefix of /auth
// it will have 3 routes
export const authRouter = new Elysia({ prefix: '/auth' })
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!
  }))
  .post('/login', async ({ body, set, jwt }) => {
    const { email, password } = body;

    const user = await db
      .selectFrom('User')
      .where('email', '=', email)
      .select(['id', 'email', 'password', 'name', 'role'])
      .executeTakeFirst();

    if (!user || !(await Bun.password.verify(password, user.password))) {
      set.status = 401;
      return { error: 'Invalid credentials' };
    }

    const token = await jwt.sign({ userId: user.id });

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword, authToken: token };

  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .post('/register', async ({ body, set, jwt }) => {
    const { email, password, name, role = 'STUDENT' } = body;

    // Check if user already exists
    const existingUser = await db
      .selectFrom('User')
      .where('email', '=', email)
      .executeTakeFirst();


    if (existingUser) {
      set.status = 400;
      return { error: 'User with this email already exists' };
    }

    // Hash the password
    const hashedPassword = await Bun.password.hash(password);

    // Create new user
    const newUser = await db
      .insertInto('User')
      .values({
        id: uuidv7(),
        email,
        password: hashedPassword,
        name,
        role,
        updatedAt: new Date(),
      })
      .returning(['id', 'email', 'name', 'role'])
      .executeTakeFirst();

    if (!newUser) {
      set.status = 500;
      return { error: 'Failed to create user' };
    }


    const token = await jwt.sign({ userId: newUser.id });


    return { success: true, user: newUser, authToken: token };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      name: t.String(),
      role: t.Optional(t.Enum(Role))
    })
  })
  .post('/logout', ({ set }) => {
    set.status = 200
    return { message: 'Logged out successfully' }
  })
  .onError(({ code, error, set }) => {
    console.error(`Error in auth router: ${code}`, error)
    set.status = code === 'VALIDATION' ? 400 : 500
    return { error: error.message }
  })




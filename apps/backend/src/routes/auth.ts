import { Elysia, t } from 'elysia'
import { db } from '../db/db'
import { uuidv7 } from "uuidv7";
import { Role } from '../db/enums';
import { jwt } from '@elysiajs/jwt'

interface CookieOptions {
  value: any;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "none" | "lax";
  maxAge: number;
  domain?: string;
}

const isProduction = process.env.NODE_ENV === 'production';


export const authRouter = new Elysia({ prefix: '/auth' })
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!
  }))
  .post('/login', async ({ body, set, cookie, jwt }) => {
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

    const cookieOptions: CookieOptions = {
      value: token,
      httpOnly: true,
      secure: isProduction, // Secure in production, not in development
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in production, 'lax' in development
      maxAge: 7 * 24 * 60 * 60, // 7 days
      domain: isProduction ? '.modelith.com' : undefined, // Domain for production, undefined for development
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.domain = '.modelith.com';
    } else {
      cookieOptions.domain = 'localhost:8080'
    }

    cookie.auth?.set(cookieOptions);

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .post('/register', async ({ body, set, jwt, cookie }) => {
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

    // Generate JWT token
    const token = await jwt.sign({ userId: newUser.id });

    const cookieOptions: CookieOptions = {
      value: token,
      httpOnly: true,
      secure: isProduction, // Secure in production, not in development
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in production, 'lax' in development
      maxAge: 7 * 24 * 60 * 60, // 7 days
      domain: isProduction ? '.modelith.com' : undefined, // Domain for production, undefined for development
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.domain = '.modelith.com';
    } else {
      cookieOptions.domain = 'localhost:8080'
    }

    cookie.auth?.set(cookieOptions);

    return { success: true, user: newUser };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      name: t.String(),
      role: t.Optional(t.Enum(Role))
    })
  })
  .get('/check', ({ set }) => {
    set.status = 200
    return { message: 'Authentication is working fine' }
  })
  .post('/logout', ({ cookie, set }) => {
    cookie.auth?.remove()
    set.status = 200
    return { message: 'Logged out successfully' }
  })
  .onError(({ code, error, set }) => {
    console.error(`Error in auth router: ${code}`, error)
    set.status = code === 'VALIDATION' ? 400 : 500
    return { error: error.message }
  })



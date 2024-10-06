import { Elysia, t } from 'elysia'
import { db } from '../db/db'
import { NotFoundError } from 'elysia'
import { uuidv7 } from 'uuidv7';

export const classRouter = new Elysia({ prefix: '/class' })
  .get('/', () => 'hello schools')
  .post('/procure', async ({ body }) => {
    const { userId } = body;
    // First, check if the user exists
    const user = await db.selectFrom('User')
      .where('id', '=', userId)
      .selectAll()
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const userClasses = await db.selectFrom('ClassEnrollment')
      .where('ClassEnrollment.userId', '=', userId)
      .innerJoin('Class', 'Class.id', 'ClassEnrollment.classId')
      .select([
        'Class.id',
        'Class.name',
        'Class.createdAt',
        'ClassEnrollment.enrolledAt'
      ])
      .execute();

    return userClasses;
  }, {
    body: t.Object({
      userId: t.String()
    })
  })
  .post('/join', async ({ body }) => {
    const { inviteCode, userId } = body;

    // Find the class with the given invite code
    const classToJoin = await db.selectFrom('Class')
      .where('inviteCode', '=', inviteCode)
      .selectAll()
      .executeTakeFirst();

    if (!classToJoin) {
      throw new NotFoundError('Class not found with the given invite code');
    }

    // Check if the user is already enrolled in the class
    const existingEnrollment = await db.selectFrom('ClassEnrollment')
      .where('userId', '=', userId)
      .where('classId', '=', classToJoin.id)
      .selectAll()
      .executeTakeFirst();

    if (existingEnrollment) {
      return { message: 'User is already enrolled in this class' };
    }

    // Enroll the user in the class
    const newEnrollment = await db.insertInto('ClassEnrollment')
      .values({
        id: uuidv7(),
        userId: userId,
        classId: classToJoin.id,

      })
      .returning(['id', 'userId', 'classId', 'enrolledAt'])
      .executeTakeFirst();

    return {
      message: 'Successfully enrolled in the class',
      enrollment: newEnrollment
    };
  }, {
    body: t.Object({
      inviteCode: t.String(),
      userId: t.String()
    })
  })

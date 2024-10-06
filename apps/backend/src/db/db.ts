import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { DB } from './types'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
})

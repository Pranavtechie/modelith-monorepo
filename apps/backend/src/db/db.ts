import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { DB } from './types'
import fs from "fs"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('/etc/ssl/certs/global-bundle.pem').toString(),
  },

})

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
})

import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { DB } from './types'
import fs from "fs"
import env from "@repo/env"


let dbConnectionObject = {
}

if (env.NODE_ENV === 'production') {
  dbConnectionObject = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('/etc/ssl/certs/global-bundle.pem').toString(),
    },
  }
}

const pool = new Pool(dbConnectionObject)

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
})

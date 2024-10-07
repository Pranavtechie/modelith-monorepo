import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { DB } from './types'

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

let connectionObject = {
}

if (isProduction) {
  connectionObject = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
} else {
  connectionObject = {
    connectionString: process.env.DATABASE_URL

  }
}
const pool = new Pool(connectionObject)


export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
})

import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { DB } from './types'

// const isProduction = process.env.NODE_ENV === 'production' ? true : false;

let connectionObject = {
  connectionString: process.env.DATABASE_URL,
}

// if (isProduction) {
//   connectionObject = {

//     ssl: {
//       rejectUnauthorized: false
//     }
//   }
// } else {
//   connectionObject = {
//     connectionString: process.env.DATABASE_URL

//   }
// }

const pool = new Pool(connectionObject)


export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
})

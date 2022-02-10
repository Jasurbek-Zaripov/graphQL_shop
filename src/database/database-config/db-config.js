import pkg from 'pg';
const {Pool} = pkg;

import {config} from 'dotenv'
config()

let pool = new Pool({
  connectionString:process.env.DB_URL
})
export default async () => {
let client = await pool.connect()
return client
}
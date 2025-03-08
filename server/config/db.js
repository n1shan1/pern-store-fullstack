import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

//creating a sql connection using our env variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

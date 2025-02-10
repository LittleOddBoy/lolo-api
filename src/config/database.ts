import * as Db from "better-sqlite3";
import { Database } from "better-sqlite3";
import { createTables } from "../db/tables";

export const initDb = () => {
  const db: Database = new Db("./lolo.db");

  // create starter tables
  createTables(db);

  return db;
};

import { Database } from "better-sqlite3";

export const createTables = (db: Database) => {
  // create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL UNIQUE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `);
  
  // create posts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { projectRoot } from '../config/paths.js';

const dbPath = path.join(projectRoot, 'src/database/personnes.db');
const schemaPath = path.join(projectRoot, 'src/database/personnes-schema.sql');

export const personnesDb = new Database(dbPath);

personnesDb.exec(fs.readFileSync(schemaPath, 'utf-8'));
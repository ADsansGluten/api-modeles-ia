import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { projectRoot } from '../config/paths.js';

const dbPath = path.join(projectRoot, 'src/database/ai-models.db');
const schemaPath = path.join(projectRoot, 'src/database/schema.sql');

export const db = new Database(dbPath);

// Crée la table au démarrage si elle n'existe pas encore
db.exec(fs.readFileSync(schemaPath, 'utf-8'));
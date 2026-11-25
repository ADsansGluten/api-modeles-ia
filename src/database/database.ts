import Database from 'better-sqlite3';
import path from 'node:path';
import {projectRoot} from '../config/paths.js';

// Ouvre le fichier de base SQLite situé dans src/database.
const dbPath = path.join(projectRoot, 'src/database/ai-models.db');
export const db = new Database(dbPath);
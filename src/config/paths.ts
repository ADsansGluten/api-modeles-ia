import {fileURLToPath} from 'node:url';

// Chemin de la racine du projet, quel que soit le dossier depuis lequel on lance le serveur.
export const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
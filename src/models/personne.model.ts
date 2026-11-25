// Représente une personne telle qu'elle est stockée dans la base des personnes.
export interface Personne {
    id: number;
    firstName: string;
    lastName: string;
    favoriteModelId: number | null;
}
// Resolve les chemins d'assets publics (dossier /public) selon le base path Vite
const BASE = import.meta.env.BASE_URL;

export const asset = (path) => `${BASE}${String(path).replace(/^\/+/, "")}`;

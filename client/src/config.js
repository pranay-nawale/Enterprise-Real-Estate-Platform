// Central API configuration.
// Override by setting VITE_API_BASE in a .env file at the client root.
// Example .env:  VITE_API_BASE=https://your-production-server.com
export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000';

import axios from 'axios'

// La app siempre habla con /api y nginx proxea al backend.
// Para desarrollo local, corré el frontend con "npm run dev" y usá vite proxy
// (o apuntá axios a localhost:8000 puntualmente).
const baseURL = '/api'

export const api = axios.create({ baseURL, timeout: 15000 })

export async function predecir(factores) {
  const { data } = await api.post('/predict', factores)
  return data
}

import axios from 'axios'

// En produccion el frontend habla con /api (proxy nginx -> backend)
// En desarrollo local apunta a http://localhost:8000 si no se define VITE_API_URL
const baseURL = import.meta.env.VITE_API_URL || '/api'

export const api = axios.create({ baseURL, timeout: 15000 })

export async function predecir(factores) {
  const { data } = await api.post('/predict', factores)
  return data
}

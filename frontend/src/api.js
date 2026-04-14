import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({ baseURL, timeout: 15000 })

export async function predecir(factores) {
  const { data } = await api.post('/predict', factores)
  return data
}

// Estado compartido entre módulos, persistido en localStorage.
// Todo queda en el dispositivo del usuario.

const K_RESULTADO = 'healthai.ultimo_resultado.v1'
const K_HABITOS = 'healthai.habitos.v1'
const K_AUTOEX = 'healthai.autoexamen.v1'

const lunesISO = () => {
  const d = new Date()
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return d.toISOString().slice(0, 10)
}

export function guardarResultado(data) {
  try {
    localStorage.setItem(K_RESULTADO, JSON.stringify({
      data, fecha: new Date().toISOString(),
    }))
  } catch {}
}

export function leerResultado() {
  try {
    const raw = localStorage.getItem(K_RESULTADO)
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

export function leerHabitos() {
  try {
    const raw = localStorage.getItem(K_HABITOS)
    if (!raw) return { semana: lunesISO(), hechos: {} }
    const parsed = JSON.parse(raw)
    if (parsed.semana !== lunesISO()) return { semana: lunesISO(), hechos: {} }
    return parsed
  } catch { return { semana: lunesISO(), hechos: {} } }
}

export function guardarHabitos(hechos) {
  try {
    localStorage.setItem(K_HABITOS, JSON.stringify({ semana: lunesISO(), hechos }))
  } catch {}
}

export function registrarAutoexamen() {
  try {
    localStorage.setItem(K_AUTOEX, JSON.stringify({ fecha: new Date().toISOString() }))
  } catch {}
}

export function leerAutoexamen() {
  try {
    const raw = localStorage.getItem(K_AUTOEX)
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

export function diasDesde(isoFecha) {
  const d = new Date(isoFecha)
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24))
}

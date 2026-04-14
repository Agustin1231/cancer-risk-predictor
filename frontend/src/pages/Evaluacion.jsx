import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { predecir } from '../api.js'
import Resultado from '../components/Resultado.jsx'
import { CAMPOS, VALORES_INICIALES } from '../components/opciones.js'

const MENSAJES_CARGA = [
  'Analizando tu perfil con cuidado...',
  'Consultando patrones de más de 6 millones de mamografías...',
  'Pensando en los factores que más pesan en tu caso...',
  'Armando tu plan personalizado...',
]

export default function Evaluacion() {
  const [paso, setPaso] = useState(0)
  const [form, setForm] = useState(VALORES_INICIALES)
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [cargaMsgIdx, setCargaMsgIdx] = useState(0)

  const total = CAMPOS.length
  const campo = CAMPOS[paso]
  const progreso = ((paso + 1) / total) * 100

  const seleccionar = (value) => {
    setForm({ ...form, [campo.key]: value })
  }

  const siguiente = async () => {
    if (paso < total - 1) {
      setPaso(paso + 1)
    } else {
      await calcular()
    }
  }

  const calcular = async () => {
    setCargando(true)
    setError(null)
    const interval = setInterval(() => {
      setCargaMsgIdx(i => (i + 1) % MENSAJES_CARGA.length)
    }, 1100)
    try {
      const res = await predecir(form)
      setTimeout(() => {
        setResultado(res)
        setCargando(false)
        clearInterval(interval)
      }, 1600)
    } catch (err) {
      clearInterval(interval)
      setError(err.response?.data?.detail || err.message)
      setCargando(false)
    }
  }

  const reset = () => {
    setResultado(null)
    setPaso(0)
    setForm(VALORES_INICIALES)
    setError(null)
  }

  if (resultado) {
    return <Resultado data={resultado} onReset={reset} />
  }

  if (cargando) {
    return (
      <div className="calculating">
        <div className="pulse" />
        <AnimatePresence mode="wait">
          <motion.div
            key={cargaMsgIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .4 }}
            className="calculating-msg"
          >
            {MENSAJES_CARGA[cargaMsgIdx]}
          </motion.div>
        </AnimatePresence>
        <p className="calculating-sub">Esto toma solo un momento.</p>
      </div>
    )
  }

  return (
    <div className="wizard">
      <div className="wizard-progress">
        <span>Pregunta {paso + 1} de {total}</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progreso}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={paso}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: .28, ease: 'easeOut' }}
          className="wizard-card"
        >
          <div className="wizard-question">{campo.label}</div>
          {campo.hint && <div className="wizard-hint">{campo.hint}</div>}

          <div className="wizard-options">
            {campo.opciones.map(o => {
              const selected = form[campo.key] === o.value
              return (
                <button
                  key={o.value}
                  type="button"
                  className={`wizard-option ${selected ? 'selected' : ''}`}
                  onClick={() => seleccionar(o.value)}
                >
                  <span className="wizard-option-radio" />
                  <span>{o.label}</span>
                </button>
              )
            })}
          </div>

          {error && <div className="error">Algo falló de nuestro lado, no fue tu culpa. Probá de nuevo: {error}</div>}

          <div className="wizard-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setPaso(Math.max(0, paso - 1))}
              disabled={paso === 0}
            >
              ← Atrás
            </button>
            <button type="button" className="btn btn-primary" onClick={siguiente}>
              {paso === total - 1 ? 'Calcular mi riesgo' : 'Siguiente'} →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

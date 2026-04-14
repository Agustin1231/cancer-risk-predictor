import { useState } from 'react'
import { predecir } from '../api.js'
import Resultado from '../components/Resultado.jsx'
import { CAMPOS, VALORES_INICIALES } from '../components/opciones.js'

export default function Evaluacion() {
  const [form, setForm] = useState(VALORES_INICIALES)
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (key) => (e) =>
    setForm({ ...form, [key]: parseInt(e.target.value, 10) })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true); setError(null); setResultado(null)
    try {
      setResultado(await predecir(form))
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
    } finally {
      setCargando(false)
    }
  }

  if (resultado) {
    return <Resultado data={resultado} onReset={() => setResultado(null)} />
  }

  return (
    <section className="card">
      <h2>Cuestionario de factores de riesgo</h2>
      <form onSubmit={handleSubmit} className="form">
        {CAMPOS.map(({ key, label, opciones }) => (
          <div key={key} className="form-row">
            <label>{label}</label>
            <select value={form[key]} onChange={handleChange(key)}>
              {opciones.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        ))}
        {error && <div className="error">Error: {error}</div>}
        <button className="btn btn-primary" disabled={cargando}>
          {cargando ? 'Calculando...' : 'Calcular mi riesgo'}
        </button>
      </form>
    </section>
  )
}

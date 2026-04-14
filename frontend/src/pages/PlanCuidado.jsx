import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { leerHabitos, guardarHabitos } from '../lib/storage.js'

const CALENDARIO = [
  {
    rango: 'Menos de 25 años',
    acciones: [
      'Conocer los antecedentes familiares',
      'Iniciar el hábito del autoexamen mensual',
      'Consulta ginecológica anual',
    ],
  },
  {
    rango: '25 a 39 años',
    acciones: [
      'Autoexamen mensual',
      'Examen clínico por profesional cada 1 a 3 años',
      'Con antecedente familiar: mastología para tamizaje temprano',
    ],
  },
  {
    rango: '40 a 49 años',
    acciones: [
      'Mamografía cada 1 a 2 años',
      'Autoexamen mensual + examen clínico anual',
      'Revisar si tu densidad mamaria requiere ecografía',
    ],
  },
  {
    rango: '50 a 74 años',
    acciones: [
      'Mamografía anual — es la franja de mayor beneficio',
      'Examen clínico anual',
      'Mantener hábitos: peso, movimiento, alcohol moderado',
    ],
  },
  {
    rango: '75 o más',
    acciones: [
      'Decisión individualizada según estado de salud',
      'Continuar autoexamen y consultar ante cualquier cambio',
    ],
  },
]

const HABITOS = [
  { id: 'mov', titulo: '150 min de movimiento esta semana', detalle: 'Caminar rápido, bici, nadar — lo que te guste.' },
  { id: 'peso', titulo: 'Mantener un peso que me haga bien', detalle: 'IMC bajo 25 protege, sobre todo tras la menopausia.' },
  { id: 'verde', titulo: 'Sumar verduras y frutas al plato', detalle: 'Más plantas, menos ultraprocesados y carnes rojas procesadas.' },
  { id: 'alcohol', titulo: 'Menos alcohol esta semana', detalle: 'Ideal no más de 3 tragos semanales.' },
  { id: 'tabaco', titulo: 'Sin humo (propio ni ajeno)', detalle: 'No fumar y evitar el humo de segunda mano.' },
  { id: 'sueño', titulo: 'Dormir 7 a 8 horas', detalle: 'El sueño regula hormonas e inmunidad.' },
  { id: 'autoex', titulo: 'Hacer el autoexamen este mes', detalle: 'Día 8 del mes o entre el día 7 y 10 del ciclo.' },
  { id: 'control', titulo: 'Agendar mi próximo control', detalle: 'Según tu edad: ginecológico o mamografía.' },
]

export default function PlanCuidado() {
  const [hechos, setHechos] = useState({})

  useEffect(() => {
    setHechos(leerHabitos().hechos)
  }, [])

  const toggle = (id) => {
    const next = { ...hechos, [id]: !hechos[id] }
    setHechos(next)
    guardarHabitos(next)
  }

  const total = HABITOS.length
  const hechos_n = HABITOS.filter(h => hechos[h.id]).length
  const pct = Math.round((hechos_n / total) * 100)

  const frase = hechos_n === 0 ? 'Empezá por uno. El que te haga más sentido hoy.'
    : hechos_n === total ? '¡Qué semana hermosa! Te estás cuidando con ganas.'
    : hechos_n >= total / 2 ? 'Vas increíble. Seguí con tu ritmo.'
    : 'Pequeños pasos, grandes efectos. Una a la vez.'

  return (
    <div className="stack">
      <section className="card">
        <h2>Tu plan de cuidado</h2>
        <p>
          No todo pasa por la mamografía. Lo que hacés cada semana también mueve el riesgo —
          y acá podés tildar lo que vas logrando.
        </p>
      </section>

      <section className="card">
        <h3>Tu semana</h3>
        <div className="progress-summary" style={{ padding: 0, border: 0, marginBottom: '1rem' }}>
          <div className="progress-summary-top">
            <span className="soft">{frase}</span>
            <span className="progress-count">{hechos_n}/{total}</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: .5 }}
            />
          </div>
        </div>

        <div className="checklist">
          {HABITOS.map(h => {
            const done = !!hechos[h.id]
            return (
              <motion.button
                key={h.id}
                className={`checkitem ${done ? 'done' : ''}`}
                onClick={() => toggle(h.id)}
                whileTap={{ scale: .98 }}
              >
                <span className="checkbox">
                  {done && (
                    <motion.svg
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  )}
                </span>
                <span className="checkitem-text">
                  <strong>{h.titulo}</strong>
                  {h.detalle}
                </span>
              </motion.button>
            )
          })}
        </div>
        <p className="soft" style={{ marginTop: '1rem', fontSize: '.85rem' }}>
          La lista se guarda en tu dispositivo y se reinicia cada lunes. Nadie más la ve.
        </p>
      </section>

      <section className="card">
        <h3>Calendario de controles según tu edad</h3>
        <div className="calendario">
          {CALENDARIO.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * .05 }}
              className="calendario-item"
            >
              <h4>{c.rango}</h4>
              <ul>{c.acciones.map((a, j) => <li key={j}>{a}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

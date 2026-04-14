import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const COLORES = { Bajo: '#4a7c59', Medio: '#c27803', Alto: '#b42318' }
const IMPACTO_COLOR = {
  protector: '#4a7c59',
  neutro: '#8b7a8e',
  moderado: '#c27803',
  alto: '#b42318',
}
const IMPACTO_LABEL = {
  protector: 'Protector',
  neutro: 'Neutro',
  moderado: 'A cuidar',
  alto: 'Alto',
}

const MENSAJES = {
  Bajo: 'Respirá hondo. Tu riesgo estimado es bajo — seguí cuidándote con estos pequeños gestos.',
  Medio: 'Estás en un momento ideal para prestar atención. Pequeños cambios pueden hacer una gran diferencia.',
  Alto: 'Este resultado no define tu futuro. Te acompañamos con los próximos pasos para ocuparte de vos.',
}

function GaugeRing({ pct, color }) {
  const radius = 72
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference
  return (
    <div className="gauge-ring">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#f0e6e8" strokeWidth="14" />
        <motion.circle
          cx="90" cy="90" r={radius}
          fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          transform="rotate(-90 90 90)"
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2.4rem', fontWeight: 600, color, lineHeight: 1 }}>
            {pct}%
          </div>
        </div>
      </div>
    </div>
  )
}

function FactorAcordeon({ detalle }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="factor-item">
      <button className="factor-header" onClick={() => setAbierto(!abierto)}>
        <span className="chip" style={{ background: IMPACTO_COLOR[detalle.impacto] }}>
          {IMPACTO_LABEL[detalle.impacto]}
        </span>
        <strong>{detalle.etiqueta}</strong>
        {detalle.modificable && <span className="tag tag-success">Modificable</span>}
        <span className={`factor-chevron ${abierto ? 'open' : ''}`}>▾</span>
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .25 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="factor-body">
              <p>{detalle.mensaje}</p>
              {detalle.tip && <div className="tip-box">💡 <span>{detalle.tip}</span></div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Resultado({ data, onReset }) {
  const pct = Math.round(data.probabilidad * 100)
  const color = COLORES[data.nivel_riesgo]
  const detalles = data.factores_detalle || []
  const plan = data.plan_tamizaje

  return (
    <motion.div
      className="stack"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4 }}
    >
      <section className="result-hero">
        <GaugeRing pct={pct} color={color} />
        <div className="result-level" style={{ color }}>
          {data.nivel_riesgo}
          <span className="result-pct">Riesgo estimado</span>
        </div>
        <p className="result-message">{MENSAJES[data.nivel_riesgo]}</p>
      </section>

      <section className="card">
        <h2>¿Qué hacer con esto?</h2>
        <ul>
          {data.recomendaciones.map((r, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .1 + i * .08 }}
            >{r}</motion.li>
          ))}
        </ul>
      </section>

      {detalles.length > 0 && (
        <section className="card">
          <h2>Los factores que más pesan en tu caso</h2>
          <p className="soft">Tocá cada uno para ver el detalle. Los marcados como <strong>modificables</strong> son los que podés trabajar vos.</p>
          <div className="factores-list">
            {detalles.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .05 * i }}
              >
                <FactorAcordeon detalle={d} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {plan && (
        <section className="card">
          <h2>Tu plan de tamizaje sugerido</h2>
          <div className="info-box">
            <strong>{plan.frecuencia}</strong>
            <p><strong>Lo próximo:</strong> {plan.proxima_accion}</p>
            <p className="soft" style={{ margin: 0 }}>{plan.detalle}</p>
          </div>
        </section>
      )}

      <section className="card">
        <h2>Seguí el camino</h2>
        <p className="soft">No te quedes solo con el número. Estos módulos te ayudan a pasar a la acción.</p>
        <div className="modulos">
          <Link to="/autoexamen" className="modulo">
            <div className="modulo-icon">🤲</div>
            <h3>Aprendé el autoexamen</h3>
            <p>Te acompaño paso a paso. Toma 5 minutos al mes y te ayuda a conocer tu cuerpo.</p>
            <span className="modulo-cta">Ir a la guía →</span>
          </Link>
          <Link to="/plan-cuidado" className="modulo">
            <div className="modulo-icon">📅</div>
            <h3>Armá tu plan</h3>
            <p>Calendario de controles y hábitos para tildar a medida que los incorporás.</p>
            <span className="modulo-cta">Ver plan →</span>
          </Link>
        </div>
        <p className="aviso">{data.aviso}</p>
        <button className="btn" onClick={onReset}>Hacer otra evaluación</button>
      </section>
    </motion.div>
  )
}

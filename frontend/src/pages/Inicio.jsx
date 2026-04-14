import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon.jsx'
import { leerResultado, leerHabitos, leerAutoexamen, diasDesde } from '../lib/storage.js'

const COLORES = { Bajo: '#4a7c59', Medio: '#c27803', Alto: '#b42318' }

function saludoPorHora() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function CardRiesgo() {
  const r = leerResultado()
  if (!r) {
    return (
      <Link to="/evaluacion" className="tile tile-primary">
        <div className="tile-head">
          <Icon name="activity" size={22} />
          <span className="tile-tag">Empezar aquí</span>
        </div>
        <div className="tile-big">Conocé tu riesgo</div>
        <p className="tile-sub">Un cuestionario breve y personalizado. Toma 2 minutos.</p>
        <span className="tile-cta">Empezar <Icon name="arrow-right" size={16} /></span>
      </Link>
    )
  }
  const pct = Math.round(r.data.probabilidad * 100)
  const color = COLORES[r.data.nivel_riesgo]
  const dias = diasDesde(r.fecha)
  return (
    <Link to="/evaluacion" className="tile">
      <div className="tile-head">
        <Icon name="activity" size={22} />
        <span className="tile-tag">Tu resultado</span>
      </div>
      <div className="tile-risk">
        <div className="ring-mini" style={{ '--c': color, '--p': pct }}>
          <span>{pct}%</span>
        </div>
        <div>
          <div className="tile-big" style={{ color, fontStyle: 'italic' }}>{r.data.nivel_riesgo}</div>
          <p className="tile-sub">Hace {dias === 0 ? 'hoy' : dias === 1 ? '1 día' : `${dias} días`}</p>
        </div>
      </div>
      <span className="tile-cta">Rehacer evaluación <Icon name="refresh" size={14} /></span>
    </Link>
  )
}

function CardPlan() {
  const { hechos } = leerHabitos()
  const hechos_n = Object.values(hechos).filter(Boolean).length
  const total = 8
  const pct = Math.round((hechos_n / total) * 100)
  return (
    <Link to="/plan-cuidado" className="tile">
      <div className="tile-head">
        <Icon name="calendar" size={22} />
        <span className="tile-tag">Esta semana</span>
      </div>
      <div className="tile-big">{hechos_n}<span style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>/{total}</span></div>
      <p className="tile-sub">hábitos tildados</p>
      <div className="mini-progress"><div style={{ width: `${pct}%` }} /></div>
      <span className="tile-cta">Ver mi plan <Icon name="arrow-right" size={14} /></span>
    </Link>
  )
}

function CardAutoexamen() {
  const a = leerAutoexamen()
  const dias = a ? diasDesde(a.fecha) : null
  const al_dia = dias !== null && dias <= 30
  return (
    <Link to="/autoexamen" className="tile">
      <div className="tile-head">
        <Icon name="hand" size={22} />
        <span className={`tile-tag ${al_dia ? 'tag-ok' : ''}`}>
          {al_dia ? 'Al día' : 'Recordatorio'}
        </span>
      </div>
      <div className="tile-big" style={{ fontSize: '1.4rem' }}>
        {a ? `Último: hace ${dias} día${dias === 1 ? '' : 's'}` : 'Aprendé el autoexamen'}
      </div>
      <p className="tile-sub">
        {al_dia
          ? 'Te toca uno nuevo en los próximos días.'
          : 'Guía paso a paso con temporizador.'}
      </p>
      <span className="tile-cta">
        {a ? 'Hacerlo ahora' : 'Ir a la guía'} <Icon name="arrow-right" size={14} />
      </span>
    </Link>
  )
}

function ProximaAccion() {
  const r = leerResultado()
  if (!r?.data?.plan_tamizaje) return null
  return (
    <motion.div
      className="banner"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="banner-icon"><Icon name="sparkle" size={18} /></div>
      <div style={{ flex: 1 }}>
        <strong>Lo próximo para vos</strong>
        <p>{r.data.plan_tamizaje.proxima_accion}</p>
      </div>
      <Link to="/plan-cuidado" className="btn btn-ghost btn-sm">Detalles</Link>
    </motion.div>
  )
}

export default function Inicio() {
  const r = leerResultado()
  const frase = r
    ? `Este es tu espacio de cuidado. Revisá tu progreso y seguí sumando.`
    : `Empezá por conocer tu riesgo. Es el primer paso para cuidarte mejor.`

  return (
    <div className="dashboard">
      <motion.div
        className="dash-head"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>{saludoPorHora()} 👋</h1>
        <p className="soft">{frase}</p>
      </motion.div>

      <ProximaAccion />

      <div className="tiles">
        <CardRiesgo />
        <CardPlan />
        <CardAutoexamen />
        <Link to="/dashboard" className="tile tile-quiet">
          <div className="tile-head">
            <Icon name="chart" size={22} />
            <span className="tile-tag">Contexto</span>
          </div>
          <div className="tile-big" style={{ fontSize: '1.4rem' }}>Panorama en Colombia</div>
          <p className="tile-sub">Datos epidemiológicos del país.</p>
          <span className="tile-cta">Ver datos <Icon name="arrow-right" size={14} /></span>
        </Link>
      </div>

      <motion.section
        className="card"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
      >
        <h3 style={{ margin: 0, marginBottom: '.75rem' }}>¿Cómo funciona este espacio?</h3>
        <div className="how-grid">
          <div className="how-item">
            <div className="how-num">1</div>
            <strong>Respondé tu evaluación</strong>
            <p>10 preguntas para entender tu riesgo personal.</p>
          </div>
          <div className="how-item">
            <div className="how-num">2</div>
            <strong>Aprendé el autoexamen</strong>
            <p>Una guía que te acompaña 5 minutos al mes.</p>
          </div>
          <div className="how-item">
            <div className="how-num">3</div>
            <strong>Sumá hábitos cada semana</strong>
            <p>Lo que tildás se guarda en tu dispositivo.</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const MODULOS = [
  {
    to: '/evaluacion',
    icon: '🧬',
    titulo: 'Conocé tu riesgo',
    texto: 'Un cuestionario breve, pregunta por pregunta, y un resultado pensado para vos — no un número frío.',
    cta: 'Empezar evaluación',
    destacado: true,
  },
  {
    to: '/autoexamen',
    icon: '🤲',
    titulo: 'Aprendé el autoexamen',
    texto: 'Guía paso a paso con un temporizador que te acompaña. 5 minutos al mes que valen la pena.',
    cta: 'Ver la guía',
  },
  {
    to: '/plan-cuidado',
    icon: '📅',
    titulo: 'Armá tu plan',
    texto: 'Calendario de controles según tu edad y hábitos con evidencia que podés tildar cada semana.',
    cta: 'Ver el plan',
  },
  {
    to: '/dashboard',
    icon: '📊',
    titulo: 'Panorama en Colombia',
    texto: 'Datos reales del país: casos por año, región, edad y régimen de salud.',
    cta: 'Ver dashboard',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: .08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: .4 } },
}

export default function Inicio() {
  return (
    <div className="stack">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
      >
        <span className="hero-greeting">Hola 👋 qué bueno que estás acá</span>
        <h1>
          Cuidarte también es <em>conocerte</em>.
        </h1>
        <p>
          Una herramienta que te acompaña a entender tu riesgo de cáncer de mama, aprender a hacer el autoexamen y armar un plan de cuidado que tenga sentido para vos.
        </p>
        <Link to="/evaluacion" className="btn btn-primary btn-lg">
          Empezar evaluación →
        </Link>
      </motion.section>

      <motion.section
        className="modulos"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {MODULOS.map((m) => (
          <motion.div key={m.to} variants={item}>
            <Link to={m.to} className={`modulo ${m.destacado ? 'modulo-destacado' : ''}`}>
              <div className="modulo-icon" style={{ fontSize: '1.5rem' }}>{m.icon}</div>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
              <span className="modulo-cta">{m.cta} →</span>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .4 }}
      >
        <h2 style={{ fontStyle: 'italic' }}>Una palabra antes de empezar</h2>
        <p>
          Esta app no diagnostica ni reemplaza a un profesional. Es una compañía — un espacio para darle lugar al cuidado preventivo, con información clara y sin susto.
        </p>
        <p className="soft" style={{ marginBottom: 0 }}>
          Tu información no sale de tu dispositivo para nada que no sea calcular tu resultado. No guardamos datos personales.
        </p>
      </motion.section>
    </div>
  )
}

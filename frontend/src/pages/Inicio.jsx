import { Link } from 'react-router-dom'

const MODULOS = [
  {
    to: '/evaluacion',
    icon: '🧬',
    titulo: 'Mi riesgo',
    texto: 'Respondé un cuestionario breve y recibí una estimación personalizada con los factores que más pesan en tu caso.',
    cta: 'Iniciar evaluación',
    destacado: true,
  },
  {
    to: '/autoexamen',
    icon: '🤲',
    titulo: 'Autoexamen',
    texto: 'Guía paso a paso para hacerte el autoexamen mensual y saber qué señales deberías consultar.',
    cta: 'Ver guía',
  },
  {
    to: '/plan-cuidado',
    icon: '📅',
    titulo: 'Plan de cuidado',
    texto: 'Calendario de controles según tu edad y hábitos con evidencia para reducir el riesgo.',
    cta: 'Ver plan',
  },
  {
    to: '/dashboard',
    icon: '📊',
    titulo: 'Panorama',
    texto: 'Estadísticas de cáncer de mama en Colombia por año, localidad y grupo de edad.',
    cta: 'Ver dashboard',
  },
]

export default function Inicio() {
  return (
    <div className="stack">
      <section className="hero">
        <h1>Conocé tu riesgo. Cuidate a tiempo.</h1>
        <p>
          HealthAI Breast BDI es tu acompañante de salud mamaria: estimá tu riesgo,
          aprendé a hacerte el autoexamen y armá un plan de cuidado personalizado.
        </p>
      </section>

      <section className="modulos">
        {MODULOS.map((m) => (
          <Link key={m.to} to={m.to} className={`modulo ${m.destacado ? 'modulo-destacado' : ''}`}>
            <div className="modulo-icon">{m.icon}</div>
            <h3>{m.titulo}</h3>
            <p>{m.texto}</p>
            <span className="modulo-cta">{m.cta} →</span>
          </Link>
        ))}
      </section>
    </div>
  )
}

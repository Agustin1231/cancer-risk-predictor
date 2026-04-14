import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { registrarAutoexamen, leerAutoexamen, diasDesde } from '../lib/storage.js'

const PASOS = [
  {
    titulo: 'Mirate en el espejo',
    detalle: 'Con los brazos relajados, observá el tamaño, forma y contorno de ambas mamas. Buscá asimetrías nuevas, hundimientos o cambios en la piel.',
    ilustracion: 'espejo',
  },
  {
    titulo: 'Levantá los brazos',
    detalle: 'Alzá los brazos por encima de la cabeza. Fijate si al moverlos aparecen hoyuelos, pliegues o retracciones en la piel o en el pezón.',
    ilustracion: 'brazos',
  },
  {
    titulo: 'Revisá el pezón',
    detalle: 'Apretá suavemente cada pezón entre índice y pulgar. Fijate si sale líquido — transparente, lechoso, amarillento o con sangre.',
    ilustracion: 'pezon',
  },
  {
    titulo: 'Acostate con una almohada',
    detalle: 'Acostate boca arriba con una almohada bajo el hombro del lado que vas a revisar. Con la mano opuesta, usá las yemas de tres dedos.',
    ilustracion: 'acostada',
  },
  {
    titulo: 'Movimientos circulares',
    detalle: 'Hacé pequeños círculos firmes, recorriendo toda la mama en espiral desde afuera hacia el pezón. Aplicá presión superficial, media y profunda.',
    ilustracion: 'circulos',
  },
  {
    titulo: 'Incluí la axila',
    detalle: 'Palpá también la axila y la zona por encima de la clavícula. Ahí hay ganglios que pueden inflamarse si algo anda distinto.',
    ilustracion: 'axila',
  },
  {
    titulo: 'Repetí del otro lado',
    detalle: 'Hacé exactamente lo mismo con la otra mama. Podés terminar de pie bajo la ducha enjabonada — los dedos se deslizan mejor.',
    ilustracion: 'ducha',
  },
]

const ALERTAS = [
  'Un bulto nuevo, duro, que no se mueve',
  'Cambios en tamaño o forma de una mama',
  'Piel con aspecto de cáscara de naranja',
  'Retracción del pezón o la piel',
  'Secreción espontánea, sobre todo con sangre',
  'Enrojecimiento o calor persistente',
  'Ganglios palpables en la axila',
]

function Ilustracion({ tipo }) {
  const base = { width: 120, height: 120, stroke: '#c2185b', fill: 'none', strokeWidth: 2 }
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
      <circle cx="60" cy="60" r="55" fill="#fce4ec" />
      {tipo === 'espejo' && (
        <g {...base}>
          <rect x="40" y="25" width="40" height="60" rx="4" fill="#fff" />
          <circle cx="60" cy="55" r="10" />
          <line x1="50" y1="85" x2="70" y2="85" />
        </g>
      )}
      {tipo === 'brazos' && (
        <g {...base}>
          <circle cx="60" cy="35" r="8" />
          <line x1="60" y1="43" x2="60" y2="75" />
          <line x1="60" y1="50" x2="40" y2="20" />
          <line x1="60" y1="50" x2="80" y2="20" />
        </g>
      )}
      {tipo === 'pezon' && (
        <g {...base}>
          <circle cx="60" cy="60" r="25" />
          <circle cx="60" cy="60" r="6" fill="#c2185b" />
        </g>
      )}
      {tipo === 'acostada' && (
        <g {...base}>
          <rect x="20" y="60" width="80" height="20" rx="4" fill="#fff" />
          <circle cx="30" cy="55" r="7" />
          <rect x="35" y="50" width="50" height="15" rx="3" fill="#fff" />
        </g>
      )}
      {tipo === 'circulos' && (
        <g {...base}>
          <circle cx="60" cy="60" r="30" strokeDasharray="4 3" />
          <circle cx="60" cy="60" r="20" strokeDasharray="4 3" />
          <circle cx="60" cy="60" r="10" />
          <circle cx="60" cy="60" r="3" fill="#c2185b" />
        </g>
      )}
      {tipo === 'axila' && (
        <g {...base}>
          <path d="M40 30 L40 70 L60 80 L80 70 L80 30" />
          <circle cx="45" cy="45" r="5" fill="#c2185b" />
        </g>
      )}
      {tipo === 'ducha' && (
        <g {...base}>
          <circle cx="60" cy="30" r="12" fill="#fff" />
          <line x1="55" y1="42" x2="50" y2="90" />
          <line x1="60" y1="42" x2="60" y2="95" />
          <line x1="65" y1="42" x2="70" y2="90" />
        </g>
      )}
    </svg>
  )
}

function descargarRecordatorio() {
  const ahora = new Date()
  const primerDiaProximoMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 8, 9, 0, 0)
  const fin = new Date(primerDiaProximoMes.getTime() + 15 * 60 * 1000)
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HealthAI//Autoexamen//ES',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@healthai.local`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(primerDiaProximoMes)}`,
    `DTEND:${fmt(fin)}`,
    'SUMMARY:Autoexamen mamario mensual',
    'DESCRIPTION:Un momento para vos. Revisá tu guía en HealthAI.',
    'RRULE:FREQ=MONTHLY;BYMONTHDAY=8',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio de autoexamen',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'recordatorio-autoexamen.ics'
  a.click()
  URL.revokeObjectURL(url)
}

function Timer() {
  const [segs, setSegs] = useState(300) // 5 min
  const [corriendo, setCorriendo] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (corriendo) {
      ref.current = setInterval(() => {
        setSegs(s => {
          if (s <= 1) { clearInterval(ref.current); setCorriendo(false); return 0 }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(ref.current)
  }, [corriendo])

  const mm = String(Math.floor(segs / 60)).padStart(2, '0')
  const ss = String(segs % 60).padStart(2, '0')

  return (
    <div className="timer-box">
      <div className="timer-display">{mm}:{ss}</div>
      <div style={{ flex: 1 }}>
        <strong>Te acompaño los 5 minutos</strong>
        <p className="soft" style={{ margin: '.25rem 0 .75rem', fontSize: '.9rem' }}>
          No hay apuro. Respirá y conocé tu cuerpo sin presión.
        </p>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button className="btn btn-primary" onClick={() => setCorriendo(c => !c)}>
            {corriendo ? 'Pausar' : segs === 0 ? 'Listo 💛' : 'Empezar'}
          </button>
          <button className="btn btn-ghost" onClick={() => { setSegs(300); setCorriendo(false) }}>
            Reiniciar
          </button>
          <button className="btn btn-ghost" onClick={() => registrarAutoexamen()}>
            Ya lo hice
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Autoexamen() {
  const [idx, setIdx] = useState(0)

  return (
    <div className="stack">
      <section className="card">
        <h2>Una guía que te acompaña</h2>
        <p>
          El autoexamen es, sobre todo, un momento para <strong>conocer tu cuerpo</strong>.
          No reemplaza a la mamografía, pero te da conciencia mensual de cómo son tus mamas habitualmente —
          y eso es poderoso.
        </p>
        <div className="info-box">
          <strong>¿Cuándo hacerlo?</strong>
          <p>
            Una vez al mes, entre el día 7 y 10 del ciclo (contando desde el primer día de menstruación).
            Si ya no menstruás, elegí un día fijo del mes — el primero, por ejemplo.
          </p>
        </div>
      </section>

      <section className="carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: .25 }}
            className="carousel-step"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Ilustracion tipo={PASOS[idx].ilustracion} />
              <div style={{ flex: 1, minWidth: 220 }}>
                <div className="step-number">0{idx + 1}</div>
                <h3 style={{ margin: '.5rem 0' }}>{PASOS[idx].titulo}</h3>
                <p>{PASOS[idx].detalle}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="carousel-nav">
          <button className="btn btn-ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>
            ← Anterior
          </button>
          <div className="dots">
            {PASOS.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === idx ? 'active' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Paso ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setIdx(Math.min(PASOS.length - 1, idx + 1))}
            disabled={idx === PASOS.length - 1}
          >
            Siguiente →
          </button>
        </div>
      </section>

      <section className="card">
        <h3>Un temporizador que te cuida</h3>
        <p className="soft">Tomate los 5 minutos que merece. Podés hacer el recorrido completo sin mirar el reloj.</p>
        <Timer />
      </section>

      <section className="card">
        <h3>¿Querés que te lo recuerde cada mes?</h3>
        <p className="soft">Descargá un evento para tu calendario — se repite automáticamente el día 8 de cada mes.</p>
        <button className="btn btn-primary" onClick={descargarRecordatorio}>
          📆 Descargar recordatorio mensual
        </button>
      </section>

      <section className="card alerta-box">
        <h3>Cuándo sí consultar</h3>
        <ul>
          {ALERTAS.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
        <p className="soft" style={{ marginTop: '1rem', marginBottom: 0 }}>
          Encontrar algo no significa cáncer — la mayoría de los hallazgos son benignos.
          Pero cualquier cambio nuevo que persiste más de un ciclo merece una consulta, sin miedo.
        </p>
      </section>
    </div>
  )
}

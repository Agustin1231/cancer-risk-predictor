const PASOS = [
  {
    titulo: 'Observá frente al espejo',
    detalle: 'Con los brazos relajados, mirá el tamaño, forma y contorno de ambas mamas. Buscá asimetrías nuevas, hundimientos o cambios en la piel.',
  },
  {
    titulo: 'Levantá los brazos',
    detalle: 'Alzá los brazos por encima de la cabeza. Observá si al moverlos aparecen hoyuelos, pliegues o retracciones en la piel o en el pezón.',
  },
  {
    titulo: 'Revisá el pezón',
    detalle: 'Apretá suavemente cada pezón entre el índice y el pulgar. Fijate si sale líquido (transparente, lechoso, amarillento o con sangre).',
  },
  {
    titulo: 'Palpá acostada',
    detalle: 'Acostate boca arriba con una almohada bajo el hombro del lado que vas a revisar. Con la mano opuesta, usá las yemas de tres dedos.',
  },
  {
    titulo: 'Movimientos circulares',
    detalle: 'Hacé pequeños círculos firmes, recorriendo toda la mama en espiral desde afuera hacia el pezón, o por franjas verticales. Aplicá presión superficial, media y profunda.',
  },
  {
    titulo: 'Incluí la axila',
    detalle: 'Palpá también la axila y la zona por encima de la clavícula. Ahí hay ganglios linfáticos que pueden inflamarse.',
  },
  {
    titulo: 'Repetí del otro lado',
    detalle: 'Hacé exactamente lo mismo con la otra mama. Podés terminar palpando de pie o bajo la ducha con la piel enjabonada — los dedos se deslizan mejor.',
  },
]

const ALERTAS = [
  'Un bulto nuevo, duro, que no se mueve',
  'Cambios en el tamaño o la forma de una mama',
  'Piel con aspecto de cáscara de naranja',
  'Retracción del pezón o la piel',
  'Secreción espontánea por el pezón, sobre todo con sangre',
  'Enrojecimiento o calor persistente',
  'Ganglios palpables en la axila',
]

export default function Autoexamen() {
  return (
    <div className="stack">
      <section className="card">
        <h2>🤲 Guía de autoexamen mamario</h2>
        <p>
          El autoexamen te ayuda a <strong>conocer tu cuerpo</strong> y detectar cambios temprano.
          No reemplaza a la mamografía, pero sí te da conciencia mensual de cómo son tus mamas normalmente.
        </p>
        <div className="info-box">
          <strong>¿Cuándo hacerlo?</strong>
          <p>
            Una vez al mes, entre el día 7 y el 10 del ciclo (contando desde el primer día de menstruación).
            Si ya no menstruás, elegí un día fijo del mes — el primero, por ejemplo.
          </p>
        </div>
      </section>

      <section className="card">
        <h3>Paso a paso</h3>
        <ol className="pasos">
          {PASOS.map((p, i) => (
            <li key={i}>
              <strong>{p.titulo}</strong>
              <p>{p.detalle}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="card alerta-box">
        <h3>⚠️ Señales que sí debés consultar</h3>
        <ul>
          {ALERTAS.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
        <p className="muted">
          Encontrar algo no significa cáncer — la mayoría de los hallazgos son benignos. Pero cualquier cambio nuevo que persiste más de un ciclo menstrual merece una consulta.
        </p>
      </section>
    </div>
  )
}

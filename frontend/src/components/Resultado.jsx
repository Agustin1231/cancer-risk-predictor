import { Link } from 'react-router-dom'
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const COLORES = { Bajo: '#22c55e', Medio: '#eab308', Alto: '#ef4444' }
const IMPACTO_COLOR = {
  protector: '#22c55e',
  neutro: '#94a3b8',
  moderado: '#eab308',
  alto: '#ef4444',
}
const IMPACTO_LABEL = {
  protector: 'Protector',
  neutro: 'Neutro',
  moderado: 'Moderado',
  alto: 'Alto',
}

export default function Resultado({ data, onReset }) {
  const pct = Math.round(data.probabilidad * 100)
  const color = COLORES[data.nivel_riesgo]
  const chart = [{ name: 'riesgo', value: pct, fill: color }]
  const detalles = data.factores_detalle || []
  const plan = data.plan_tamizaje

  return (
    <div className="resultado-wrap">
      <section className="card">
        <h2>Tu resultado</h2>
        <div className="resultado">
          <div className="gauge">
            <ResponsiveContainer width="100%" height={240}>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={chart} startAngle={180} endAngle={0}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="gauge-label">
              <strong style={{ color }}>{data.nivel_riesgo}</strong>
              <span>{pct}%</span>
            </div>
          </div>

          <div>
            <h3>Recomendaciones</h3>
            <ul>{data.recomendaciones.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
        </div>
      </section>

      {detalles.length > 0 && (
        <section className="card">
          <h2>Qué factores pesaron en tu resultado</h2>
          <p className="muted">
            Así contribuyó cada factor de tu evaluación. Los marcados como modificables
            son los que más podés trabajar vos.
          </p>
          <div className="factores">
            {detalles.map((d, i) => (
              <div key={i} className="factor">
                <div className="factor-head">
                  <span className="chip" style={{ background: IMPACTO_COLOR[d.impacto] }}>
                    {IMPACTO_LABEL[d.impacto]}
                  </span>
                  <strong>{d.etiqueta}</strong>
                  {d.modificable && <span className="tag">Modificable</span>}
                </div>
                <p>{d.mensaje}</p>
                {d.tip && <p className="tip">💡 {d.tip}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {plan && (
        <section className="card">
          <h2>Tu plan de tamizaje sugerido</h2>
          <p><strong>Frecuencia:</strong> {plan.frecuencia}</p>
          <p><strong>Próxima acción:</strong> {plan.proxima_accion}</p>
          <p className="muted">{plan.detalle}</p>
        </section>
      )}

      <section className="card cta-modulos">
        <h2>Seguí cuidándote</h2>
        <div className="modulos">
          <Link to="/autoexamen" className="modulo">
            <h3>🤲 Guía de autoexamen</h3>
            <p>7 pasos para hacerte el autoexamen mensual y saber qué buscar.</p>
          </Link>
          <Link to="/plan-cuidado" className="modulo">
            <h3>📅 Plan de cuidado</h3>
            <p>Calendario de controles según tu edad y checklist de hábitos.</p>
          </Link>
        </div>
        <p className="aviso">{data.aviso}</p>
        <button className="btn" onClick={onReset}>Hacer otra evaluación</button>
      </section>
    </div>
  )
}

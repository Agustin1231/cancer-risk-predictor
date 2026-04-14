import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const COLORES = { Bajo: '#22c55e', Medio: '#eab308', Alto: '#ef4444' }

export default function Resultado({ data, onReset }) {
  const pct = Math.round(data.probabilidad * 100)
  const color = COLORES[data.nivel_riesgo]
  const chart = [{ name: 'riesgo', value: pct, fill: color }]

  return (
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
          <p className="aviso">{data.aviso}</p>
          <button className="btn" onClick={onReset}>Hacer otra evaluación</button>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart,
} from 'recharts'
import { Icon } from '../components/Icon.jsx'
import {
  FUENTE, RESUMEN, EVOLUCION, DEPARTAMENTOS, GRUPOS_EDAD, REGIMEN, ESTADIO_DX, SOBREVIDA,
} from '../data/panorama.js'

function descargarDatos(formato) {
  const payload = {
    fuente: FUENTE,
    resumen: RESUMEN,
    evolucion_anual: EVOLUCION,
    departamentos: DEPARTAMENTOS,
    grupos_edad: GRUPOS_EDAD,
    regimen_salud: REGIMEN,
    estadio_diagnostico: ESTADIO_DX,
    sobrevida_5_anios: SOBREVIDA,
  }
  if (formato === 'json') {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    disparar(blob, 'panorama-cancer-mama-colombia.json')
    return
  }
  // CSV: un solo archivo con secciones
  const lineas = []
  lineas.push('# Panorama cancer de mama en Colombia')
  lineas.push(`# Fuentes: ${FUENTE.texto}`)
  lineas.push(`# Actualizado: ${FUENTE.actualizado}`)
  lineas.push('')
  const bloque = (titulo, filas) => {
    lineas.push(`## ${titulo}`)
    if (!filas.length) return
    lineas.push(Object.keys(filas[0]).join(','))
    filas.forEach(r => lineas.push(Object.values(r).join(',')))
    lineas.push('')
  }
  bloque('Resumen', [RESUMEN])
  bloque('Evolucion anual', EVOLUCION)
  bloque('Departamentos', DEPARTAMENTOS)
  bloque('Grupos de edad', GRUPOS_EDAD)
  bloque('Regimen de salud', REGIMEN)
  bloque('Estadio al diagnostico', ESTADIO_DX)
  bloque('Sobrevida 5 anios', SOBREVIDA)
  const blob = new Blob([lineas.join('\n')], { type: 'text/csv;charset=utf-8' })
  disparar(blob, 'panorama-cancer-mama-colombia.csv')
}

function disparar(blob, nombre) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = nombre
  a.click()
  URL.revokeObjectURL(url)
}

const C = {
  primary: '#c2185b',
  primaryLight: '#f8bbd0',
  accent: '#7b5ea7',
  danger: '#b42318',
  warning: '#c27803',
  success: '#4a7c59',
  muted: '#8b7a8e',
  border: '#ede0e2',
}

const PIE_COLORS = [C.primary, C.accent, C.warning, C.success, C.muted]

function Kpi({ titulo, valor, sub, color = C.primary }) {
  return (
    <motion.div
      className="kpi"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="kpi-label">{titulo}</span>
      <span className="kpi-value" style={{ color }}>{valor}</span>
      {sub && <span className="kpi-sub">{sub}</span>}
    </motion.div>
  )
}

function ChartCard({ titulo, subtitulo, children, alto = 280 }) {
  return (
    <section className="card chart-card">
      <div className="chart-head">
        <h3>{titulo}</h3>
        {subtitulo && <p className="soft">{subtitulo}</p>}
      </div>
      <div style={{ width: '100%', height: alto }}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </section>
  )
}

export default function Dashboard() {
  const fmt = (n) => n.toLocaleString('es-CO')

  return (
    <div className="stack">
      <motion.section
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Panorama del cáncer de mama en Colombia</h2>
        <p className="soft">
          Cómo se distribuyen los casos en el país — por año, departamento, grupo de edad,
          régimen de salud y momento del diagnóstico. La detección temprana es lo que más
          cambia el pronóstico.
        </p>
        <div className="fuente-bar">
          <div className="fuente-chip">
            <Icon name="info" size={14} />
            <span>Fuentes: {FUENTE.texto} · Actualizado {FUENTE.actualizado}</span>
          </div>
          <div className="descarga-group">
            <button className="btn btn-sm" onClick={() => descargarDatos('csv')}>
              <Icon name="download" size={14} /> CSV
            </button>
            <button className="btn btn-sm" onClick={() => descargarDatos('json')}>
              <Icon name="download" size={14} /> JSON
            </button>
          </div>
        </div>
      </motion.section>

      <div className="kpis">
        <Kpi titulo="Nuevos casos al año" valor={fmt(RESUMEN.nuevos_casos_anuales)} sub="mujeres diagnosticadas" color={C.primary} />
        <Kpi titulo="Muertes al año" valor={fmt(RESUMEN.muertes_anuales)} sub={`tasa ${RESUMEN.tasa_mortalidad}/100k`} color={C.danger} />
        <Kpi titulo="Edad media al diagnóstico" valor={`${RESUMEN.edad_media_dx} años`} sub="momento más frecuente" color={C.accent} />
        <Kpi titulo="Tasa de incidencia" valor={RESUMEN.tasa_incidencia} sub="casos por 100.000 mujeres" color={C.warning} />
      </div>

      <ChartCard
        titulo="Evolución anual"
        subtitulo="Casos nuevos y muertes por año. La brecha creciente muestra mejoras en detección y tratamiento."
      >
        <AreaChart data={EVOLUCION}>
          <defs>
            <linearGradient id="gCasos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.primary} stopOpacity={0.35} />
              <stop offset="95%" stopColor={C.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gMuertes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.danger} stopOpacity={0.25} />
              <stop offset="95%" stopColor={C.danger} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="anio" stroke={C.muted} />
          <YAxis stroke={C.muted} />
          <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}` }} />
          <Legend />
          <Area type="monotone" dataKey="casos" name="Casos nuevos" stroke={C.primary} fill="url(#gCasos)" strokeWidth={2.5} />
          <Area type="monotone" dataKey="muertes" name="Muertes" stroke={C.danger} fill="url(#gMuertes)" strokeWidth={2.5} />
        </AreaChart>
      </ChartCard>

      <div className="two-col">
        <ChartCard
          titulo="Top 10 departamentos"
          subtitulo="Casos reportados. Los centros urbanos concentran más por densidad poblacional."
          alto={340}
        >
          <BarChart data={DEPARTAMENTOS} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
            <XAxis type="number" stroke={C.muted} />
            <YAxis type="category" dataKey="nombre" stroke={C.muted} width={100} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}` }} />
            <Bar dataKey="casos" fill={C.primary} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard
          titulo="Distribución por grupo de edad"
          subtitulo="El 71% de los casos se diagnostica entre los 40 y 69 años."
          alto={340}
        >
          <BarChart data={GRUPOS_EDAD}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="grupo" stroke={C.muted} />
            <YAxis stroke={C.muted} unit="%" />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}` }} />
            <Bar dataKey="porcentaje" name="% de casos" radius={[6, 6, 0, 0]}>
              {GRUPOS_EDAD.map((_, i) => (
                <Cell key={i} fill={i >= 3 && i <= 4 ? C.primary : C.primaryLight} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>

      <div className="two-col">
        <ChartCard titulo="Por régimen de salud" subtitulo="Mayoría en contributivo y subsidiado." alto={280}>
          <PieChart>
            <Pie
              data={REGIMEN}
              dataKey="valor" nameKey="nombre"
              cx="50%" cy="50%"
              innerRadius={55} outerRadius={95}
              paddingAngle={3}
              label={({ nombre, valor }) => `${nombre}: ${valor}%`}
              labelLine={false}
            >
              {REGIMEN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
          </PieChart>
        </ChartCard>

        <ChartCard titulo="Estadio al diagnóstico" subtitulo="Cuanto más temprano, mejor pronóstico." alto={280}>
          <BarChart data={ESTADIO_DX}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="estadio" stroke={C.muted} tick={{ fontSize: 11 }} />
            <YAxis stroke={C.muted} unit="%" />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}` }} />
            <Bar dataKey="porcentaje" name="% de diagnósticos" radius={[6, 6, 0, 0]}>
              {ESTADIO_DX.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Bar>
          </BarChart>
        </ChartCard>
      </div>

      <ChartCard
        titulo="Sobrevida a 5 años según estadio al diagnóstico"
        subtitulo="Diagnosticar temprano transforma el pronóstico: casi 100% vs 28%."
      >
        <BarChart data={SOBREVIDA} layout="vertical" margin={{ left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
          <XAxis type="number" stroke={C.muted} unit="%" domain={[0, 100]} />
          <YAxis type="category" dataKey="estadio" stroke={C.muted} width={110} />
          <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}` }} />
          <Bar dataKey="anios5" name="Sobrevida a 5 años" radius={[0, 6, 6, 0]}>
            {SOBREVIDA.map((_, i) => (
              <Cell key={i} fill={[C.success, '#7cb342', C.warning, C.danger][i]} />
            ))}
          </Bar>
        </BarChart>
      </ChartCard>

      <motion.section
        className="card insight-card"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <h3>Lo que los datos nos dicen</h3>
        <ul className="insights">
          <li><strong>La detección temprana salva vidas</strong>: el 99% vs 28% de sobrevida a 5 años no es menor — es el argumento para no postergar controles.</li>
          <li><strong>La mayoría de los casos aparecen entre los 40 y 69 años</strong>, coincidiendo con la franja del tamizaje mamográfico rutinario.</li>
          <li><strong>Los casos crecen año a año</strong>, en parte por mejor diagnóstico y envejecimiento poblacional. La tasa de mortalidad crece más lento gracias a tratamientos mejores.</li>
          <li><strong>Cobertura desigual</strong>: las diferencias por departamento y régimen reflejan acceso al sistema, no solo biología.</li>
        </ul>
      </motion.section>

      <p className="soft" style={{ textAlign: 'center', fontSize: '.8rem' }}>
        Los valores son aproximaciones basadas en reportes públicos. Para cifras oficiales más actualizadas, consultá la Cuenta de Alto Costo ({' '}
        <a href="https://cuentadealtocosto.org" target="_blank" rel="noreferrer" style={{ color: C.primary }}>cuentadealtocosto.org</a>
        ) y GLOBOCAN ({' '}
        <a href="https://gco.iarc.fr" target="_blank" rel="noreferrer" style={{ color: C.primary }}>gco.iarc.fr</a>
        ).
      </p>
    </div>
  )
}

const CALENDARIO = [
  {
    rango: 'Menos de 25 años',
    acciones: [
      'Conocer los antecedentes familiares y registrarlos',
      'Iniciar el hábito del autoexamen mensual',
      'Consulta ginecológica anual',
    ],
  },
  {
    rango: '25 a 39 años',
    acciones: [
      'Autoexamen mensual',
      'Examen clínico por profesional cada 1-3 años',
      'Si hay antecedente familiar de primer grado: consulta con mastología para definir tamizaje temprano',
    ],
  },
  {
    rango: '40 a 49 años',
    acciones: [
      'Mamografía cada 1-2 años',
      'Autoexamen mensual + examen clínico anual',
      'Revisar con tu médico si tu densidad mamaria requiere ecografía complementaria',
    ],
  },
  {
    rango: '50 a 74 años',
    acciones: [
      'Mamografía anual — es la franja de mayor beneficio del tamizaje',
      'Examen clínico anual',
      'Mantener hábitos de peso, actividad física y limitar alcohol',
    ],
  },
  {
    rango: '75 años o más',
    acciones: [
      'Decisión individualizada con tu médico según estado de salud',
      'Continuar autoexamen y consulta ante cualquier cambio',
    ],
  },
]

const HABITOS = [
  { tag: 'Movimiento', texto: 'Al menos 150 minutos semanales de actividad moderada (caminar rápido, bici, nadar).' },
  { tag: 'Peso', texto: 'Mantener un IMC bajo 25 — sobre todo después de la menopausia.' },
  { tag: 'Alimentación', texto: 'Más verduras, frutas, legumbres y granos enteros. Menos carnes procesadas.' },
  { tag: 'Alcohol', texto: 'Menos es mejor. Cada trago diario sube el riesgo — ideal no más de 3 por semana.' },
  { tag: 'Tabaco', texto: 'No fumar y evitar el humo de segunda mano.' },
  { tag: 'Lactancia', texto: 'Cuando aplica, amamantar al menos 6 meses reduce el riesgo a largo plazo.' },
  { tag: 'Hormonas', texto: 'Usar terapia hormonal el menor tiempo y dosis posible, siempre con seguimiento médico.' },
  { tag: 'Sueño y estrés', texto: 'Dormir 7-8 horas y manejar el estrés mejora el sistema inmune y hormonal.' },
]

export default function PlanCuidado() {
  return (
    <div className="stack">
      <section className="card">
        <h2>📅 Plan de cuidado</h2>
        <p>
          Un plan claro según tu edad y hábitos que tienen evidencia de reducir el riesgo.
          Usá esto como guía para hablar con tu médico.
        </p>
      </section>

      <section className="card">
        <h3>Calendario de controles según edad</h3>
        <div className="calendario">
          {CALENDARIO.map((c, i) => (
            <div key={i} className="calendario-item">
              <h4>{c.rango}</h4>
              <ul>
                {c.acciones.map((a, j) => <li key={j}>{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>Hábitos que reducen el riesgo</h3>
        <div className="habitos">
          {HABITOS.map((h, i) => (
            <div key={i} className="habito">
              <span className="tag tag-primary">{h.tag}</span>
              <p>{h.texto}</p>
            </div>
          ))}
        </div>
        <p className="muted">
          Ningún hábito elimina el riesgo — pero combinados pueden reducirlo de forma significativa,
          sobre todo los factores modificables (peso, actividad, alcohol, tabaco).
        </p>
      </section>
    </div>
  )
}

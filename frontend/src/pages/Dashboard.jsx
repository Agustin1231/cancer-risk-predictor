export default function Dashboard() {
  const url = import.meta.env.VITE_POWERBI_URL

  return (
    <section className="card">
      <h2>Dashboard epidemiológico</h2>
      <p>Casos de cáncer de mama en Colombia por año, localidad, grupo de edad y régimen de salud (fuente: SIVIGILA / Datos Abiertos).</p>
      {url ? (
        <iframe title="PowerBI" src={url} className="powerbi" allowFullScreen />
      ) : (
        <div className="placeholder">El dashboard se publicará aquí cuando esté disponible en Power BI Service.</div>
      )}
    </section>
  )
}

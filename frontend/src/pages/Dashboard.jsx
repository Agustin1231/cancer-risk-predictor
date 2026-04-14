export default function Dashboard() {
  const url = import.meta.env.VITE_POWERBI_URL

  return (
    <section className="card">
      <h2>Panorama en Colombia</h2>
      <p>
        Cómo se distribuyen los casos de cáncer de mama en el país: por año, localidad, grupo de edad y régimen de salud.
        Los datos vienen de SIVIGILA y Datos Abiertos.
      </p>
      {url ? (
        <iframe title="PowerBI" src={url} className="powerbi" allowFullScreen />
      ) : (
        <div className="placeholder">
          Acá vivirá el dashboard cuando lo tengamos listo. Por ahora, tomate un momento para <strong>conocerte</strong> desde los otros módulos.
        </div>
      )}
    </section>
  )
}

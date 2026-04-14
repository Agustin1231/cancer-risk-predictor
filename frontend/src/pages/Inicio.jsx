import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <section className="hero">
      <h1>Conoce tu riesgo. Actúa a tiempo.</h1>
      <p>
        HealthAI Breast BDI estima tu nivel de riesgo de cáncer de mama a partir de factores
        clínicos y de estilo de vida, usando un modelo entrenado con datos de más de 6 millones
        de mamografías.
      </p>
      <Link to="/evaluacion" className="btn btn-primary">Iniciar evaluación</Link>
    </section>
  )
}

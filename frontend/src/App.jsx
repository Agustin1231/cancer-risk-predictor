import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import Evaluacion from './pages/Evaluacion.jsx'
import Autoexamen from './pages/Autoexamen.jsx'
import PlanCuidado from './pages/PlanCuidado.jsx'
import Dashboard from './pages/Dashboard.jsx'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/evaluacion', label: 'Mi riesgo' },
  { to: '/autoexamen', label: 'Autoexamen' },
  { to: '/plan-cuidado', label: 'Plan de cuidado' },
  { to: '/dashboard', label: 'Panorama' },
]

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="brand">🩺 HealthAI Breast BDI</Link>
        <nav>
          {LINKS.map(l => (
            <Link key={l.to} className={pathname === l.to ? 'active' : ''} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/evaluacion" element={<Evaluacion />} />
          <Route path="/autoexamen" element={<Autoexamen />} />
          <Route path="/plan-cuidado" element={<PlanCuidado />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <footer className="footer">
        ⚠️ Esta herramienta es informativa y preventiva. No reemplaza el diagnóstico médico profesional.
      </footer>
    </div>
  )
}

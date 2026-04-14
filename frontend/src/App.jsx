import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import Evaluacion from './pages/Evaluacion.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="brand">🩺 HealthAI Breast BDI</Link>
        <nav>
          <Link className={pathname === '/' ? 'active' : ''} to="/">Inicio</Link>
          <Link className={pathname === '/evaluacion' ? 'active' : ''} to="/evaluacion">Evaluación</Link>
          <Link className={pathname === '/dashboard' ? 'active' : ''} to="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/evaluacion" element={<Evaluacion />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <footer className="footer">
        ⚠️ Esta herramienta es informativa y preventiva. No reemplaza el diagnóstico médico profesional.
      </footer>
    </div>
  )
}

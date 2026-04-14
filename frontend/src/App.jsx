import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Inicio from './pages/Inicio.jsx'
import Evaluacion from './pages/Evaluacion.jsx'
import Autoexamen from './pages/Autoexamen.jsx'
import PlanCuidado from './pages/PlanCuidado.jsx'
import Dashboard from './pages/Dashboard.jsx'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/evaluacion', label: 'Mi riesgo' },
  { to: '/autoexamen', label: 'Autoexamen' },
  { to: '/plan-cuidado', label: 'Plan' },
  { to: '/dashboard', label: 'Panorama' },
]

function RouteWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: .3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const { pathname } = location

  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="brand">
          <span className="brand-icon">🎀</span>
          <span>HealthAI Breast</span>
        </Link>
        <nav>
          {LINKS.map(l => (
            <Link key={l.to} className={pathname === l.to ? 'active' : ''} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<RouteWrapper><Inicio /></RouteWrapper>} />
            <Route path="/evaluacion" element={<RouteWrapper><Evaluacion /></RouteWrapper>} />
            <Route path="/autoexamen" element={<RouteWrapper><Autoexamen /></RouteWrapper>} />
            <Route path="/plan-cuidado" element={<RouteWrapper><PlanCuidado /></RouteWrapper>} />
            <Route path="/dashboard" element={<RouteWrapper><Dashboard /></RouteWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        Hecho con <em>cuidado</em> · Esta herramienta es informativa y no reemplaza el diagnóstico médico.
      </footer>
    </div>
  )
}

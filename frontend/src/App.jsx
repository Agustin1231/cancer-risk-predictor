import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Inicio from './pages/Inicio.jsx'
import Evaluacion from './pages/Evaluacion.jsx'
import Autoexamen from './pages/Autoexamen.jsx'
import PlanCuidado from './pages/PlanCuidado.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { Icon } from './components/Icon.jsx'

const LINKS = [
  { to: '/', label: 'Mi espacio', icon: 'home' },
  { to: '/evaluacion', label: 'Mi riesgo', icon: 'activity' },
  { to: '/autoexamen', label: 'Autoexamen', icon: 'hand' },
  { to: '/plan-cuidado', label: 'Plan semanal', icon: 'calendar' },
  { to: '/dashboard', label: 'Panorama', icon: 'chart' },
]

function RouteWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .25 }}
    >
      {children}
    </motion.div>
  )
}

function SidebarLinks({ pathname, onNavigate }) {
  return (
    <nav className="side-nav">
      {LINKS.map(l => (
        <Link
          key={l.to}
          to={l.to}
          onClick={onNavigate}
          className={`side-link ${pathname === l.to ? 'active' : ''}`}
        >
          <Icon name={l.icon} size={18} />
          <span>{l.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default function App() {
  const location = useLocation()
  const { pathname } = location
  const [mobileOpen, setMobileOpen] = useState(false)

  const actual = LINKS.find(l => l.to === pathname)?.label || 'HealthAI'

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">
            <Icon name="heart" size={18} />
          </span>
          <div>
            <div className="brand-title">HealthAI</div>
            <div className="brand-sub">Cuidado mamario</div>
          </div>
        </div>
        <SidebarLinks pathname={pathname} />
        <div className="sidebar-foot">
          <div className="foot-card">
            <Icon name="shield" size={16} />
            <span>Tus datos no salen de tu dispositivo.</span>
          </div>
        </div>
      </aside>

      <div className="content">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setMobileOpen(true)} aria-label="Menú">
            <Icon name="menu" size={22} />
          </button>
          <div className="topbar-title">{actual}</div>
          <div className="topbar-right">
            <span className="today">{new Date().toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
          </div>
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
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: 'tween', duration: .25 }}
            >
              <div className="sidebar-brand">
                <span className="brand-icon"><Icon name="heart" size={18} /></span>
                <div>
                  <div className="brand-title">HealthAI</div>
                  <div className="brand-sub">Cuidado mamario</div>
                </div>
              </div>
              <SidebarLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <nav className="bottom-nav">
        {LINKS.slice(0, 4).map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`bottom-link ${pathname === l.to ? 'active' : ''}`}
          >
            <Icon name={l.icon} size={20} />
            <span>{l.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

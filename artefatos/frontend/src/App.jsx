import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

// CSS imports
import './assets/css/design-system.css';
import './assets/css/components.css';
import './assets/css/dashboard.css';
import './assets/css/landing.css';

// Layout
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Paciente
import PacienteDashboard from './pages/paciente/PacienteDashboard';
import PacienteSolicitacoes from './pages/paciente/PacienteSolicitacoes';
import PacienteDetalhes from './pages/paciente/PacienteDetalhes';
import PacienteNotificacoes from './pages/paciente/PacienteNotificacoes';
import PacienteLocais from './pages/paciente/PacienteLocais';
import PacienteAjuda from './pages/paciente/PacienteAjuda';
import PacientePerfil from './pages/paciente/PacientePerfil';

// Médico
import MedicoDashboard from './pages/medico/MedicoDashboard';
import MedicoSolicitacoes from './pages/medico/MedicoSolicitacoes';
import MedicoNovaSolicitacao from './pages/medico/MedicoNovaSolicitacao';
import MedicoHistorico from './pages/medico/MedicoHistorico';
import MedicoAgenda from './pages/medico/MedicoAgenda';
import MedicoPerfil from './pages/medico/MedicoPerfil';

// Gestor
import GestorDashboard from './pages/gestor/GestorDashboard';
import GestorFila from './pages/gestor/GestorFila';
import GestorTransporte from './pages/gestor/GestorTransporte';
import GestorIndicadores from './pages/gestor/GestorIndicadores';
import GestorExportar from './pages/gestor/GestorExportar';
import GestorPerfil from './pages/gestor/GestorPerfil';

// Admin
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminPermissoes from './pages/admin/AdminPermissoes';
import AdminAuditoria from './pages/admin/AdminAuditoria';
import AdminSistema from './pages/admin/AdminSistema';
import AdminPerfil from './pages/admin/AdminPerfil';

// Layout wrapper for dashboard pages
function DashboardLayout({ profile }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Build breadcrumbs from path
  const buildBreadcrumbs = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length <= 1) return [{ label: `${profile.charAt(0).toUpperCase() + profile.slice(1)}` }];
    const labels = {
      'solicitacoes': 'Minhas Solicitações',
      'notificacoes': 'Notificações',
      'locais': 'Locais de Atendimento',
      'ajuda': 'Ajuda',
      'perfil': 'Meu Perfil',
      'detalhes': '#1204',
      'nova-solicitacao': 'Nova Solicitação',
      'historico': 'Histórico Paciente',
      'agenda': 'Agenda',
      'fila': 'Fila de Procedimentos',
      'transporte': 'Transporte Ambulatorial',
      'indicadores': 'Indicadores',
      'exportar': 'Exportar Dados',
      'usuarios': 'Gerenciar Usuários',
      'permissoes': 'Permissões',
      'auditoria': 'Auditoria',
      'sistema': 'Sistema',
    };
    return parts.slice(1).map((p, i) => ({
      label: labels[p] || p,
      to: i < parts.length - 2 ? '/' + parts.slice(0, i + 2).join('/') : undefined,
    }));
  };

  return (
    <>
      <Sidebar profile={profile} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <TopHeader
          profile={profile}
          breadcrumbs={buildBreadcrumbs()}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Paciente */}
        <Route path="/paciente" element={<DashboardLayout profile="paciente" />}>
          <Route index element={<PacienteDashboard />} />
          <Route path="solicitacoes" element={<PacienteSolicitacoes />} />
          <Route path="detalhes" element={<PacienteDetalhes />} />
          <Route path="notificacoes" element={<PacienteNotificacoes />} />
          <Route path="locais" element={<PacienteLocais />} />
          <Route path="ajuda" element={<PacienteAjuda />} />
          <Route path="perfil" element={<PacientePerfil />} />
        </Route>

        {/* Médico */}
        <Route path="/medico" element={<DashboardLayout profile="medico" />}>
          <Route index element={<MedicoDashboard />} />
          <Route path="solicitacoes" element={<MedicoSolicitacoes />} />
          <Route path="nova-solicitacao" element={<MedicoNovaSolicitacao />} />
          <Route path="historico" element={<MedicoHistorico />} />
          <Route path="agenda" element={<MedicoAgenda />} />
          <Route path="perfil" element={<MedicoPerfil />} />
        </Route>

        {/* Gestor */}
        <Route path="/gestor" element={<DashboardLayout profile="gestor" />}>
          <Route index element={<GestorDashboard />} />
          <Route path="fila" element={<GestorFila />} />
          <Route path="transporte" element={<GestorTransporte />} />
          <Route path="indicadores" element={<GestorIndicadores />} />
          <Route path="exportar" element={<GestorExportar />} />
          <Route path="perfil" element={<GestorPerfil />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<DashboardLayout profile="admin" />}>
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="permissoes" element={<AdminPermissoes />} />
          <Route path="auditoria" element={<AdminAuditoria />} />
          <Route path="sistema" element={<AdminSistema />} />
          <Route path="perfil" element={<AdminPerfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

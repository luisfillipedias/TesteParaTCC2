import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { getStats, getNotificacoes, getSolicitacoes } from '../../services/api';

export default function DashboardLayout({ profile, breadcrumbs }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prefetch data once when the layout mounts to populate the cache
  useEffect(() => {
    async function prefetch() {
      try {
        // Parallel fetching for all common endpoints
        await Promise.all([
          getStats(profile),
          getNotificacoes(),
          getSolicitacoes()
        ]);
        console.log("Prefetch complete — Data cached.");
      } catch (e) {
        console.warn("Prefetch failed", e);
      }
    }
    prefetch();
  }, [profile]);

  return (
    <>
      <Sidebar profile={profile} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <TopHeader
          profile={profile}
          breadcrumbs={breadcrumbs}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </>
  );
}

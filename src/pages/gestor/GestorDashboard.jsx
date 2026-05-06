import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getStats, getSolicitacoes } from '../../services/api';

export default function GestorDashboard() {
  const [stats, setStats] = useState({});
  const [fila, setFila] = useState([]);
  const [loading, setLoading] = useState(true);
  const lineRef = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsRes, solRes] = await Promise.allSettled([
          getStats('gestor'),
          getSolicitacoes()
        ]);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value || {});
        if (solRes.status === 'fulfilled') setFila(solRes.value || []);
      } catch (error) {
        console.error("Erro ao carregar dashboard do gestor", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  useEffect(() => {
    if (loading) return;
    let c1, c2;
    import('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js').catch(() => {}).then(() => {
      if (!window.Chart) return;
      if (lineRef.current) c1 = new window.Chart(lineRef.current.getContext('2d'), { type:'line', data:{ labels: stats.chart1Labels || [], datasets:[{label:'Solicitações',data: stats.chart1Data1 || [],borderColor:'#1351B4',backgroundColor:'rgba(19,81,180,0.08)',fill:true,tension:0.4,pointBackgroundColor:'#1351B4',pointRadius:4},{label:'Aprovadas',data: stats.chart1Data2 || [],borderColor:'#268744',backgroundColor:'rgba(38,135,68,0.05)',fill:true,tension:0.4,pointBackgroundColor:'#268744',pointRadius:4}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{usePointStyle:true,padding:16,font:{family:'Raleway',size:12}}}},scales:{y:{beginAtZero:true,grid:{color:'#CCCCCC'}},x:{grid:{display:false}}}}});
      if (pieRef.current) c2 = new window.Chart(pieRef.current.getContext('2d'), { type:'doughnut', data:{ labels: stats.chart2Labels || [], datasets:[{data: stats.chart2Data || [],backgroundColor:['#E52207','#1351B4','#888888'],borderWidth:0,hoverOffset:8}]}, options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'bottom',labels:{usePointStyle:true,padding:16,font:{family:'Raleway',size:12}}}}}});
    });
    return () => { c1?.destroy(); c2?.destroy(); };
  }, [loading, stats]);

  if (loading) {
    return <div style={{padding: 'var(--space-8)', textAlign: 'center'}}>Carregando dashboard...</div>;
  }

  return (
    <>
      <h1 className="page-title">Dashboard de Gestão</h1>
      <p className="page-subtitle">Indicadores e métricas do sistema de regulação.</p>
      <div className="dashboard-grid">
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-users-line"></i></div><div className="stat-label">Total na Fila</div><div className="stat-value">{stats.totalFila || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-check-double"></i></div><div className="stat-label">Atendidos este mês</div><div className="stat-value">{stats.atendidosMes || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-clock"></i></div><div className="stat-label">Tempo Médio de Espera</div><div className="stat-value">{stats.tempoMedio || '0 dias'}</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon blue"><i className="fa-solid fa-ambulance"></i></div><div className="stat-label">Transportes este mês</div><div className="stat-value">{stats.transportesMes || 0}</div></div>
      </div>
      <div className="dashboard-grid-equal">
        <div className="chart-card animate-fade-in-up delay-2">
          <h3><i className="fa-solid fa-chart-line" style={{color:'var(--clr-primary)',marginRight:8}}></i> Solicitações por Mês</h3>
          <div className="chart-wrapper">
            <canvas ref={lineRef}></canvas>
          </div>
        </div>
        <div className="chart-card animate-fade-in-up delay-3">
          <h3><i className="fa-solid fa-chart-pie" style={{color:'var(--clr-secondary)',marginRight:8}}></i> Distribuição por Prioridade</h3>
          <div className="chart-wrapper">
            <canvas ref={pieRef}></canvas>
          </div>
        </div>
      </div>
      <div className="table-container animate-fade-in-up delay-3" style={{marginTop:'var(--space-5)'}}>
        <div className="table-header"><h3><i className="fa-solid fa-list-ol" style={{color:'var(--clr-primary)',marginRight:8}}></i> Fila de Procedimentos — Próximos</h3><Link to="/gestor/fila" className="btn btn-ghost btn-sm">Ver fila completa <i className="fa-solid fa-arrow-right"></i></Link></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>Posição</th><th>Paciente</th><th>Procedimento</th><th>Prioridade</th><th>Status</th><th>Médico</th></tr></thead>
          <tbody>
            {fila.length > 0 ? fila.slice(0, 5).map((r,i) => (
              <tr key={i}>
                <td><strong>#{i + 1}</strong></td>
                <td>{r.paciente}</td>
                <td>{r.procedimento}</td>
                <td><span className={`badge ${r.prioridade==='Alta'?'badge-danger':r.prioridade==='Média'?'badge-info':'badge-secondary'}`}>{r.prioridade}</span></td>
                <td><span className={`badge badge-dot ${r.status==='Aguardando'?'badge-warning':r.status==='Aprovado'?'badge-success':'badge-info'}`}>{r.status}</span></td>
                <td>{r.medico}</td>
              </tr>
            )) : (
              <tr><td colSpan="6" style={{textAlign:'center', color:'var(--clr-text-muted)'}}>Nenhum paciente na fila.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

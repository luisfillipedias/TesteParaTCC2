import { useEffect, useRef, useState } from 'react';
import { getStats } from '../../services/api';

export default function GestorIndicadores() {
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStats('gestor');
        setStats(data || {});
      } catch (error) {
        console.error("Erro ao carregar indicadores", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  useEffect(() => {
    if (loading) return;
    let c1, c2;
    import('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js').catch(() => {}).then(() => {
      if (!window.Chart) return;
      if (barRef.current) c1 = new window.Chart(barRef.current.getContext('2d'), { type:'bar', data:{ labels: stats.espLabels || [], datasets:[{label:'Atendimentos',data: stats.espData || [],backgroundColor:['#0D6B3F','#1A73B5','#FF6B35','#8B5CF6','#EC4899','#14B8A6'],borderRadius:6}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:'#E2E8F0'}},x:{grid:{display:false}}}}});
      if (lineRef.current) c2 = new window.Chart(lineRef.current.getContext('2d'), { type:'line', data:{ labels: stats.tempoLabels || [], datasets:[{label:'Dias',data: stats.tempoData || [],borderColor:'#1A73B5',backgroundColor:'rgba(26,115,181,0.08)',fill:true,tension:0.4,pointRadius:5,pointBackgroundColor:'#1A73B5'}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:'#E2E8F0'}},x:{grid:{display:false}}}}});
    });
    return () => { c1?.destroy(); c2?.destroy(); };
  }, [loading, stats]);

  return (
    <>
      <h1 className="page-title">Indicadores de Saúde</h1>
      <p className="page-subtitle">Métricas e indicadores regionais do sistema de regulação.</p>
      <div className="dashboard-grid" style={{marginBottom:'var(--space-6)'}}>
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-percent"></i></div><div className="stat-label">Taxa de Atendimento</div><div className="stat-value">{stats.taxaAtendimento || '0%'}</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-clock"></i></div><div className="stat-label">Tempo Médio (dias)</div><div className="stat-value">{stats.tempoMedio || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-ban"></i></div><div className="stat-label">Taxa de Cancelamento</div><div className="stat-value">{stats.taxaCancelamento || '0%'}</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon red"><i className="fa-solid fa-triangle-exclamation"></i></div><div className="stat-label">Fila Alta Prioridade</div><div className="stat-value">{stats.filaAltaPrioridade || 0}</div></div>
      </div>
      <div className="dashboard-grid-equal">
        <div className="chart-card animate-fade-in-up delay-2">
          <h3><i className="fa-solid fa-chart-bar" style={{color:'var(--clr-primary)',marginRight:8}}></i> Atendimentos por Especialidade</h3>
          <div className="chart-wrapper">
            {loading ? <div style={{textAlign:'center', color:'var(--clr-text-muted)', paddingTop:'var(--space-8)'}}>Carregando gráfico...</div> : <canvas ref={barRef}></canvas>}
          </div>
        </div>
        <div className="chart-card animate-fade-in-up delay-3">
          <h3><i className="fa-solid fa-chart-line" style={{color:'var(--clr-secondary)',marginRight:8}}></i> Evolução do Tempo de Espera</h3>
          <div className="chart-wrapper">
            {loading ? <div style={{textAlign:'center', color:'var(--clr-text-muted)', paddingTop:'var(--space-8)'}}>Carregando gráfico...</div> : <canvas ref={lineRef}></canvas>}
          </div>
        </div>
      </div>
    </>
  );
}

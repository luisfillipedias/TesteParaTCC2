import { Link } from 'react-router-dom';
import { MOCK } from '../../data/mockData';
import { useEffect, useRef } from 'react';

export default function GestorDashboard() {
  const s = MOCK.stats.gestor;
  const lineRef = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    let c1, c2;
    import('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js').catch(() => {}).then(() => {
      if (!window.Chart || !lineRef.current) return;
      c1 = new window.Chart(lineRef.current.getContext('2d'), { type:'line', data:{ labels:['Jan','Fev','Mar','Abr','Mai'], datasets:[{label:'Solicitações',data:[65,78,90,81,89],borderColor:'#0D6B3F',backgroundColor:'rgba(13,107,63,0.08)',fill:true,tension:0.4,pointBackgroundColor:'#0D6B3F',pointRadius:4},{label:'Aprovadas',data:[50,60,72,68,75],borderColor:'#1A73B5',backgroundColor:'rgba(26,115,181,0.05)',fill:true,tension:0.4,pointBackgroundColor:'#1A73B5',pointRadius:4}]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{usePointStyle:true,padding:16,font:{family:'Inter',size:12}}}},scales:{y:{beginAtZero:true,grid:{color:'#E2E8F0'}},x:{grid:{display:false}}}}});
      c2 = new window.Chart(pieRef.current.getContext('2d'), { type:'doughnut', data:{ labels:['Alta','Média','Baixa'], datasets:[{data:[42,68,46],backgroundColor:['#DC3545','#3B82F6','#94A3B8'],borderWidth:0,hoverOffset:8}]}, options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'bottom',labels:{usePointStyle:true,padding:16,font:{family:'Inter',size:12}}}}}});
    });
    return () => { c1?.destroy(); c2?.destroy(); };
  }, []);

  return (
    <>
      <h1 className="page-title">Dashboard de Gestão</h1>
      <p className="page-subtitle">Indicadores e métricas do sistema de regulação.</p>
      <div className="dashboard-grid">
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-users-line"></i></div><div className="stat-label">Total na Fila</div><div className="stat-value">{s.totalFila}</div><div className="stat-change down"><i className="fa-solid fa-arrow-down"></i> -8% vs. mês anterior</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-check-double"></i></div><div className="stat-label">Atendidos este mês</div><div className="stat-value">{s.atendidosMes}</div><div className="stat-change up"><i className="fa-solid fa-arrow-up"></i> +15% vs. mês anterior</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-clock"></i></div><div className="stat-label">Tempo Médio de Espera</div><div className="stat-value">{s.tempoMedio}</div><div className="stat-change up"><i className="fa-solid fa-arrow-down"></i> -3 dias vs. anterior</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon blue"><i className="fa-solid fa-ambulance"></i></div><div className="stat-label">Transportes este mês</div><div className="stat-value">{s.transportesMes}</div><div className="stat-change up"><i className="fa-solid fa-arrow-up"></i> +22% vs. mês anterior</div></div>
      </div>
      <div className="dashboard-grid-equal">
        <div className="chart-card animate-fade-in-up delay-2"><h3><i className="fa-solid fa-chart-line" style={{color:'var(--clr-primary)',marginRight:8}}></i> Solicitações por Mês</h3><div className="chart-wrapper"><canvas ref={lineRef}></canvas></div></div>
        <div className="chart-card animate-fade-in-up delay-3"><h3><i className="fa-solid fa-chart-pie" style={{color:'var(--clr-secondary)',marginRight:8}}></i> Distribuição por Prioridade</h3><div className="chart-wrapper"><canvas ref={pieRef}></canvas></div></div>
      </div>
      <div className="table-container animate-fade-in-up delay-3" style={{marginTop:'var(--space-5)'}}>
        <div className="table-header"><h3><i className="fa-solid fa-list-ol" style={{color:'var(--clr-primary)',marginRight:8}}></i> Fila de Procedimentos — Próximos</h3><Link to="/gestor/fila" className="btn btn-ghost btn-sm">Ver fila completa <i className="fa-solid fa-arrow-right"></i></Link></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>Posição</th><th>Paciente</th><th>Procedimento</th><th>Prioridade</th><th>Status</th><th>Médico</th><th>Dias na fila</th></tr></thead>
          <tbody>
            {[{p:'#1',n:'Maria da Silva',pr:'Consulta Cardiologia',pri:'Alta',st:'Aguardando',m:'Dr. Carlos Andrade',d:3},{p:'#2',n:'Carlos Lima',pr:'Consulta Neurologia',pri:'Alta',st:'Aprovado',m:'Dr. Paulo Reis',d:10},{p:'#3',n:'Fernanda Oliveira',pr:'Tomografia',pri:'Alta',st:'Em Andamento',m:'Dr. Paulo Reis',d:23},{p:'#4',n:'João Pereira',pr:'Cirurgia Ortopédica',pri:'Média',st:'Aprovado',m:'Dra. Ana Costa',d:6},{p:'#5',n:'Rodrigo Alves',pr:'Consulta Pneumologia',pri:'Média',st:'Aprovado',m:'Dr. Carlos Andrade',d:20}].map((r,i) => (
              <tr key={i}><td><strong>{r.p}</strong></td><td>{r.n}</td><td>{r.pr}</td><td><span className={`badge ${r.pri==='Alta'?'badge-danger':'badge-info'}`}>{r.pri}</span></td><td><span className={`badge badge-dot ${r.st==='Aguardando'?'badge-warning':r.st==='Aprovado'?'badge-success':'badge-info'}`}>{r.st}</span></td><td>{r.m}</td><td>{r.d}</td></tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

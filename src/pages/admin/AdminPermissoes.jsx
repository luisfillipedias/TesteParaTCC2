import { useState, useEffect } from 'react';
import { getPermissoes, updatePermissao } from '../../services/api';

export default function AdminPermissoes() {
  const [data, setData] = useState({ perfis: [], permissoes: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);

  useEffect(() => {
    loadPermissoes();
  }, []);

  async function loadPermissoes() {
    setLoading(true);
    try {
      const result = await getPermissoes();
      setData(result);
    } catch (error) {
      console.error('Erro ao carregar permissões:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(funcionalidade, perfil, currentValue) {
    const key = `${funcionalidade}-${perfil}`;
    setSaving(key);
    try {
      await updatePermissao(funcionalidade, perfil, !currentValue);
      // Update local state
      setData(prev => ({
        ...prev,
        permissoes: prev.permissoes.map(p => {
          if (p.funcionalidade !== funcionalidade) return p;
          return {
            ...p,
            permissoes: p.permissoes.map(pp =>
              pp.perfil === perfil ? { ...pp, permitido: !currentValue } : pp
            )
          };
        })
      }));
    } catch (error) {
      alert('❌ Erro ao atualizar permissão: ' + error.message);
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <>
        <h1 className="page-title">Permissões por Perfil</h1>
        <p className="page-subtitle">Configuração de acesso e funcionalidades por tipo de usuário.</p>
        <div style={{padding: 'var(--space-8)', textAlign: 'center', color: 'var(--clr-text-muted)'}}>
          Carregando permissões...
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">Permissões por Perfil</h1>
      <p className="page-subtitle">Configuração de acesso e funcionalidades por tipo de usuário. Clique para alterar.</p>
      <div className="table-container animate-fade-in-up">
        <div style={{overflowX:'auto'}}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Funcionalidade</th>
              {data.perfis.map(p => <th key={p} style={{textAlign:'center'}}>{p === 'Gestor Municipal' ? 'Gestor Mun.' : p === 'Gestor Estadual' ? 'Gestor Est.' : p}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.permissoes.map((perm) => (
              <tr key={perm.funcionalidade}>
                <td><strong>{perm.funcionalidade}</strong></td>
                {perm.permissoes.map((pp) => {
                  const key = `${perm.funcionalidade}-${pp.perfil}`;
                  const isSaving = saving === key;
                  return (
                    <td key={pp.perfil} style={{textAlign:'center'}}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleToggle(perm.funcionalidade, pp.perfil, pp.permitido)}
                        disabled={isSaving}
                        style={{
                          cursor: 'pointer',
                          opacity: isSaving ? 0.5 : 1,
                          transition: 'all 0.2s ease',
                          minWidth: 36,
                        }}
                        title={pp.permitido ? 'Clique para revogar' : 'Clique para permitir'}
                      >
                        {pp.permitido ? (
                          <i className="fa-solid fa-check" style={{color:'var(--clr-success)', fontSize:'1.1rem'}}></i>
                        ) : (
                          <i className="fa-solid fa-xmark" style={{color:'var(--clr-danger)', fontSize:'1.1rem'}}></i>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import './App.css';

import Associacoes from './pages/associacoes';
import Fornecedores from './pages/fornecedores';
import Produtos from './pages/produtos';

import { ChevronDown, Link as LinkIcon, Package, Truck, UserRound } from "lucide-react";

function App() {
  const [page, setPage] = useState('produtos');

  return (
    <div className="layout-app">

      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icone">
            <Package size={26} />
          </span>
          <span>EstoquePro</span>
    </div>

    <nav className="sidebar-menu">
      <button
        className={page === 'produtos' ? 'active' : ''}
        onClick={() => setPage('produtos')}
        type="button"
      >
          <Package size={20}/>
          <span>Produtos</span>
      </button>

      <button
        className={page === 'fornecedores' ? 'active' : ''}
        onClick={() => setPage('fornecedores')}
        type="button"
      >
        <Truck size={20} />
        <span>Fornecedores</span>
      </button>

      <button
        className={page === 'associacoes' ? 'active' : ''}
        onClick={() => setPage('associacoes')}
        type="button"
      >
        <LinkIcon size={20}/>
        <span>Associações</span>
      </button>
    </nav>

    <div className="sidebar-rodape">
      Sistema de Controle de Estoque - 2026
    </div>
  </aside>

  <div className="conteudo-app">
    <header className="barra-superior">
      <div className="perfil-usuario">
        <div className="avatar-usuario">
          <UserRound size={22} />
        </div>

        <div className="dados-usuario">
          <span className="usuario">Administrador</span>
          <small>Perfil de acesso</small>
        </div>

        <ChevronDown size={16} className="seta-perfil" />
      </div>
    </header>

    <main className="pagina-conteudo">
      {page === 'produtos' && <Produtos />}
      {page === 'fornecedores' && <Fornecedores />}
      {page === 'associacoes' && <Associacoes />}
    </main>
  </div>
</div>
  );
}

export default App;
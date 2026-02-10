import React from 'react';
import { Link } from 'react-router-dom';

const ThirdPartyMenu = () => (
  <nav>
    <ul>
      <li><Link to="/third-party/portal">Portal do Fornecedor</Link></li>
      <li><Link to="/third-party/upload">Upload de Documentos com IA (OCR)</Link></li>
      <li><Link to="/third-party/manager">Painel do Gestor de Terceiros</Link></li>
      <li><Link to="/third-party/access-control">Integração com Portaria</Link></li>
      <li><Link to="/third-party/access-history">Histórico de Acessos Bloqueados</Link></li>
    </ul>
  </nav>
);

export default ThirdPartyMenu;

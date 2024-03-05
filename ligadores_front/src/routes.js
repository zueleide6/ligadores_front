// src/Routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmpresaTable from './EmpresaTable'; // Ajuste o caminho conforme necessário
import EmpresaDetalhes from './EmpresaDetalhe'; // Novo componente de detalhes da empresa

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmpresaTable />} />
        <Route path="/empresa/:cnpj" element={<EmpresaDetalhes />} /> {/* Nova rota para detalhes da empresa */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;

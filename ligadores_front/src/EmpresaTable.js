import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usado para navegação

function EmpresaTable() {
  const [empresas, setEmpresas] = useState([]);
  const [banco, setBanco] = useState(''); // Estado para armazenar o banco selecionado

  const bancos = ['Itau', 'BB'];


  const [currentPage, setCurrentPage] = useState(1);
  const [empresasPerPage, setEmpresasPerPage] = useState(25); // Você pode ajustar esse número
  const [statusFilter, setStatusFilter] = useState('');
  const [scoreFilter, setScoreFilter] = useState('');
  
  const navigate = useNavigate(); // Hook para navegar programaticamente

  const indexOfLastEmpresa = currentPage * empresasPerPage;
  const indexOfFirstEmpresa = indexOfLastEmpresa - empresasPerPage;


  const currentEmpresas = empresas
  .filter(empresa => {
    // Garante que status não seja undefined antes de chamar includes
    const statusCondition = empresa.atendimentos.status ? empresa.atendimentos.status.includes(statusFilter) : false;
    console.log("Empresa.atendimento"+empresa.atendimentos)
    let scoreCondition = true; // Assume true by default
    
    switch (scoreFilter) {
      case "<25":
        scoreCondition = empresa.atendimentos.score < 25;
        break;
      case "25-50":
        scoreCondition = empresa.atendimentos.score >= 25 && empresa.atendimentos.score <= 50;
        break;
      case "51-70":
        scoreCondition = empresa.atendimentos.score >= 51 && empresa.atendimentos.score <= 70;
        break;
      case ">70":
        scoreCondition = empresa.atendimentos.score > 70;
        break;
      default:
        // Mantém scoreCondition true para "Todos"
        break;
    }

    return statusCondition && scoreCondition;
  })
  .slice(indexOfFirstEmpresa, indexOfLastEmpresa);


  // Função para navegar até a página de detalhes da empresa
  const handleRowClick = (cnpj) => {
    navigate(`/empresa/${cnpj}`); // Ajuste a rota conforme necessário
  };

  useEffect(() => {
    // Atualizada para incluir filtro de banco
    const fetchEmpresas = async () => {
      const { data } = await axios.get('https://coral-app-7ytww.ondigitalocean.app/empresa');
      setEmpresas(data);
    };

    fetchEmpresas();
  }, [banco]);

  const handleBancoChange = (event) => {
    setBanco(event.target.value);
  };

  return (
    <div className="container mx-auto">
           <div className="mb-4">
        <label htmlFor="bancoSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Selecione o banco:</label>
        <select
          id="bancoSelect"
          value={banco}
          onChange={handleBancoChange}
          className="bg-stone-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
        >
          <option value="">Todos</option>
     {bancos.map((banco) => (
            <option key={banco} value={banco}>{banco}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 mb-4">
        <div>
          <label htmlFor="statusFilter">Filtrar por Status</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos</option>
            <option value="Pendente">Pendente</option>
            <option value="Retornar">Retornar</option>
            <option value="Encaminhado">Encaminhado</option>
            <option value="Sucesso">Sucesso</option>
            <option value="Perdido">Perdido</option>
            <option value="Cadastro Incorreto">Cadastro Incorreto</option>
            <option value="Não Possui Conta">Não Possui Conta</option>
          </select>

        </div>
        <div>
          <label htmlFor="scoreFilter">Filtrar por Score</label>
          <select
            id="scoreFilter"
            value={scoreFilter}
            onChange={e => setScoreFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos</option>
            <option value="<25">25-</option>
            <option value="25-50">26-50</option>
            <option value="51-70">51-70</option>
            <option value=">70">70+</option>
          </select>
        </div>
      </div>
      <table className="w-full table-auto text-sm text-left text-gray-900">
        <thead className="text-xs text-gray-900 uppercase bg-stone-500 bg-gray-300 ">
          <tr>
            <th scope="col" className="py-3 px-6">Banco</th>
            <th scope="col" className="py-3 px-6">Nome Fantasia</th>
            <th scope="col" className="py-3 px-6">CNPJ</th>
            <th scope="col" className="py-3 px-6">Capital Social</th>
            <th scope="col" className="py-3 px-6">Email</th>
            <th scope="col" className="py-3 px-6">Telefones</th>
            <th scope="col" className="py-3 px-6">Status</th>
            <th scope="col" className="py-3 px-6">Score</th>
          </tr>
        </thead>
        <tbody>
          {console.log("Empresas:"+empresas) && empresas.map((empresa) => (
            <tr
              key={empresa.cnpj}
              className="text-gray-900 bg-white border-b even:bg-stone-200 odd:bg-stone-50  dark:hover:bg-sky-300 cursor-pointer"
              onClick={() => handleRowClick(empresa.cnpj)}
            >
              <td className="py-4 px-6">{empresa.banco}</td>
              <td className="py-4 px-6">{empresa.nomeFantasia}</td>
              <td className="py-4 px-6">{empresa.cnpj}</td>
              <td className="py-4 px-6">{empresa.capSocial}</td>
              <td className="py-4 px-6">{empresa.email}</td>
              <td className="py-4 px-6">{empresa.telefones}</td>
              <td className="py-4 px-6">{empresa.atendimentos?.status ?? 'Não Disponível'}</td>
              <td className="py-4 px-6">{empresa.atendimentos?.score ?? 'Não Disponível'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-2">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          Nº de registros: {empresas.length}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentEmpresas.length < empresasPerPage}
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmpresaTable;

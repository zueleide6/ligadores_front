import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usado para navegação

function EmpresaTable() {
  const [empresas, setEmpresas] = useState([]);
  const [banco, setBanco] = useState(''); // Estado para armazenar o banco selecionado
  const [bancos, setBancos] = useState([]); // Estado para a lista de bancos

  const navigate = useNavigate(); // Hook para navegar programaticamente

  useEffect(() => {
    const fetchEmpresas = async () => {
      const { data } = await axios.get('https://coral-app-7ytww.ondigitalocean.app/empresa'); // Ajuste a URL conforme necessário
      setEmpresas(data);
    };

    fetchEmpresas();
  }, []);

  // Função para navegar até a página de detalhes da empresa
  const handleRowClick = (cnpj) => {
    navigate(`/empresa/${empresaId}`); // Ajuste a rota conforme necessário
  };

  useEffect(() => {
    // Função para buscar bancos disponíveis
    const fetchBancos = async () => {
      const { data: bancosDisponiveis } = await axios.get('https://coral-app-7ytww.ondigitalocean.app/empresa/bancos');
      setBancos(bancosDisponiveis);
    };

    fetchBancos();
  }, []);

  useEffect(() => {
    // Atualizada para incluir filtro de banco
    const fetchEmpresas = async () => {
      const { data } = await axios.get(`https://coral-app-7ytww.ondigitalocean.app/empresa?banco=${banco}`);
      setEmpresas(data);
    };

    fetchEmpresas();
  }, [banco]);

  const handleBancoChange = (event) => {
    setBanco(event.target.value);
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
           <div className="mb-4">
        <label htmlFor="bancoSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Selecione o banco:</label>
        <select
          id="bancoSelect"
          value={banco}
          onChange={handleBancoChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Todos</option>
          {bancos.map((banco) => (
            <option key={banco} value={banco}>{banco}</option>
          ))}
        </select>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {empresas.map((empresa) => (
            <tr
              key={empresa.cnpj}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleRowClick(empresa.cnpj)}
            >
              <td className="py-4 px-6">{empresa.banco}</td>
              <td className="py-4 px-6">{empresa.nomeFantasia}</td>
              <td className="py-4 px-6">{empresa.cnpj}</td>
              <td className="py-4 px-6">{empresa.capSocial}</td>
              <td className="py-4 px-6">{empresa.email}</td>
              <td className="py-4 px-6">{empresa.telefones}</td>
              <td className="py-4 px-6">{empresa.status}</td>
              <td className="py-4 px-6">{empresa.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmpresaTable;

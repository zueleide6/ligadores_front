// EmpresaDetalhe.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Usaremos para capturar o ID/CNPJ da empresa da URL
import AtendimentoModal from './AtendimentoModal'; // Componente do modal para adicionar novo atendimento

function EmpresaDetalhe() {
    const [empresa, setEmpresa] = useState(null);
    const [atendimentos, setAtendimentos] = useState([]);
    const { cnpj } = useParams(); // Captura o CNPJ da URL
    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchData = async () => {
        const empresaRes = await axios.get(`https://coral-app-7ytww.ondigitalocean.app/empresa/${cnpj}`);
        setEmpresa(empresaRes.data);
        const atendimentoRes = await axios.get(`https://coral-app-7ytww.ondigitalocean.app/empresa/${cnpj}/atendimento`);
        //const atendimentoRes = await axios.get(`http://localhost:3333/empresa/${cnpj}/atendimento`);
        setAtendimentos(atendimentoRes.data);
    };

    useEffect(() => {
       
        fetchData();
    }, [cnpj]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className='mx-auto max-w-7xl py-12 sm:px-6 lg:px-8 bg-stone-200 '>
        <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Detalhe da Empresa</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Informações obtidas automaticamente</p>
        </div>
        {empresa && (
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                <div className=" px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-lg font-medium leading-6 text-gray-900">Banco</dt>
                    <dd className="mt-1 text-lg  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.banco}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nome Fantasia</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.razaoSocial}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">CNPJ</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.cnpj}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Data Abertura</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.abertura}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Porte</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.porte}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Natureza Jurídica</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.natJuridica}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Capital Social</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.capSocial}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Tipo</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.tipo}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Situação</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.situacao}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.email}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Telefones</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.telefones}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Município</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.municipio}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Estado</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.estado}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Atividade Principal</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.atividadePrincipal}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Quadro Societário</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{empresa.quadroSocietario.split('/').map((item, index) => (
  <React.Fragment key={index}>
    {item}
    <br />
  </React.Fragment>
))}</dd>
                </div>


                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Atendimentos</dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {atendimentos.length > 0 ?  atendimentos.map((atendimento) =>  (
                        <div className='divide-x divide-blue-600' >
                            <li key={atendimento._id} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                        <span className="truncate font-medium">{atendimento.data}</span>
                                        <span className="truncate font-medium">Status: {atendimento.status}</span>
                                        <span className="flex-shrink-0 text-gray-400">Score: {atendimento.score}</span>
                                        </div>  
                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="ml-4 flex-shrink-0">
                                    <span className="flex-shrink-0 text-gray-400">{atendimento.Anotacao}</span>
                                </div>
                            </li>
                        </div>
   
                    )): (
                        <p>Nenhum atendimento encontrado.</p>
                      )}
                    </dd>
                    <button onClick={handleOpenModal}>Adicionar Atendimento</button>
                    <AtendimentoModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
       
                    />
                </div>
                </dl>
            </div>          
        )}
        
        
    </div>
    );
}

export default EmpresaDetalhe;


//<AtendimentoModal empresaId={empresa._id} onAtendimentoAdded={() => fetchData()} />

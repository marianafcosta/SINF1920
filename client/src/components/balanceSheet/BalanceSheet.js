import React, { useState, useEffect } from 'react';

import CustomCard from '../CustomCard/CustomCard';
import TableCard from '../TableCard';

import { fetchAccountBalanceSheet } from '../../services/financialService';

const accountNames = [
  ['11', 'Caixa'],
  ['12', 'Depósitos à Ordem'],
  ['21', 'Contas a Receber de Clientes'],
  ['22', 'Contas a Pagar a Fornecedores'],
  ['24', 'Estado e Outros Entes Públicos'],
  ['31', 'Compras'],
  ['32', 'Mercadorias em Armazém / Trânsito'],
  ['36', 'Produtos e Trabalhos em Curso'],
  ['61', 'Custo das Mercadorias Vendidas'],
  ['62', 'Fornecimentos e Serviços Externos'],
  ['71', 'Vendas'],
  ['72', 'Prestações de Serviços'],
];

const headers = [
  { name: 'id', label: 'Account' },
  { name: 'description', label: 'Name' },
  { name: 'debit', label: 'Debit' },
  { name: 'credit', label: 'Credit' },
];

const BalanceSheet = () => {
  const [accountBalance, setAccountBalance] = useState(null);
  const [tableData, setTableData] = useState([]);

  const updateTable = () => {
    if (accountBalance) {
      setTableData([
        ...tableData,
        {
          id: accountBalance.id[0],
          description: accountBalance.id[1],
          debit: accountBalance.res.totalDebit,
          credit: accountBalance.res.totalCredit,
        },
      ]);
    }
  };

  const fetchData = async account => {
    const balance = await fetchAccountBalanceSheet(account[0]);
    setAccountBalance({
      id: account,
      res: balance.data,
    });
  };

  useEffect(() => {
    accountNames.forEach(account => {
      fetchData(account);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateTable();
    // eslint-disable-next-line
  }, [accountBalance]);

  return (
    <CustomCard title="Balance Sheet" overlay="Testing">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

export default BalanceSheet;

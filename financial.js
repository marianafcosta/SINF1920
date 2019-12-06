/* eslint-disable radix */
/* eslint-disable eqeqeq */

const processTransactionLines = (lines, accountId) => {
  const totalTransactionValues = {
    totalCredit: 0,
    totalDebit: 0,
  };
  if (lines.CreditLine) {
    if (Array.isArray(lines.CreditLine)) {
      lines.CreditLine.forEach(credit => {
        if (credit.AccountID == accountId) {
          totalTransactionValues.totalCredit += parseFloat(credit.CreditAmount);
        }
      });
    } else if (lines.CreditLine.AccountID == accountId) {
      totalTransactionValues.totalCredit += parseFloat(
        lines.CreditLine.CreditAmount,
      );
    }
  }

  if (lines.DebitLine) {
    if (Array.isArray(lines.DebitLine)) {
      lines.DebitLine.forEach(debit => {
        if (debit.AccountID == accountId) {
          totalTransactionValues.totalDebit += parseFloat(debit.DebitAmount);
        }
      });
    } else if (lines.DebitLine.AccountID == accountId) {
      totalTransactionValues.totalDebit += parseFloat(
        lines.DebitLine.DebitAmount,
      );
    }
  }

  return totalTransactionValues;
};

const processTransactions = (transactions, accountId, year, monthly) => {
  const totalJournalValues = {
    totalCredit: monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
    totalDebit: monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
  };

  let currentTransaction;
  if (Array.isArray(transactions)) {
    transactions.forEach(transaction => {
      if (
        transaction.Lines &&
        year === new Date(transaction.TransactionDate).getFullYear()
      ) {
        currentTransaction = processTransactionLines(
          transaction.Lines,
          accountId,
        );
        if (monthly) {
          totalJournalValues.totalCredit[
            Math.min(parseInt(transaction.Period), 12) - 1
          ] =
            totalJournalValues.totalCredit[
              Math.min(parseInt(transaction.Period), 12) - 1
            ] + currentTransaction.totalCredit;
          totalJournalValues.totalDebit[
            Math.min(parseInt(transaction.Period), 12) - 1
          ] =
            totalJournalValues.totalDebit[
              Math.min(parseInt(transaction.Period), 12) - 1
            ] + currentTransaction.totalDebit;
        } else {
          totalJournalValues.totalCredit += currentTransaction.totalCredit;
          totalJournalValues.totalDebit += currentTransaction.totalDebit;
        }
      }
    });
  } else if (
    transactions.Lines &&
    year === new Date(transactions.TransactionDate).getFullYear()
  ) {
    currentTransaction = processTransactionLines(transactions.Lines, accountId);
    if (monthly) {
      totalJournalValues.totalCredit[
        Math.min(parseInt(transactions.Period), 12) - 1
      ] =
        totalJournalValues.totalCredit[
          Math.min(parseInt(transactions.Period), 12) - 1
        ] + currentTransaction.totalCredit;
      totalJournalValues.totalDebit[
        Math.min(parseInt(transactions.Period), 12) - 1
      ] =
        totalJournalValues.totalDebit[
          Math.min(parseInt(transactions.Period), 12) - 1
        ] + currentTransaction.totalDebit;
    } else {
      totalJournalValues.totalCredit += currentTransaction.totalCredit;
      totalJournalValues.totalDebit += currentTransaction.totalDebit;
    }
  }

  return totalJournalValues;
};

const processJournalEntries = (entries, accountId, year, monthly) => {
  const totalLedgerValues = {
    totalCredit: monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
    totalDebit: monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
  };

  let currentJournal;
  if (Array.isArray(entries)) {
    entries.forEach(entry => {
      if (entry.Transaction) {
        currentJournal = processTransactions(
          entry.Transaction,
          accountId,
          year,
          monthly,
        );
        totalLedgerValues.totalCredit = monthly
          ? totalLedgerValues.totalCredit.map((ledger, index) => {
              return currentJournal.totalCredit[index] + ledger;
            })
          : (totalLedgerValues.totalCredit += currentJournal.totalCredit);
        totalLedgerValues.totalDebit = monthly
          ? totalLedgerValues.totalDebit.map((ledger, index) => {
              return currentJournal.totalDebit[index] + ledger;
            })
          : (totalLedgerValues.totalDebit += currentJournal.totalDebit);
      }
    });
  } else if (entries.Transaction) {
    currentJournal = processTransactions(
      entries.Transaction,
      accountId,
      year,
      monthly,
    );
    totalLedgerValues.totalCredit = monthly
      ? totalLedgerValues.totalCredit.map((ledger, index) => {
          return currentJournal.totalCredit[index] + ledger;
        })
      : (totalLedgerValues.totalCredit += currentJournal.totalCredit);
    totalLedgerValues.totalDebit = monthly
      ? totalLedgerValues.totalDebit.map((ledger, index) => {
          return currentJournal.totalDebit[index] + ledger;
        })
      : (totalLedgerValues.totalDebit += currentJournal.totalDebit);
  }

  return totalLedgerValues;
};

const processAccounts = (accounts, accountId) => {
  const totalBalance = {
    totalCredit: 0,
    totalDebit: 0,
    total: 0,
  };

  if (Array.isArray(accounts)) {
    accounts.forEach(account => {
      if (account.AccountID == accountId) {
        totalBalance.totalDebit =
          account.ClosingDebitBalance - account.OpeningDebitBalance;
        totalBalance.totalCredit =
          account.ClosingCreditBalance - account.OpeningCreditBalance;
        const total = totalBalance.totalDebit - totalBalance.totalCredit;
        if (total > 0) {
          totalBalance.totalDebit = parseFloat(total).toFixed(2);
          totalBalance.totalCredit = 0;
        } else {
          totalBalance.totalDebit = 0;
          totalBalance.totalCredit = parseFloat(-total).toFixed(2);
        }
      }
    });
  } else {
    const accountObj = accounts;
    totalBalance.totalDebit =
      accountObj.ClosingDebitBalance - accountObj.OpeningDebitBalance;
    totalBalance.totalCredit =
      accountObj.ClosingCreditBalance - accountObj.OpeningCreditBalance;
    totalBalance.total = totalBalance.totalDebit - totalBalance.totalCredit;
  }

  return totalBalance;
};

const fetchAccount = (accounts, accountId) => {
  if (Array.isArray(accounts)) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].AccountID == accountId) {
        return accounts[i];
      }
    }
  } else if (accounts.AccountID == accountId) {
    return accounts;
  }
  return null;
};

const calculateEquity = accounts => {
  /*
  'equity': {
    'Capital próprio': {
        'Capital Realizado': 0, //51-261-262 ✓
        'Acções (quotas) próprias': 0, //52 ✓
        'Outros instrumentos de capital próprio': 0, //53 ✓
        'Prémios de emissão': 0, //54 ✓
        'Reservas legais': 0, //551 ✓
        'Outras reservas': 0, //552 ✓
        'Resultados transitados': 0, //56 ✓
        'Excedentes de revalorização': 0, //58 ✓
        'Outras variações no capital próprio': 0, //59 ✓
        'Resultado líquido do período': 0 //818 ✓
    },
    'Total do Capital Próprio': 0,
  */
  const ownersEquityAccounts = [
    51,
    261,
    262,
    52,
    53,
    54,
    551,
    552,
    56,
    58,
    59,
    818,
  ];
  let ownersEquityAccountsResults = [];
  let currentAccount;
  ownersEquityAccounts.forEach(account => {
    currentAccount = fetchAccount(accounts, account);
    ownersEquityAccountsResults[account] =
      currentAccount.ClosingDebitBalance - currentAccount.ClosingCreditBalance; // ??
  });
  const realizedCapital =
    ownersEquityAccountsResults[51] -
    ownersEquityAccountsResults[261] -
    ownersEquityAccountsResults[262];
  ownersEquityAccountsResults = ownersEquityAccountsResults.filter(
    item => item !== 51 && item !== 261 && item !== 262,
  );
  const totalCapital =
    realizedCapital +
    ownersEquityAccountsResults.reduce((acc, curr) => acc + curr, 0);
  return totalCapital;
};

const calculateAssets = accounts => {
  /*
  'assets': {
      'Ativo não corrente': {
          'Ativos fixos tangíveis': 0, //43+453+455-459 ✓
          'Propriedades de investimento': 0, //42+455+452-459 ✓
          'Ativos intangíveis': 0, //44+454+455-459 ✓
          'Investimentos financeiros': 0, //41 ✓
          'Accionistas/Sócios': 0 //266 + 268 - 269 ✓
      },
      'Ativo corrente': {
          'Inventários': 0, //32+33+34+35+36+39 ✓
          'Clientes': 0, //211+212-219 ✓
          'Adiantamentos a fornecedores': 0, //228-229+2713-279 ✓
          'Estado e outros entes públicos': 0, //24 ✓
          'Accioninistas/Sócios': 0, //263+268-269 ✓
          'Outras Contas a Receber': 0, //232+238-239+2721+278-279 ✓
          'Diferimentos': 0, //281 ✓
          'Outros ativos financeiros': 0, //14 ✓
          'Caixa e depósitos bancários': 0 // 11+12+13 ✓
      },
      'Total do ativo': 0,
  }, 
  */

  const currentAssetsCalculations = [
    [32, 33, 34, 35, 36, 39],
    [211, 212, -219],
    [228, -229, 2713, 279],
    [24],
    [263, 268, -269],
    [232, 238, -239, 2721, 278, -279],
    [281],
    [14],
    [11, 12, 13],
  ];

  const nonCurrentAssetsCalculations = [
    [43, 453, 455, -459],
    [42, 455, 452, -459],
    [44, 454, 455, -459],
    [41],
    [266, 268, -269],
  ];

  let total = 0;
  let currentAccount;
  let sum = 0;
  nonCurrentAssetsCalculations.forEach(asset => {
    sum = 0;
    asset.forEach(account => {
      currentAccount = fetchAccount(accounts, Math.abs(account));
      if (account < 0) {
        sum -=
          currentAccount.ClosingDebitBalance -
          currentAccount.ClosingCreditBalance;
      } else {
        sum +=
          currentAccount.ClosingDebitBalance -
          currentAccount.ClosingCreditBalance;
      }
    });
    total += sum;
  });
  const nonCurrentAssets = total;

  total = 0;
  currentAssetsCalculations.forEach(asset => {
    sum = 0;
    asset.forEach(account => {
      currentAccount = fetchAccount(accounts, Math.abs(account));
      if (currentAccount) {
        if (account < 0) {
          sum -=
            currentAccount.ClosingDebitBalance -
            currentAccount.ClosingCreditBalance;
        } else {
          sum +=
            currentAccount.ClosingDebitBalance -
            currentAccount.ClosingCreditBalance;
        }
      }
    });
    total += sum;
  });

  const currentAssets = total;

  console.log('non current');
  console.log(nonCurrentAssets);
  console.log('current');
  console.log(currentAssets);

  return nonCurrentAssets + currentAssets;
};

const calculateLiabilities = accounts => {
  /**
   * 'liabilities': {
        'Passivo não corrente': {
            'Provisões': 0, //29 ✓
            'Financiamentos obtidos': 0, //25 ✓
            'Outras contas a pagar': 0 //237+2711+2712+275 ✓
        },
        'Passivo corrente': {
            'Fornecedores': 0, //221+222+225 ✓
            'Adiantamentos de clientes': 0, //218+276 ✓
            'Estado e outros entes públicos': 0, //24 ✓
            'Accionistas/Sócios': 0, //264+265+268 ✓
            'Financiamentos obtidos': 0, //25 ✓
            'Outras contas a pagar': 0, //231+238+2711+2712+2722+278 ✓
            'Diferimentos': 0, //282+283
            'Outros passivos financeiros': 0 //14 ✓
        },
   */
  const currentLiabilitiesCalculations = [
    [221, 222, 225],
    [218, 27],
    [24],
    [264, 265, 268],
    [25],
    [231, 238, 2711, 2712, 2722, 278],
    [282, 283],
    [14],
  ];

  const nonCurrentLiabilitiesCalculations = [
    [29],
    [25],
    [237, 2711, 2712, 275],
  ];

  let total = 0;
  let currentAccount;
  let sum = 0;
  nonCurrentLiabilitiesCalculations.forEach(asset => {
    sum = 0;
    asset.forEach(account => {
      currentAccount = fetchAccount(accounts, Math.abs(account));
      if (currentAccount) {
        if (account < 0) {
          sum -=
            currentAccount.ClosingDebitBalance -
            currentAccount.ClosingCreditBalance;
        } else {
          sum +=
            currentAccount.ClosingDebitBalance -
            currentAccount.ClosingCreditBalance;
        }
      }
    });
    total += sum;
  });
  const nonCurrentLiability = total;

  total = 0;
  currentLiabilitiesCalculations.forEach(asset => {
    sum = 0;
    asset.forEach(account => {
      currentAccount = fetchAccount(accounts, Math.abs(account));
      if (currentAccount) {
        if (account < 0) {
          sum -=
            currentAccount.ClosingDebitBalance -
            currentAccount.ClosingCreditBalance;
        } else {
          sum +=
            currentAccount.ClosingDebitBalance -
            currentAccount.ClosingCreditBalance;
        }
      }
    });
    total += sum;
  });

  const currentLiability = total;

  console.log('non current');
  console.log(nonCurrentLiability);
  console.log('current');
  console.log(currentLiability);

  return nonCurrentLiability + currentLiability;
};

module.exports = (server, db) => {
  /**
   * @param year (required)
   * @param monthly (required) if true, returns the total credit and debit values
   * for the year; otherwise, it returns an array for the credit and debit values
   * for each month
   */
  server.get('/api/financial/accountBalance', (req, res) => {
    const journalEntries = db.GeneralLedgerEntries.Journal;

    if (!req.query.monthly || !req.query.year || !req.query.accountId) {
      res.json({
        error:
          'The request should be as follows: /api/financial/accountBalance?accountId=<accountId>&year=<year>&monthly=<true|false>',
      });
      return;
    }

    const totalJournalValues = processJournalEntries(
      journalEntries,
      req.query.accountId,
      parseInt(req.query.year),
      req.query.monthly === 'true',
    );

    res.json(totalJournalValues);
  });

  server.get('/api/financial/accountBalanceSheet', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;

    if (!req.query.accountId) {
      res.json({
        error:
          'The request should be as follows: /api/financial/accountBalance?accountId=<accountId>',
      });
      return;
    }

    const balance = processAccounts(accounts, req.query.accountId);

    res.json(balance);
  });

  server.get('/api/financial/equity', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const equity = calculateEquity(accounts);
    res.json(equity);
  });

  server.get('/api/financial/assets', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const assets = calculateAssets(accounts);
    res.json(assets);
  });

  server.get('/api/financial/liabilities', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const liabilities = calculateLiabilities(accounts);
    res.json(liabilities);
  });
};

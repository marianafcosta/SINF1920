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
        if (credit.AccountID.indexOf(accountId) === 0) {
          totalTransactionValues.totalCredit += parseFloat(credit.CreditAmount);
        }
      });
    } else if (lines.CreditLine.AccountID.indexOf(accountId) === 0) {
      totalTransactionValues.totalCredit += parseFloat(
        lines.CreditLine.CreditAmount,
      );
    }
  }

  if (lines.DebitLine) {
    if (Array.isArray(lines.DebitLine)) {
      lines.DebitLine.forEach(debit => {
        if (debit.AccountID.indexOf(accountId) === 0) {
          totalTransactionValues.totalDebit += parseFloat(debit.DebitAmount);
        }
      });
    } else if (lines.DebitLine.AccountID.indexOf(accountId) === 0) {
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

const calculateEbitda = accounts => {
  // USING MASTER DATA

  /*
  const earningsSales = fetchAccount(accounts, 71);
  const earningsServices = fetchAccount(accounts, 72);
  const expensesCogs = fetchAccount(accounts, 61);
  const expensesServices = fetchAccount(accounts, 62);
  const expensesPersonnel = fetchAccount(accounts, 63);

  console.log(earningsSales);
  const earningsSalesValue = !earningsSales
    ? 0
    : parseFloat(earningsSales.ClosingCreditBalance) -
      parseFloat(earningsSales.OpeningCreditBalance) -
      (parseFloat(earningsSales.ClosingDebitBalance) -
        parseFloat(earningsSales.OpeningDebitBalance));
  const earningsServicesValue = !earningsServices
    ? 0
    : parseFloat(earningsServices.ClosingCreditBalance) -
      parseFloat(earningsServices.OpeningCreditBalance) -
      (parseFloat(earningsServices.ClosingDebitBalance) -
        parseFloat(earningsServices.OpeningDebitBalance));
  const expensesCogsValue = !expensesCogs
    ? 0
    : parseFloat(expensesCogs.ClosingDebitBalance) -
      parseFloat(expensesCogs.OpeningDebitBalance) -
      (parseFloat(expensesCogs.ClosingCreditBalance) -
        parseFloat(expensesCogs.OpeningCreditBalance));
  const expensesServicesValue = !expensesServices
    ? 0
    : parseFloat(expensesServices.ClosingDebitBalance) -
      parseFloat(expensesServices.OpeningDebitBalance) -
      (parseFloat(expensesServices.ClosingCreditBalance) -
        parseFloat(expensesServices.OpeningCreditBalance));
  const expensesPersonnelValue = !expensesPersonnel
    ? 0
    : parseFloat(expensesPersonnel.ClosingDebitBalance) -
      parseFloat(expensesPersonnel.OpeningDebitBalance) -
      (parseFloat(expensesPersonnel.ClosingCreditBalance) -
        parseFloat(expensesPersonnel.OpeningCreditBalance));

  return (
    earningsSalesValue +
    earningsServicesValue -
    expensesServicesValue -
    expensesPersonnelValue -
    expensesCogsValue
  );
  */

  // USING THE SUM OF THE TRANSACTIONS

  const earningsSales = processJournalEntries(accounts, '71', 2018, false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', 2018, false); // TODO date
  const expensesCogs = processJournalEntries(accounts, '61', 2018, false); // TODO date
  const expensesServices = processJournalEntries(accounts, '62', 2018, false); // TODO date
  const expensesPersonnel = processJournalEntries(accounts, '63', 2018, false); // TODO date

  const earningsSalesValue =
    earningsSales.totalCredit - earningsSales.totalDebit;
  const earningsServicesValue =
    earningsServices.totalCredit - earningsServices.totalDebit;
  const expensesCogsValue = expensesCogs.totalDebit - expensesCogs.totalCredit;
  const expensesServicesValue =
    expensesServices.totalDebit - expensesServices.totalCredit;
  const expensesPersonnelValue =
    expensesPersonnel.totalDebit - expensesPersonnel.totalCredit;

  return (
    earningsSalesValue +
    earningsServicesValue -
    (expensesCogsValue + expensesServicesValue + expensesPersonnelValue)
  ).toFixed(2);
};

const calculateEbit = accounts => {
  // USING MASTER DATA

  /*
  const earningsSales = fetchAccount(accounts, 71);
  const earningsServices = fetchAccount(accounts, 72);
  const expensesCogs = fetchAccount(accounts, 61);
  const expensesServices = fetchAccount(accounts, 62);
  const expensesPersonnel = fetchAccount(accounts, 63);

  console.log(earningsSales);
  const earningsSalesValue = !earningsSales
    ? 0
    : parseFloat(earningsSales.ClosingCreditBalance) -
      parseFloat(earningsSales.OpeningCreditBalance) -
      (parseFloat(earningsSales.ClosingDebitBalance) -
        parseFloat(earningsSales.OpeningDebitBalance));
  const earningsServicesValue = !earningsServices
    ? 0
    : parseFloat(earningsServices.ClosingCreditBalance) -
      parseFloat(earningsServices.OpeningCreditBalance) -
      (parseFloat(earningsServices.ClosingDebitBalance) -
        parseFloat(earningsServices.OpeningDebitBalance));
  const expensesCogsValue = !expensesCogs
    ? 0
    : parseFloat(expensesCogs.ClosingDebitBalance) -
      parseFloat(expensesCogs.OpeningDebitBalance) -
      (parseFloat(expensesCogs.ClosingCreditBalance) -
        parseFloat(expensesCogs.OpeningCreditBalance));
  const expensesServicesValue = !expensesServices
    ? 0
    : parseFloat(expensesServices.ClosingDebitBalance) -
      parseFloat(expensesServices.OpeningDebitBalance) -
      (parseFloat(expensesServices.ClosingCreditBalance) -
        parseFloat(expensesServices.OpeningCreditBalance));
  const expensesPersonnelValue = !expensesPersonnel
    ? 0
    : parseFloat(expensesPersonnel.ClosingDebitBalance) -
      parseFloat(expensesPersonnel.OpeningDebitBalance) -
      (parseFloat(expensesPersonnel.ClosingCreditBalance) -
        parseFloat(expensesPersonnel.OpeningCreditBalance));

  return (
    earningsSalesValue +
    earningsServicesValue -
    expensesServicesValue -
    expensesPersonnelValue -
    expensesCogsValue
  );
  */

  // USING THE SUM OF THE TRANSACTIONS

  const earningsSales = processJournalEntries(accounts, '71', 2018, false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', 2018, false); // TODO date
  const expensesCogs = processJournalEntries(accounts, '61', 2018, false); // TODO date
  const expensesServices = processJournalEntries(accounts, '62', 2018, false); // TODO date
  const expensesPersonnel = processJournalEntries(accounts, '63', 2018, false); // TODO date
  const expensesDepreciationAmortization = processJournalEntries(
    accounts,
    '64',
    2018,
    false,
  ); // TODO date

  const earningsSalesValue =
    earningsSales.totalCredit - earningsSales.totalDebit;
  const earningsServicesValue =
    earningsServices.totalCredit - earningsServices.totalDebit;
  const expensesCogsValue = expensesCogs.totalDebit - expensesCogs.totalCredit;
  const expensesServicesValue =
    expensesServices.totalDebit - expensesServices.totalCredit;
  const expensesPersonnelValue =
    expensesPersonnel.totalDebit - expensesPersonnel.totalCredit;
  const expensesDepreciationAmortizationValue =
    expensesDepreciationAmortization.totalDebit -
    expensesDepreciationAmortization.totalCredit;

  return (
    earningsSalesValue +
    earningsServicesValue -
    (expensesCogsValue +
      expensesServicesValue +
      expensesPersonnelValue +
      expensesDepreciationAmortizationValue)
  ).toFixed(2);
};

const calculateEarnings = accounts => {
  // USING MASTER DATA

  /*
  const earningsSales = fetchAccount(accounts, 71);
  const earningsServices = fetchAccount(accounts, 72);
  const expensesCogs = fetchAccount(accounts, 61);
  const expensesServices = fetchAccount(accounts, 62);
  const expensesPersonnel = fetchAccount(accounts, 63);

  console.log(earningsSales);
  const earningsSalesValue = !earningsSales
    ? 0
    : parseFloat(earningsSales.ClosingCreditBalance) -
      parseFloat(earningsSales.OpeningCreditBalance) -
      (parseFloat(earningsSales.ClosingDebitBalance) -
        parseFloat(earningsSales.OpeningDebitBalance));
  const earningsServicesValue = !earningsServices
    ? 0
    : parseFloat(earningsServices.ClosingCreditBalance) -
      parseFloat(earningsServices.OpeningCreditBalance) -
      (parseFloat(earningsServices.ClosingDebitBalance) -
        parseFloat(earningsServices.OpeningDebitBalance));
  const expensesCogsValue = !expensesCogs
    ? 0
    : parseFloat(expensesCogs.ClosingDebitBalance) -
      parseFloat(expensesCogs.OpeningDebitBalance) -
      (parseFloat(expensesCogs.ClosingCreditBalance) -
        parseFloat(expensesCogs.OpeningCreditBalance));
  const expensesServicesValue = !expensesServices
    ? 0
    : parseFloat(expensesServices.ClosingDebitBalance) -
      parseFloat(expensesServices.OpeningDebitBalance) -
      (parseFloat(expensesServices.ClosingCreditBalance) -
        parseFloat(expensesServices.OpeningCreditBalance));
  const expensesPersonnelValue = !expensesPersonnel
    ? 0
    : parseFloat(expensesPersonnel.ClosingDebitBalance) -
      parseFloat(expensesPersonnel.OpeningDebitBalance) -
      (parseFloat(expensesPersonnel.ClosingCreditBalance) -
        parseFloat(expensesPersonnel.OpeningCreditBalance));

  return (
    earningsSalesValue +
    earningsServicesValue -
    expensesServicesValue -
    expensesPersonnelValue -
    expensesCogsValue
  );
  */

  // USING THE SUM OF THE TRANSACTIONS

  const earningsSales = processJournalEntries(accounts, '71', 2018, false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', 2018, false); // TODO date
  const expenses = processJournalEntries(accounts, '6', 2018, false); // TODO date

  const earningsSalesValue =
    earningsSales.totalCredit - earningsSales.totalDebit;
  const earningsServicesValue =
    earningsServices.totalCredit - earningsServices.totalDebit;
  const expensesValue = expenses.totalDebit - expenses.totalCredit;

  return (earningsSalesValue + earningsServicesValue - expensesValue).toFixed(
    2,
  );
};

const processAccounts = (accounts, accountId) => {
  const totalBalance = {
    totalCredit: 0,
    totalDebit: 0,
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
          totalBalance.totalDebit = Number(parseFloat(total).toFixed(2));
          totalBalance.totalCredit = Number(0);
        } else {
          totalBalance.totalDebit = Number(0);
          totalBalance.totalCredit = Number(parseFloat(-total).toFixed(2));
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
    const total = totalBalance.totalDebit - totalBalance.totalCredit;
    if (total > 0) {
      totalBalance.totalDebit = parseFloat(total).toFixed(2);
      totalBalance.totalCredit = 0;
    } else {
      totalBalance.totalDebit = 0;
      totalBalance.totalCredit = parseFloat(-total).toFixed(2);
    }
  }

  return totalBalance;
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
    if (currentAccount) {
      ownersEquityAccountsResults[account] =
        currentAccount.ClosingDebitBalance -
        currentAccount.ClosingCreditBalance; // ??
    }
  });
  const realizedCapital =
    (ownersEquityAccountsResults[51] ? ownersEquityAccountsResults[51] : 0) -
    (ownersEquityAccountsResults[261] ? ownersEquityAccountsResults[261] : 0) -
    (ownersEquityAccountsResults[262] ? ownersEquityAccountsResults[262] : 0);
  ownersEquityAccountsResults = ownersEquityAccountsResults.filter(
    item => item !== 51 && item !== 261 && item !== 262,
  );
  const totalCapital =
    realizedCapital +
    ownersEquityAccountsResults.reduce(
      (acc, curr) => (acc + curr ? curr : 0),
      0,
    );
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

  return nonCurrentLiability + currentLiability;
};

const calculateCurrentLiabilities = accounts => {
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
  let total = 0;
  let currentAccount;
  let sum;
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
  return total;
};

const calculateCurrentAssets = accounts => {
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

  let total = 0;
  let currentAccount;
  let sum;
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
  return total;
};

const calculateCash = accounts => {
  const cashCalculations = [11, 12, 13];
  let total = 0;
  let currentAccount;
  cashCalculations.forEach(account => {
    currentAccount = fetchAccount(accounts, Math.abs(account));
    if (currentAccount) {
      if (account < 0) {
        total -=
          currentAccount.ClosingDebitBalance -
          currentAccount.ClosingCreditBalance;
      } else {
        total +=
          currentAccount.ClosingDebitBalance -
          currentAccount.ClosingCreditBalance;
      }
    }
  });
  return total;
};

const calculateGrossProfitMargin = journal => {
  const revenueFromSales = processJournalEntries(journal, '71', 2018, false); // TODO year
  const cogs = processJournalEntries(journal, '61', 2018, false);
  return (
    (revenueFromSales.totalCredit -
      revenueFromSales.totalDebit -
      (cogs.totalDebit - cogs.totalCredit)) /
    (revenueFromSales.totalCredit - revenueFromSales.totalDebit)
  );
};

module.exports = (server, db) => {
  /**
   * @param accountId
   * @param year (required)
   * @param monthly (required) if true, returns the total credit and debit values
   * for the year; otherwise, it returns an array for the credit and debit values
   * for each month
   */
  server.get('/api/financial/account-balance', (req, res) => {
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

  /**
   * @param accountId
   * NEED TO ADD THE YEAR PARAMETER
   */
  server.get('/api/financial/account-balance-sheet', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const balance = processAccounts(accounts, req.query.accountId);
    res.json(balance);
  });

  server.get('/api/financial/accounts', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;

    if (!req.query.accountId) {
      res.json({
        error:
          'The request should be as follows: /api/financial/accountBalance?accountId=<accountId>',
      });
      return;
    }

    let accountValues = fetchAccount(accounts, req.query.accountId);
    if (!accountValues) {
      accountValues = { error: 'No account was found for the specified ID' };
    } else {
      accountValues.OpeningCreditBalance = parseFloat(
        accountValues.OpeningCreditBalance,
      );
      accountValues.OpeningDebitBalance = parseFloat(
        accountValues.OpeningDebitBalance,
      );
      accountValues.ClosingCreditBalance = parseFloat(
        accountValues.ClosingCreditBalance,
      );
      accountValues.ClosingDebitBalance = parseFloat(
        accountValues.ClosingDebitBalance,
      );
    }

    res.json(accountValues);
  });

  /**
   * @param year NOT USED FOR NOW
   */
  server.get('/api/financial/ebitda', (req, res) => {
    // USING MASTER DATA
    // const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    // USING THE SUM OF THE TRANSACTIONS
    const accounts = db.GeneralLedgerEntries.Journal;
    res.json({ ebitda: Number(calculateEbitda(accounts)) });
  });

  /**
   * @param year NOT USED FOR NOW
   */
  server.get('/api/financial/ebit', (req, res) => {
    // USING MASTER DATA
    // const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    // USING THE SUM OF THE TRANSACTIONS
    const accounts = db.GeneralLedgerEntries.Journal;
    res.json(Number(calculateEbit(accounts)));
  });

  /**
   * @param year NOT USED FOR NOW
   */
  server.get('/api/financial/earnings', (req, res) => {
    // USING MASTER DATA
    // const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    // USING THE SUM OF THE TRANSACTIONS
    const accounts = db.GeneralLedgerEntries.Journal;
    res.json(Number(calculateEarnings(accounts)));
  });

  server.get('/api/financial/accounts-receivable', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    const { totalCredit, totalDebit } = processJournalEntries(
      accounts,
      '21',
      2018,
      false,
    ); // TODO date

    res.json(Number((totalDebit - totalCredit).toFixed(2)));
  });

  server.get('/api/financial/equity', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const equity = calculateEquity(accounts);
    res.json(parseFloat(equity));
  });

  server.get('/api/financial/assets', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const assets = calculateAssets(accounts);
    res.json(parseFloat(assets));
  });

  server.get('/api/financial/liabilities', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const liabilities = calculateLiabilities(accounts);
    res.json(parseFloat(liabilities));
  });

  server.get('/api/financial/liabilities/current', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json(calculateCurrentLiabilities(accounts));
  });

  server.get('/api/financial/assets/current', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json(calculateCurrentAssets(accounts));
  });

  server.get('/api/financial/assets/cash', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json(calculateCash(accounts));
  });

  server.get('/api/financial/ratios/cash', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const cash = calculateCash(accounts);
    const currentLiabilities = calculateCurrentLiabilities(accounts);
    res.json(Number(Math.abs(cash / currentLiabilities).toFixed(2)));
  });

  server.get('/api/financial/ratios/current', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const currentAssets = calculateCurrentAssets(accounts);
    const currentLiabilities = calculateCurrentLiabilities(accounts);
    res.json(Number(Math.abs(currentAssets / currentLiabilities).toFixed(2)));
  });

  server.get('/api/financial/working-capital', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const currentAssets = calculateCurrentAssets(accounts);
    const currentLiabilities = calculateCurrentLiabilities(accounts);
    res.json(
      Number(
        (Math.abs(currentAssets) - Math.abs(currentLiabilities)).toFixed(2),
      ),
    );
  });

  server.get('/api/financial/gross-profit-margin', (req, res) => {
    const journal = db.GeneralLedgerEntries.Journal;
    const grossProfit = calculateGrossProfitMargin(journal);
    res.json(grossProfit);
  });
};

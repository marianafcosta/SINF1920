/* eslint-disable radix */
/* eslint-disable eqeqeq */

const balanceSheet = {
  assets: {
    nonCurrent: [
      {
        name: 'Tangible assets',
        taxonomyCodes: [
          268,
          269,
          270,
          271,
          272,
          273,
          274,
          -275,
          -276,
          -277,
          -278,
          -279,
          -280,
          -281,
          -282,
          -283,
          -284,
          -285,
          -286,
          -287,
          -288,
          306,
          310,
          -314,
          -318,
        ],
      },
      {
        name: 'Investment properties',
        taxonomyCodes: [
          259,
          260,
          261,
          -262,
          -263,
          -264,
          -265,
          -266,
          -267,
          305,
          309,
          -313,
          -317,
        ],
      },
      {
        name: 'Goodwill',
        taxonomyCodes: [
          217,
          222,
          227,
          -236,
          -237,
          -238,
          -240,
          -245,
          -250,
          289,
          -294,
          -299,
        ],
      },
      {
        name: 'Intangible assets',
        taxonomyCodes: [
          290,
          291,
          292,
          293,
          -295,
          -296,
          -297,
          -298,
          -300,
          -301,
          -302,
          -303,
          307,
          311,
          -315,
          -319,
        ],
      },
      {
        name: 'Biological assets',
        taxonomyCodes: [197, 198, -200, -202, 215],
      },
      {
        name: 'Financial participations',
        taxonomyCodes: [216, 221, 226, -239, -244, -249],
      },
      {
        name: 'Other financial investments',
        taxonomyCodes: [
          218,
          219,
          220,
          223,
          224,
          225,
          228,
          229,
          230,
          231,
          232,
          233,
          234,
          235,
          -241,
          -242,
          -243,
          -246,
          -247,
          -248,
          -251,
          -252,
          -253,
          -254,
          -255,
          -256,
          -257,
          -258,
          304,
          308,
          -312,
          -316,
        ],
      },
      {
        name: 'Notes receivable', // ??
        taxonomyCodes: [-68, -70, 112, -121, -123, 129, -141, -145],
        ifDebtBalance: [62, 64, 114, 125, 127, 139],
      },
      {
        name: 'Deferred tax assets',
        taxonomyCodes: [133, -143],
      },
    ],
    current: [
      {
        name: 'Inventory',
        taxonomyCodes: [
          165,
          166,
          167,
          -168,
          -169,
          -170,
          171,
          172,
          173,
          174,
          175,
          176,
          -177,
          -178,
          -179,
          -180,
          -181,
          -182,
          183,
          184,
          -185,
          -186,
          187,
          188,
          189,
          -190,
          -191,
          -192,
          193,
          -194,
          209,
          210,
          211,
          212,
          213,
        ],
      },
      {
        name: 'Biological assets',
        taxonomyCodes: [195, 196, -199, -201, 214],
      },
      {
        name: 'Clients',
        taxonomyCodes: [
          -24,
          -25,
          -26,
          -27,
          -28,
          -29,
          -30,
          -31,
          -32,
          -33,
          -34,
          -35,
          -36,
        ],
        ifDebtBalance: [10, 11, 12, 1, 314, 15, 16, 17, 18, 19, 20, 21, 22],
      },
      {
        name: 'State and other public entities',
        taxonomyCodes: [73, 74, 79, 80],
        ifDebtBalance: [71, 76, 77, 82, 83, 84, 85],
      },
      {
        name: 'Subscribed and non effective capital', //??
        taxonomyCodes: [106, 107, -115, -116],
      },
      {
        name: 'Other receivables', // ??
        taxonomyCodes: [
          51,
          -52,
          55,
          56,
          -65,
          -66,
          -67,
          -69,
          108,
          111,
          -117,
          -118,
          -119,
          -120,
          -122,
          128,
          130,
          -140,
          -142,
          -144,
        ],
        ifDebtBalance: [
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          61,
          63,
          109,
          110,
          113,
          124,
          126,
          138,
        ],
      },
      {
        name: 'Deferments',
        taxonomyCodes: [146],
      },
      {
        name: 'Financial assets held for negotiation', // ??
        taxonomyCodes: [4, 6],
      },
      {
        name: 'Other financial assets',
        taxonomyCodes: [8],
      },
      {
        name: 'Non current assets held for sale', // ??
        taxonomyCodes: [320, 321, 322, 323, 324, -326, -327, -328, -329, -330],
      },
      {
        name: 'Cash and bank deposits',
        taxonomyCodes: [1],
        ifDebtBalance: [2, 3],
      },
    ],
  },
  liabilities: {
    nonCurrent: [
      {
        name: 'Provisions',
        taxonomyCodes: [148, 149, 150, 151, 152, 153, 154, 155],
      },
      {
        name: 'Obtained financing', // ??
        taxonomyCodes: [87, 89, 91, 93, 95, 97, 99, 101, 103, 105],
      },
      {
        name: 'Post-employment benefits responsibility', // ??
        taxonomyCodes: [132],
      },
      {
        name: 'Deferred tax liabilities',
        taxonomyCodes: [134],
      },
      {
        name: 'Other accounts payable',
        taxonomyCodes: [58, 60, 136],
        ifCreditBalance: [62, 64, 114, 125, 127, 139],
      },
    ],
    current: [
      {
        name: 'Suppliers',
        taxonomyCodes: [],
        ifCreditBalance: [
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
        ],
      },
      {
        name: 'Payments in advance to clients', // ??
        taxonomyCodes: [23, 137],
        ifCreditBalance: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      },
      {
        name: 'State and other public entities',
        taxonomyCodes: [72, 75, 78],
        ifCreditBalance: [71, 76, 77, 81, 82, 83, 84, 85],
      },
      {
        name: 'Financing obtained',
        taxonomyCodes: [86, 88, 90, 92, 94, 96, 98, 100, 102, 104],
        ifCreditBalance: [2, 3],
      },
      {
        name: 'Other payable debts', // ??
        taxonomyCodes: [53, 54, 57, 59, 131, 135],
        ifCreditBalance: [61, 63, 109, 110, 113, 124, 126, 138],
      },
      {
        name: 'Deferments', // ??
        taxonomyCodes: [147],
      },
      {
        name: 'Financial liabilites held for negotiation', // ??
        taxonomyCodes: [5, 7],
      },
      {
        name: 'Other financial liabilities',
        taxonomyCodes: [9],
      },
      {
        name: 'Non current liabilities held for negotiation', // ??
        taxonomyCodes: [325],
      },
    ],
  },
  equity: {
    nonCurrent: [
      {
        name: 'Subscribed capital',
        taxonomyCodes: [331],
      },
      {
        name: 'Own stock',
        taxonomyCodes: [-332],
        ifCreditOrDebit: [333],
      },
      {
        name: 'Other equity instruments',
        taxonomyCodes: [334],
      },
      {
        name: 'Emission prizes', // ???
        taxonomyCodes: [335],
      },
      {
        name: 'Legal reserves',
        taxonomyCodes: [336],
      },
      {
        name: 'Other reserves',
        taxonomyCodes: [337],
      },
      {
        name: 'Results moved', // ??
        taxonomyCodes: [],
        ifCreditOrDebit: [338],
      },
      {
        name: 'Reappreciation surplus',
        taxonomyCodes: [343, -344, 345, -346],
      },
      {
        name: 'Adjustments',
        taxonomyCodes: [349, -350, 351],
        ifCreditOrDebit: [339, 340, 341, 342, 347, 348, 352],
      },
      {
        name: 'Net result',
        taxonomyCodes: [],
        ifCreditOrDebit: [646],
      },
      {
        name: 'Early dividends', // ??
        taxonomyCodes: [-647],
      },
    ],
  },
};

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
        year === new Date(transaction.TransactionDate).getFullYear() &&
        transaction.TransactionType == 'N'
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

  const earningsSales = processJournalEntries(accounts, '71', 2019, false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', 2019, false); // TODO date
  const expensesCogs = processJournalEntries(accounts, '61', 2019, false); // TODO date
  const expensesServices = processJournalEntries(accounts, '62', 2019, false); // TODO date
  const expensesPersonnel = processJournalEntries(accounts, '63', 2019, false); // TODO date

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

  const earningsSales = processJournalEntries(accounts, '71', 2019, false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', 2019, false); // TODO date
  const expensesCogs = processJournalEntries(accounts, '61', 2019, false); // TODO date
  const expensesServices = processJournalEntries(accounts, '62', 2019, false); // TODO date
  const expensesPersonnel = processJournalEntries(accounts, '63', 2019, false); // TODO date
  const expensesDepreciationAmortization = processJournalEntries(
    accounts,
    '64',
    2019,
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

  const earningsSales = processJournalEntries(accounts, '71', 2019, false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', 2019, false); // TODO date
  const expenses = processJournalEntries(accounts, '6', 2019, false); // TODO date

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
  const ownersEquityTaxonomy = [
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
    currentAccount = processJournalEntries(accounts, account, 2019, false);
    if (currentAccount) {
      ownersEquityAccountsResults[account] =
        currentAccount.totalDebit - currentAccount.totalCredit; // ??
    }
  });
  const realizedCapital =
    (ownersEquityAccountsResults[51] ? ownersEquityAccountsResults[51] : 0) -
    (ownersEquityAccountsResults[261] ? ownersEquityAccountsResults[261] : 0) -
    (ownersEquityAccountsResults[262] ? ownersEquityAccountsResults[262] : 0);
  ownersEquityAccountsResults = ownersEquityAccountsResults.filter(
    item => item !== 51 && item !== 261 && item !== 262,
  );
  console.log('total accounts for equity');
  console.log(ownersEquityAccountsResults);
  const totalCapital =
    realizedCapital +
    ownersEquityAccountsResults.reduce(
      (acc, curr) => (acc + curr ? curr : 0),
      0,
    );

  console.log('equity');
  console.log(totalCapital);
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
      currentAccount = processJournalEntries(
        accounts,
        Math.abs(account),
        2019,
        false,
      );
      if (currentAccount) {
        if (account < 0) {
          sum -= currentAccount.totalDebit - currentAccount.totalCredit;
        } else {
          sum += currentAccount.totalDebit - currentAccount.totalCredit;
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
      currentAccount = processJournalEntries(
        accounts,
        Math.abs(account),
        2019,
        false,
      );
      if (currentAccount) {
        if (account < 0) {
          sum -= currentAccount.totalDebit - currentAccount.totalCredit;
        } else {
          sum += currentAccount.totalDebit - currentAccount.totalCredit;
        }
      }
    });
    total += sum;
  });

  const currentAssets = total;
  console.log('current assets');
  console.log(currentAssets);
  console.log('non current assets');
  console.log(nonCurrentAssets);

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
          sum -= currentAccount.totalDebit - currentAccount.totalCredit;
        } else {
          sum += currentAccount.totalDebit - currentAccount.totalCredit;
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
      currentAccount = processJournalEntries(
        accounts,
        Math.abs(account),
        2019,
        false,
      );
      if (currentAccount) {
        if (account < 0) {
          sum -= currentAccount.totalDebit - currentAccount.totalCredit;
        } else {
          sum += currentAccount.totalDebit - currentAccount.totalCredit;
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
  /*
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
  */
  currentLiabilitiesCalculations.forEach(asset => {
    sum = 0;
    asset.forEach(account => {
      currentAccount = processJournalEntries(
        accounts,
        `${Math.abs(account)}`,
        2019,
        false,
      );
      if (currentAccount) {
        if (account < 0) {
          sum -= currentAccount.totalDebit - currentAccount.totalCredit;
        } else {
          sum += currentAccount.totalDebit - currentAccount.totalCredit;
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
  /*
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
  */
  currentAssetsCalculations.forEach(asset => {
    sum = 0;
    asset.forEach(account => {
      currentAccount = processJournalEntries(
        accounts,
        `${Math.abs(account)}`,
        2019,
        false,
      );
      if (currentAccount) {
        if (account < 0) {
          sum -= currentAccount.totalDebit - currentAccount.totalCredit;
        } else {
          sum += currentAccount.totalDebit - currentAccount.totalCredit;
        }
      }
    });
    total += sum;
  });
  return total;
};

const calculateCash = accounts => {
  const cashCalculations = ['11', '12', '13'];
  let total = 0;
  let currentAccount;
  /*
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
  */
  cashCalculations.forEach(account => {
    currentAccount = processJournalEntries(accounts, account, 2019, false);
    if (currentAccount) {
      if (account < 0) {
        total -= currentAccount.totalDebit - currentAccount.totalCredit;
      } else {
        total += currentAccount.totalDebit - currentAccount.totalCredit;
      }
    }
  });
  return total;
};

const calculateGrossProfitMargin = journal => {
  const revenueFromSales = processJournalEntries(journal, '71', 2019, false); // TODO year
  const cogs = processJournalEntries(journal, '61', 2019, false);
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
      2019,
      false,
    ); // TODO date

    res.json(Number((totalDebit - totalCredit).toFixed(2)));
  });

  server.get('/api/financial/equity', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    const equity = calculateEquity(accounts);
    res.json(parseFloat(equity));
  });

  server.get('/api/financial/assets', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    const assets = calculateAssets(accounts);
    res.json(parseFloat(assets));
  });

  server.get('/api/financial/liabilities', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    const liabilities = calculateLiabilities(accounts);
    res.json(parseFloat(liabilities));
  });

  server.get('/api/financial/liabilities/current', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    res.json(calculateCurrentLiabilities(accounts));
  });

  server.get('/api/financial/assets/current', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    res.json(calculateCurrentAssets(accounts));
  });

  server.get('/api/financial/assets/cash', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    res.json(calculateCash(accounts));
  });

  server.get('/api/financial/ratios/cash', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    const cash = calculateCash(accounts);
    const currentLiabilities = calculateCurrentLiabilities(accounts);
    res.json(Number(Math.abs(cash / currentLiabilities).toFixed(2)));
  });

  server.get('/api/financial/ratios/current', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
    const currentAssets = calculateCurrentAssets(accounts);
    const currentLiabilities = calculateCurrentLiabilities(accounts);
    res.json(Number(Math.abs(currentAssets / currentLiabilities).toFixed(2)));
  });

  server.get('/api/financial/working-capital', (req, res) => {
    const accounts = db.GeneralLedgerEntries.Journal;
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

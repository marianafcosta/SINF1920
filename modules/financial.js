/* eslint-disable radix */
/* eslint-disable eqeqeq */

const balanceSheetTemplate = {
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
        value: 0,
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
        value: 0,
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
        value: 0,
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
        value: 0,
      },
      {
        name: 'Biological assets',
        taxonomyCodes: [197, 198, -200, -202, 215],
        value: 0,
      },
      {
        name: 'Financial participations',
        taxonomyCodes: [216, 221, 226, -239, -244, -249],
        value: 0,
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
        value: 0,
      },
      {
        name: 'Notes receivable', // ??
        taxonomyCodes: [-68, -70, 112, -121, -123, 129, -141, -145],
        ifDebtBalance: [62, 64, 114, 125, 127, 139],
        value: 0,
      },
      {
        name: 'Deferred tax assets',
        taxonomyCodes: [133, -143],
        value: 0,
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
        value: 0,
      },
      {
        name: 'Biological assets',
        taxonomyCodes: [195, 196, -199, -201, 214],
        value: 0,
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
        ifDebtBalance: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        value: 0,
      },
      {
        name: 'State and other public entities',
        taxonomyCodes: [73, 74, 79, 80],
        ifDebtBalance: [71, 76, 77, 82, 83, 84, 85],
        value: 0,
      },
      {
        name: 'Subscribed and non effective capital', // ??
        taxonomyCodes: [106, 107, -115, -116],
        value: 0,
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
        value: 0,
      },
      {
        name: 'Deferments',
        taxonomyCodes: [146],
        value: 0,
      },
      {
        name: 'Financial assets held for negotiation', // ??
        taxonomyCodes: [4, 6],
        value: 0,
      },
      {
        name: 'Other financial assets',
        taxonomyCodes: [8],
        value: 0,
      },
      {
        name: 'Non current assets held for sale', // ??
        taxonomyCodes: [320, 321, 322, 323, 324, -326, -327, -328, -329, -330],
        value: 0,
      },
      {
        name: 'Cash and bank deposits',
        taxonomyCodes: [1],
        ifDebtBalance: [2, 3],
        value: 0,
      },
    ],
  },
  liabilities: {
    nonCurrent: [
      {
        name: 'Provisions',
        taxonomyCodes: [148, 149, 150, 151, 152, 153, 154, 155],
        value: 0,
      },
      {
        name: 'Obtained financing', // ??
        taxonomyCodes: [87, 89, 91, 93, 95, 97, 99, 101, 103, 105],
        value: 0,
      },
      {
        name: 'Post-employment benefits responsibility', // ??
        taxonomyCodes: [132],
        value: 0,
      },
      {
        name: 'Deferred tax liabilities',
        taxonomyCodes: [134],
        value: 0,
      },
      {
        name: 'Other accounts payable',
        taxonomyCodes: [58, 60, 136],
        ifCreditBalance: [62, 64, 114, 125, 127, 139],
        value: 0,
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
        value: 0,
      },
      {
        name: 'Payments in advance to clients', // ??
        taxonomyCodes: [23, 137],
        ifCreditBalance: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        value: 0,
      },
      {
        name: 'State and other public entities',
        taxonomyCodes: [72, 75, 78],
        ifCreditBalance: [71, 76, 77, 81, 82, 83, 84, 85],
        value: 0,
      },
      {
        name: 'Financing obtained',
        taxonomyCodes: [86, 88, 90, 92, 94, 96, 98, 100, 102, 104],
        ifCreditBalance: [2, 3],
        value: 0,
      },
      {
        name: 'Other payable debts', // ??
        taxonomyCodes: [53, 54, 57, 59, 131, 135],
        ifCreditBalance: [61, 63, 109, 110, 113, 124, 126, 138],
        value: 0,
      },
      {
        name: 'Deferments', // ??
        taxonomyCodes: [147],
        value: 0,
      },
      {
        name: 'Financial liabilites held for negotiation', // ??
        taxonomyCodes: [5, 7],
        value: 0,
      },
      {
        name: 'Other financial liabilities',
        taxonomyCodes: [9],
        value: 0,
      },
      {
        name: 'Non current liabilities held for negotiation', // ??
        taxonomyCodes: [325],
        value: 0,
      },
    ],
  },
  equity: [
    {
      name: 'Subscribed capital',
      taxonomyCodes: [331],
      value: 0,
    },
    {
      name: 'Own stock',
      taxonomyCodes: [-332],
      ifCreditOrDebit: [333],
      value: 0,
    },
    {
      name: 'Other equity instruments',
      taxonomyCodes: [334],
      value: 0,
    },
    {
      name: 'Emission prizes', // ???
      taxonomyCodes: [335],
      value: 0,
    },
    {
      name: 'Legal reserves',
      taxonomyCodes: [336],
      value: 0,
    },
    {
      name: 'Other reserves',
      taxonomyCodes: [337],
      value: 0,
    },
    {
      name: 'Results moved', // ??
      taxonomyCodes: [],
      ifCreditOrDebit: [338],
      value: 0,
    },
    {
      name: 'Reappreciation surplus',
      taxonomyCodes: [343, -344, 345, -346],
      value: 0,
    },
    {
      name: 'Adjustments',
      taxonomyCodes: [349, -350, 351],
      ifCreditOrDebit: [339, 340, 341, 342, 347, 348, 352],
      value: 0,
    },
    {
      name: 'Net result',
      taxonomyCodes: [],
      ifCreditOrDebit: [646],
      value: 0,
    },
    {
      name: 'Early dividends', // ??
      taxonomyCodes: [-647],
      value: 0,
    },
  ],
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

const processTransactions = (transactions, accountId, monthly) => {
  const totalJournalValues = {
    totalCredit: monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
    totalDebit: monthly ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 0,
  };

  let currentTransaction;
  if (Array.isArray(transactions)) {
    transactions.forEach(transaction => {
      if (transaction.Lines && transaction.TransactionType == 'N') {
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
  } else if (transactions.Lines && transactions.Lines.TransactionType == 'N') {
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

const processJournalEntries = (entries, accountId, monthly) => {
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

const processTaxonomySum = (taxonomy, accounts) => {
  // fetch the account ids for all accounts with this taxonomy code
  const results = [];
  let balance = 0;
  accounts.forEach(account => {
    if (account.TaxonomyCode == taxonomy) {
      balance =
        Number(account.ClosingDebitBalance) -
        Number(account.ClosingCreditBalance);
      results.push({
        taxonomy: taxonomy,
        account: account.AccountID,
        balanceType: balance > 0 ? 'debit' : 'credt',
        balanceValue: balance > 0 ? balance : -balance,
      });
    }
  });

  return results;
};

const calculateEbitda = accounts => {
  const earningsSales = processJournalEntries(accounts, '71', false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', false); // TODO date
  const expensesCogs = processJournalEntries(accounts, '61', false); // TODO date
  const expensesServices = processJournalEntries(accounts, '62', false); // TODO date
  const expensesPersonnel = processJournalEntries(accounts, '63', false); // TODO date

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
  // USING THE SUM OF THE TRANSACTIONS

  const earningsSales = processJournalEntries(accounts, '71', false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', false); // TODO date
  const expensesCogs = processJournalEntries(accounts, '61', false); // TODO date
  const expensesServices = processJournalEntries(accounts, '62', false); // TODO date
  const expensesPersonnel = processJournalEntries(accounts, '63', false); // TODO date
  const expensesDepreciationAmortization = processJournalEntries(
    accounts,
    '64',
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
  const earningsSales = processJournalEntries(accounts, '71', false); // TODO date
  const earningsServices = processJournalEntries(accounts, '72', false); // TODO date
  const expenses = processJournalEntries(accounts, '6', false); // TODO date

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
  let sum = 0;
  let currentSum = 0;
  const equity = {
    accounts: [],
    total: 0,
  };
  balanceSheetTemplate.equity.forEach(equityAccount => {
    // check taxonomy codes
    let currentTaxonomy;
    equityAccount.taxonomyCodes.forEach(taxonomy => {
      currentTaxonomy = processTaxonomySum(Math.abs(taxonomy), accounts);
      currentTaxonomy.forEach(tax => {
        if (taxonomy < 0) {
          currentSum -= tax.balanceValue;
        } else {
          currentSum += tax.balanceValue;
        }
      });
    });

    // check if credit
    if (equityAccount.ifCreditBalance) {
      equityAccount.ifCreditBalance.forEach(credit => {
        currentTaxonomy = processTaxonomySum(Math.abs(credit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'credit') {
            if (credit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if debit
    if (equityAccount.ifDebtBalance) {
      equityAccount.ifDebtBalance.forEach(debit => {
        currentTaxonomy = processTaxonomySum(Math.abs(debit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            if (debit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if credit or debit
    if (equityAccount.ifCreditOrDebit) {
      equityAccount.ifCreditOrDebit.forEach(creditOrDebit => {
        currentTaxonomy = processTaxonomySum(Math.abs(creditOrDebit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
      });
    }
    equity.accounts.push({ name: equityAccount.name, value: currentSum });
    sum += currentSum;
    currentSum = 0;
  });
  equity.total = sum;
  console.log(equity);
  return equity;
};

const calculateAssets = accounts => {
  let totalCurrent = 0;
  let totalNonCurrent = 0;
  let currentSum = 0;
  const assets = {
    current: [],
    nonCurrent: [],
    totalCurrent: 0,
    totalNonCurrent: 0,
    total: 0,
  };
  balanceSheetTemplate.assets.current.forEach(assetAccount => {
    // check taxonomy codes
    let currentTaxonomy;
    assetAccount.taxonomyCodes.forEach(taxonomy => {
      currentTaxonomy = processTaxonomySum(Math.abs(taxonomy), accounts);
      currentTaxonomy.forEach(tax => {
        if (taxonomy < 0) {
          currentSum -= tax.balanceValue;
        } else {
          currentSum += tax.balanceValue;
        }
      });
    });

    // check if credit
    if (assetAccount.ifCreditBalance) {
      assetAccount.ifCreditBalance.forEach(credit => {
        currentTaxonomy = processTaxonomySum(Math.abs(credit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'credit') {
            if (credit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if debit
    if (assetAccount.ifDebtBalance) {
      assetAccount.ifDebtBalance.forEach(debit => {
        currentTaxonomy = processTaxonomySum(Math.abs(debit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            if (debit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if credit or debit
    if (assetAccount.ifCreditOrDebit) {
      assetAccount.ifCreditOrDebit.forEach(creditOrDebit => {
        currentTaxonomy = processTaxonomySum(Math.abs(creditOrDebit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
      });
    }
    assets.current.push({ name: assetAccount.name, value: currentSum });
    totalCurrent += currentSum;
    currentSum = 0;
  });

  balanceSheetTemplate.assets.nonCurrent.forEach(assetAccount => {
    // check taxonomy codes
    let currentTaxonomy;
    assetAccount.taxonomyCodes.forEach(taxonomy => {
      currentTaxonomy = processTaxonomySum(Math.abs(taxonomy), accounts);
      currentTaxonomy.forEach(tax => {
        if (taxonomy < 0) {
          currentSum -= tax.balanceValue;
        } else {
          currentSum += tax.balanceValue;
        }
      });
    });

    // check if credit
    if (assetAccount.ifCreditBalance) {
      assetAccount.ifCreditBalance.forEach(credit => {
        currentTaxonomy = processTaxonomySum(Math.abs(credit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'credit') {
            if (credit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if debit
    if (assetAccount.ifDebtBalance) {
      assetAccount.ifDebtBalance.forEach(debit => {
        currentTaxonomy = processTaxonomySum(Math.abs(debit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            if (debit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if credit or debit
    if (assetAccount.ifCreditOrDebit) {
      assetAccount.ifCreditOrDebit.forEach(creditOrDebit => {
        currentTaxonomy = processTaxonomySum(Math.abs(creditOrDebit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
      });
    }
    assets.nonCurrent.push({ name: assetAccount.name, value: currentSum });
    totalNonCurrent += currentSum;
    currentSum = 0;
  });

  assets.totalCurrent = totalCurrent;
  assets.totalNonCurrent = totalNonCurrent;
  assets.total = totalCurrent + totalNonCurrent;

  console.log(assets);
  return assets;
};

const calculateLiabilities = accounts => {
  let totalCurrent = 0;
  let totalNonCurrent = 0;
  let currentSum = 0;
  const liabilities = {
    current: [],
    nonCurrent: [],
    totalCurrent: 0,
    totalNonCurrent: 0,
    total: 0,
  };
  balanceSheetTemplate.liabilities.current.forEach(liabilityAccount => {
    // check taxonomy codes
    let currentTaxonomy;
    liabilityAccount.taxonomyCodes.forEach(taxonomy => {
      currentTaxonomy = processTaxonomySum(Math.abs(taxonomy), accounts);
      currentTaxonomy.forEach(tax => {
        if (taxonomy < 0) {
          currentSum -= tax.balanceValue;
        } else {
          currentSum += tax.balanceValue;
        }
      });
    });

    // check if credit
    if (liabilityAccount.ifCreditBalance) {
      liabilityAccount.ifCreditBalance.forEach(credit => {
        currentTaxonomy = processTaxonomySum(Math.abs(credit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'credit') {
            if (credit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if debit
    if (liabilityAccount.ifDebtBalance) {
      liabilityAccount.ifDebtBalance.forEach(debit => {
        currentTaxonomy = processTaxonomySum(Math.abs(debit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            if (debit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if credit or debit
    if (liabilityAccount.ifCreditOrDebit) {
      liabilityAccount.ifCreditOrDebit.forEach(creditOrDebit => {
        currentTaxonomy = processTaxonomySum(Math.abs(creditOrDebit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
      });
    }
    liabilities.current.push({
      name: liabilityAccount.name,
      value: currentSum,
    });
    totalCurrent += currentSum;
    currentSum = 0;
  });

  balanceSheetTemplate.liabilities.nonCurrent.forEach(liabilityAccount => {
    // check taxonomy codes
    let currentTaxonomy;
    liabilityAccount.taxonomyCodes.forEach(taxonomy => {
      currentTaxonomy = processTaxonomySum(Math.abs(taxonomy), accounts);
      currentTaxonomy.forEach(tax => {
        if (taxonomy < 0) {
          currentSum -= tax.balanceValue;
        } else {
          currentSum += tax.balanceValue;
        }
      });
    });

    // check if credit
    if (liabilityAccount.ifCreditBalance) {
      liabilityAccount.ifCreditBalance.forEach(credit => {
        currentTaxonomy = processTaxonomySum(Math.abs(credit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'credit') {
            if (credit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if debit
    if (liabilityAccount.ifDebtBalance) {
      liabilityAccount.ifDebtBalance.forEach(debit => {
        currentTaxonomy = processTaxonomySum(Math.abs(debit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            if (debit < 0) {
              currentSum -= tax.balanceValue;
            } else {
              currentSum += tax.balanceValue;
            }
          }
        });
      });
    }

    // check if credit or debit
    if (liabilityAccount.ifCreditOrDebit) {
      liabilityAccount.ifCreditOrDebit.forEach(creditOrDebit => {
        currentTaxonomy = processTaxonomySum(Math.abs(creditOrDebit), accounts);
        currentTaxonomy.forEach(tax => {
          if (tax.balanceType === 'debit') {
            currentSum -= tax.balanceValue;
          } else {
            currentSum += tax.balanceValue;
          }
        });
      });
    }
    liabilities.nonCurrent.push({
      name: liabilityAccount.name,
      value: currentSum,
    });
    totalNonCurrent += currentSum;
    currentSum = 0;
  });

  liabilities.totalCurrent = totalCurrent;
  liabilities.totalNonCurrent = totalNonCurrent;
  liabilities.total = totalCurrent + totalNonCurrent;

  console.log(liabilities);
  return liabilities;
};

const calculateBalanceSheet = accounts => {
  const balanceSheetResponse = {};
  balanceSheetResponse.assets = calculateAssets(accounts);
  balanceSheetResponse.liabilities = calculateLiabilities(accounts);
  balanceSheetResponse.equity = calculateEquity(accounts);
  return balanceSheetResponse;
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
    currentAccount = processJournalEntries(accounts, account, false);
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
  const revenueFromSales = processJournalEntries(journal, '71', false); // TODO year
  const cogs = processJournalEntries(journal, '61', false);
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

    if (!req.query.monthly || !req.query.accountId) {
      res.json({
        error:
          'The request should be as follows: /api/financial/accountBalance?accountId=<accountId>&monthly=<true|false>',
      });
      return;
    }

    const totalJournalValues = processJournalEntries(
      journalEntries,
      req.query.accountId,
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
      false,
    ); // TODO date

    res.json(Number((totalDebit - totalCredit).toFixed(2)));
  });

  server.get('/api/financial/equity', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const equity = calculateEquity(accounts);
    res.json(parseFloat(equity.total));
  });

  server.get('/api/financial/assets', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const assets = calculateAssets(accounts);
    res.json(parseFloat(assets.total));
  });

  server.get('/api/financial/liabilities', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const liabilities = calculateLiabilities(accounts);
    res.json(parseFloat(liabilities.total));
  });

  server.get('/api/financial/balance-sheet', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const balanceSheetResponse = calculateBalanceSheet(accounts);
    res.json(balanceSheetResponse);
  });

  server.get('/api/financial/liabilities/current', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json(calculateLiabilities(accounts).totalCurrent);
  });

  server.get('/api/financial/assets/current', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json(calculateAssets(accounts).totalCurrent);
  });

  server.get('/api/financial/assets/cash', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json(calculateCash(accounts));
  });

  server.get('/api/financial/ratios/cash', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const assets = calculateAssets(accounts);
    let i = 0;
    // eslint-disable-next-line
    for (i; i < assets.current.length; i++) {
      if (assets.current[i].name == 'Cash and bank deposits') {
        break;
      }
    }
    const currentLiabilities = calculateLiabilities(accounts).totalCurrent;
    res.json((assets.current[i].value / currentLiabilities).toFixed(2));
  });

  server.get('/api/financial/ratios/current', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const currentAssets = calculateAssets(accounts).totalCurrent;
    const currentLiabilities = calculateLiabilities(accounts).totalCurrent;
    res.json((currentAssets / currentLiabilities).toFixed(2));
  });

  server.get('/api/financial/working-capital', (req, res) => {
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    const currentAssets = calculateAssets(accounts).totalCurrent;
    const currentLiabilities = calculateLiabilities(accounts).totalNonCurrent;
    res.json((currentAssets - currentLiabilities).toFixed(2));
  });

  server.get('/api/financial/gross-profit-margin', (req, res) => {
    const journal = db.GeneralLedgerEntries.Journal;
    const grossProfit = calculateGrossProfitMargin(journal);
    res.json(grossProfit);
  });
};

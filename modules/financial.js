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
    expensesPersonnel.totalDebit - expensesPersonnel.totalDebit;

  return (
    earningsSalesValue +
    earningsServicesValue -
    (expensesCogsValue + expensesServicesValue + expensesPersonnelValue)
  ).toFixed(2);
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

module.exports = (server, db) => {
  /**
   * @param accountId
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

  /**
   * @param accountId
   * NEED TO ADD THE YEAR PARAMETER
   */
  server.get('/api/financial/accountBalanceSheet', (req, res) => {
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
    res.json({ ebitda: calculateEbitda(accounts) });
  });
};

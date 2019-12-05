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

const fetchAccount = (accounts, accountId) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].AccountID == accountId) {
      return accounts[i];
    }
  }
  return null;
};

const calculateEbitda = accounts => {
  const earningsSales = fetchAccount(accounts, 71);
  const earningsServices = fetchAccount(accounts, 72);
  const expensesCogs = fetchAccount(accounts, 61);
  const expensesServices = fetchAccount(accounts, 62);
  const expensesPersonnel = fetchAccount(accounts, 63);

  console.log(earningsSales);
  const earningsSalesValue = !earningsSales
    ? 0
    : parseFloat(earningsSales.ClosingCreditBalance) -
      parseFloat(earningsSales.ClosingDebitBalance);
  const earningsServicesValue = !earningsServices
    ? 0
    : parseFloat(earningsServices.ClosingCreditBalance) -
      parseFloat(earningsServices.ClosingDebitBalance);
  const expensesCogsValue = !expensesCogs
    ? 0
    : parseFloat(expensesCogs.ClosingCreditBalance) -
      parseFloat(expensesCogs.ClosingDebitBalance);
  const expensesServicesValue = !expensesServices
    ? 0
    : parseFloat(expensesServices.ClosingCreditBalance) -
      parseFloat(expensesServices.ClosingDebitBalance);
  const expensesPersonnelValue = !expensesPersonnel
    ? 0
    : parseFloat(expensesPersonnel.ClosingCreditBalance) -
      parseFloat(expensesPersonnel.ClosingDebitBalance);

  return (
    earningsSalesValue +
    earningsServicesValue -
    expensesServicesValue -
    expensesPersonnelValue -
    expensesCogsValue
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
    const accounts = db.MasterFiles.GeneralLedgerAccounts.Account;
    res.json({ ebitda: calculateEbitda(accounts) });
  });
};

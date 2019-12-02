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

const processTransactions = (transactions, accountId) => {
  const totalJournalValues = {
    totalCredit: 0,
    totalDebit: 0,
  };

  let currentTransaction;
  if (Array.isArray(transactions)) {
    transactions.forEach(transaction => {
      if (transaction.Lines) {
        currentTransaction = processTransactionLines(
          transaction.Lines,
          accountId,
        );
        totalJournalValues.totalCredit += currentTransaction.totalCredit;
        totalJournalValues.totalDebit += currentTransaction.totalDebit;
      }
    });
  } else if (transactions.Lines) {
    currentTransaction = processTransactionLines(transactions.Lines, accountId);
    totalJournalValues.totalCredit += currentTransaction.totalCredit;
    totalJournalValues.totalDebit += currentTransaction.totalDebit;
  }

  return totalJournalValues;
};

const processJournalEntries = (entries, accountId) => {
  const totalLedgerValues = {
    totalCredit: 0,
    totalDebit: 0,
  };

  let currentJournal;
  if (Array.isArray(entries)) {
    entries.forEach(entry => {
      if (entry.Transaction) {
        currentJournal = processTransactions(entry.Transaction, accountId);
        totalLedgerValues.totalCredit += currentJournal.totalCredit;
        totalLedgerValues.totalDebit += currentJournal.totalDebit;
      }
    });
  } else if (entries.Transaction) {
    currentJournal = processTransactions(entries.Transaction, accountId);
    totalLedgerValues.totalCredit += currentJournal.totalCredit;
    totalLedgerValues.totalDebit += currentJournal.totalDebit;
  }

  return totalLedgerValues;
};

module.exports = (server, db) => {
  server.get('/api/financial/cogs', (req, res) => {
    const journalEntries = db.GeneralLedgerEntries.Journal;
    const monthlyCumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const totalJournalValues = processJournalEntries(
      journalEntries,
      req.query.accountId,
    );

    res.json(totalJournalValues);
  });
};

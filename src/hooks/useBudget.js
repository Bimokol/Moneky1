import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_CURRENCY } from '../constants/currencies';
import { loadState, saveCurrency, saveTransactions } from '../storage';

// Операция: { id, type: 'income' | 'expense', amount (копейки), note, date (ISO) }
export function useBudget() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadState()
      .then((state) => {
        setTransactions(state.transactions);
        setCurrencyState(state.currency);
      })
      .catch((e) => console.warn('Не удалось загрузить данные', e))
      .finally(() => setLoading(false));
  }, []);

  const updateTransactions = useCallback((updater) => {
    setTransactions((prev) => {
      const next = updater(prev);
      saveTransactions(next).catch((e) => console.warn('Не удалось сохранить', e));
      return next;
    });
  }, []);

  const addTransaction = useCallback(
    (type, amount, note) => {
      const transaction = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        amount,
        note: note.trim(),
        date: new Date().toISOString(),
      };
      updateTransactions((prev) => [transaction, ...prev]);
    },
    [updateTransactions]
  );

  const removeTransaction = useCallback(
    (id) => updateTransactions((prev) => prev.filter((t) => t.id !== id)),
    [updateTransactions]
  );

  const setCurrency = useCallback((code) => {
    setCurrencyState(code);
    saveCurrency(code).catch((e) => console.warn('Не удалось сохранить', e));
  }, []);

  const balance = useMemo(
    () => transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0),
    [transactions]
  );

  return { transactions, balance, currency, loading, addTransaction, removeTransaction, setCurrency };
}

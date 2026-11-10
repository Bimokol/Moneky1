import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_CURRENCY } from './constants/currencies';

const TRANSACTIONS_KEY = '@moneky/transactions';
const CURRENCY_KEY = '@moneky/currency';

export async function loadState() {
  const [[, rawTransactions], [, currency]] = await AsyncStorage.multiGet([
    TRANSACTIONS_KEY,
    CURRENCY_KEY,
  ]);
  return {
    transactions: rawTransactions ? JSON.parse(rawTransactions) : [],
    currency: currency ?? DEFAULT_CURRENCY,
  };
}

export function saveTransactions(transactions) {
  return AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

export function saveCurrency(currency) {
  return AsyncStorage.setItem(CURRENCY_KEY, currency);
}

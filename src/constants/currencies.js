export const CURRENCIES = [
  { code: 'UAH', symbol: '₴', name: 'Украинская гривна' },
  { code: 'USD', symbol: '$', name: 'Доллар США' },
  { code: 'EUR', symbol: '€', name: 'Евро' },
  { code: 'PLN', symbol: 'zł', name: 'Польский злотый' },
];

export const DEFAULT_CURRENCY = 'UAH';

export function getCurrency(code) {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

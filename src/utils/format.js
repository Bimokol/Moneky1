import { getCurrency } from '../constants/currencies';

const MONTHS = [
  'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
];

const pad = (n) => String(n).padStart(2, '0');

// Суммы хранятся в копейках (целые числа), чтобы не накапливать ошибки округления.
export function formatAmount(cents, currencyCode, { withSign = false } = {}) {
  const abs = Math.abs(cents);
  const whole = String(Math.floor(abs / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const fraction = pad(abs % 100);
  let sign = '';
  if (cents < 0) sign = '−';
  else if (withSign && cents > 0) sign = '+';
  return `${sign}${whole},${fraction} ${getCurrency(currencyCode).symbol}`;
}

// Превращает ввод пользователя ("1 250,50") в копейки. Возвращает null, если ввод некорректен.
export function parseAmountToCents(input) {
  const normalized = input.replace(/\s/g, '').replace(',', '.');
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) return null;
  const cents = Math.round(parseFloat(normalized) * 100);
  return cents > 0 ? cents : null;
}

export function formatDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const year = d.getFullYear() === now.getFullYear() ? '' : ` ${d.getFullYear()}`;
  return `${d.getDate()} ${MONTHS[d.getMonth()]}${year}, ${time}`;
}

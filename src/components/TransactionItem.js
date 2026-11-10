import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';
import { formatAmount, formatDate } from '../utils/format';

export default function TransactionItem({ transaction, currency, onLongPress }) {
  const isIncome = transaction.type === 'income';
  const signedAmount = isIncome ? transaction.amount : -transaction.amount;

  return (
    <Pressable
      onLongPress={() => onLongPress(transaction)}
      delayLongPress={350}
      accessibilityHint="Удерживайте, чтобы удалить"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.info}>
        <Text style={styles.note} numberOfLines={1}>
          {transaction.note || (isIncome ? 'Доход' : 'Расход')}
        </Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
      <Text style={[styles.amount, { color: isIncome ? colors.income : colors.expense }]}>
        {formatAmount(signedAmount, currency, { withSign: true })}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: 12,
    gap: spacing.md,
    ...shadow,
    shadowOpacity: 0.04,
    elevation: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  info: {
    flex: 1,
  },
  note: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: 13,
    color: colors.textMuted,
  },
  amount: {
    fontSize: 17,
    fontWeight: '600',
  },
});

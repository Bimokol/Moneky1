import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';
import { formatAmount } from '../utils/format';

export default function BalanceCard({ balance, currency }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Баланс</Text>
      <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
        {formatAmount(balance, currency)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    ...shadow,
  },
  label: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  amount: {
    fontSize: 44,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -1,
  },
});

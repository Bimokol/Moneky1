import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

export default function ActionButtons({ onIncome, onExpense }) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onExpense}
        accessibilityRole="button"
        accessibilityLabel="Списать деньги"
        style={({ pressed }) => [styles.button, styles.secondary, pressed && styles.pressed]}
      >
        <Text style={[styles.sign, styles.secondaryText]}>−</Text>
        <Text style={[styles.label, styles.secondaryText]}>Расход</Text>
      </Pressable>
      <Pressable
        onPress={onIncome}
        accessibilityRole="button"
        accessibilityLabel="Добавить деньги"
        style={({ pressed }) => [styles.button, styles.primary, pressed && styles.pressed]}
      >
        <Text style={[styles.sign, styles.primaryText]}>+</Text>
        <Text style={[styles.label, styles.primaryText]}>Доход</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.accent,
    ...shadow,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  sign: {
    fontSize: 26,
    fontWeight: '500',
    lineHeight: 30,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.accentText,
  },
  secondaryText: {
    color: colors.text,
  },
});

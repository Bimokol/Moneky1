import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { CURRENCIES } from '../constants/currencies';
import { colors, radius, shadow, spacing } from '../theme';

export default function SettingsModal({ visible, currency, onSelectCurrency, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>Настройки</Text>
          <Text style={styles.section}>Валюта</Text>

          {CURRENCIES.map((item) => {
            const selected = item.code === currency;
            return (
              <Pressable
                key={item.code}
                onPress={() => onSelectCurrency(item.code)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                style={({ pressed }) => [styles.option, selected && styles.optionSelected, pressed && styles.pressed]}
              >
                <Text style={styles.symbol}>{item.symbol}</Text>
                <View style={styles.optionInfo}>
                  <Text style={styles.code}>{item.code}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                {selected && <Text style={styles.check}>✓</Text>}
              </Pressable>
            );
          })}

          <Pressable onPress={onClose} style={({ pressed }) => [styles.done, pressed && styles.pressed]}>
            <Text style={styles.doneText}>Готово</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  section: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: 12,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  optionSelected: {
    backgroundColor: colors.background,
  },
  pressed: {
    opacity: 0.6,
  },
  symbol: {
    width: 32,
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  optionInfo: {
    flex: 1,
  },
  code: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  name: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  check: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  done: {
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  doneText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
});

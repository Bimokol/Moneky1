import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getCurrency } from '../constants/currencies';
import { colors, radius, shadow, spacing } from '../theme';
import { parseAmountToCents } from '../utils/format';

// type: 'income' | 'expense' | null (null — окно скрыто)
export default function TransactionModal({ type, currency, onSubmit, onClose }) {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (type) {
      setAmount('');
      setNote('');
    }
  }, [type]);

  const isIncome = type === 'income';
  const cents = parseAmountToCents(amount);

  const submit = () => {
    if (cents === null) return;
    onSubmit(type, cents, note);
    onClose();
  };

  return (
    <Modal visible={type !== null} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      {/* Карточка прижата к верху экрана, чтобы клавиатура её не перекрывала */}
      <Pressable style={[styles.overlay, { paddingTop: insets.top + spacing.xl }]} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>{isIncome ? 'Новый доход' : 'Новый расход'}</Text>

          <View style={styles.amountRow}>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
              autoFocus
              maxLength={12}
              accessibilityLabel="Сумма"
            />
            <Text style={styles.currency}>{getCurrency(currency).symbol}</Text>
          </View>

          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder={isIncome ? 'Заметка: зарплата…' : 'Заметка: продукты…'}
            placeholderTextColor={colors.textMuted}
            maxLength={60}
            returnKeyType="done"
            onSubmitEditing={submit}
            accessibilityLabel="Заметка"
          />

          <View style={styles.buttons}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.button, styles.cancel, pressed && styles.pressed]}
            >
              <Text style={styles.cancelText}>Отмена</Text>
            </Pressable>
            <Pressable
              onPress={submit}
              disabled={cents === null}
              style={({ pressed }) => [
                styles.button,
                styles.confirm,
                cents === null && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.confirmText}>{isIncome ? 'Добавить' : 'Списать'}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
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
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  amountInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 40,
    fontWeight: '700',
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  currency: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textMuted,
  },
  noteInput: {
    fontSize: 17,
    color: colors.text,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    marginBottom: spacing.lg,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 54,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    backgroundColor: colors.background,
  },
  confirm: {
    backgroundColor: colors.accent,
  },
  disabled: {
    opacity: 0.3,
  },
  pressed: {
    opacity: 0.7,
  },
  cancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  confirmText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.accentText,
  },
});

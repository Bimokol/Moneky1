import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ActionButtons from '../components/ActionButtons';
import BalanceCard from '../components/BalanceCard';
import SettingsModal from '../components/SettingsModal';
import TransactionList from '../components/TransactionList';
import TransactionModal from '../components/TransactionModal';
import { useBudget } from '../hooks/useBudget';
import { colors, radius, spacing } from '../theme';
import { formatAmount } from '../utils/format';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { transactions, balance, currency, loading, addTransaction, removeTransaction, setCurrency } = useBudget();
  const [modalType, setModalType] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const confirmDelete = useCallback(
    (transaction) => {
      const signed = transaction.type === 'income' ? transaction.amount : -transaction.amount;
      const message = `${formatAmount(signed, currency, { withSign: true })}${
        transaction.note ? ` · ${transaction.note}` : ''
      }`;

      // Alert в браузере не работает, поэтому для web — стандартный confirm
      if (Platform.OS === 'web') {
        if (window.confirm(`Удалить операцию?\n${message}`)) removeTransaction(transaction.id);
        return;
      }
      Alert.alert('Удалить операцию?', message, [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: () => removeTransaction(transaction.id) },
      ]);
    },
    [currency, removeTransaction]
  );

  if (loading) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  const header = (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>Бюджет</Text>
        <Pressable
          onPress={() => setSettingsVisible(true)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Настройки"
          style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}
        >
          <Text style={styles.settingsText}>{currency}</Text>
        </Pressable>
      </View>

      <BalanceCard balance={balance} currency={currency} />

      <View style={styles.actions}>
        <ActionButtons onIncome={() => setModalType('income')} onExpense={() => setModalType('expense')} />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Операции</Text>
        {transactions.length > 0 && <Text style={styles.hint}>Удерживайте, чтобы удалить</Text>}
      </View>
    </View>
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <TransactionList
        transactions={transactions}
        currency={currency}
        onItemLongPress={confirmDelete}
        header={header}
        bottomInset={insets.bottom}
      />

      <TransactionModal
        type={modalType}
        currency={currency}
        onSubmit={addTransaction}
        onClose={() => setModalType(null)}
      />
      <SettingsModal
        visible={settingsVisible}
        currency={currency}
        onSelectCurrency={setCurrency}
        onClose={() => setSettingsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  settingsButton: {
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
  },
  settingsText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  pressed: {
    opacity: 0.6,
  },
  actions: {
    marginTop: spacing.md,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  hint: {
    fontSize: 13,
    color: colors.textMuted,
  },
});

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions, currency, onItemLongPress, header, bottomInset }) {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TransactionItem transaction={item} currency={currency} onLongPress={onItemLongPress} />
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Пока пусто</Text>
          <Text style={styles.emptyText}>Добавьте первый доход или расход</Text>
        </View>
      }
      contentContainerStyle={[styles.content, { paddingBottom: bottomInset + spacing.lg }]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
  },
});

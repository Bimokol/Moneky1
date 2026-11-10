# Moneky — учёт личного бюджета

Простое мобильное приложение на React Native + Expo. Данные хранятся локально на телефоне (AsyncStorage), бэкенда нет.

## Возможности

- Текущий баланс крупной цифрой
- Добавление дохода («+») и расхода («−»): сумма, необязательная заметка, дата проставляется автоматически
- Список операций: доходы зелёным, расходы красным
- Удаление операции долгим нажатием
- Выбор валюты (UAH, USD, EUR, PLN) — кнопка с кодом валюты в правом верхнем углу

## Запуск на телефоне

1. Установите [Node.js](https://nodejs.org) (LTS) на компьютер.
2. Установите приложение **Expo Go** на телефон (App Store / Google Play).
3. В папке проекта выполните:

   ```bash
   npm install
   npx expo start
   ```

4. Отсканируйте QR-код из терминала: на Android — в приложении Expo Go, на iPhone — обычной камерой.

Телефон и компьютер должны быть в одной Wi-Fi сети. Если не подключается, запустите `npx expo start --tunnel`.

## Структура

```
App.js                      точка входа
src/
  screens/HomeScreen.js     главный экран
  components/               BalanceCard, ActionButtons, TransactionList,
                            TransactionItem, TransactionModal, SettingsModal
  hooks/useBudget.js        состояние: операции, баланс, валюта
  storage.js                чтение/запись AsyncStorage
  utils/format.js           форматирование сумм и дат
  constants/currencies.js   список валют
  theme.js                  цвета, отступы, тени
```

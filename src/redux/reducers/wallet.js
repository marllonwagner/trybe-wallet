import { GET_COINS, SAVE_EXPENSE,
  SAVE_DATA, RECEIVE_EXPENSES, UPDATE_EXPENSES, EDIT_EXPENSE } from '../actions';

const initialState = {
  // totalMoney: 0,
  // cambio: 0,
  // expensesMock: [],

  dataCoins: [],
  receiveExpenses: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  currencies: [], // array de string
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};
function wallet(state = initialState, action) {
  switch (action.type) {
  case SAVE_DATA:
    return {
      ...state,
      dataCoins: action.payload,
    };
  case GET_COINS:
    return {
      ...state,
      currencies: action.payload.coins,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.receiveExpenses,
        {
          id: state.receiveExpenses.length,
          value: action.value,
          description: action.description,
          currency: action.currency,
          method: action.method,
          tag: action.tag,
          exchangeRates: state.dataCoins,
        }],
    };
  case RECEIVE_EXPENSES:
    return {
      ...state,
      receiveExpenses: state.receiveExpenses
        .concat(state.expenses[state.receiveExpenses.length]),
      // receiveExpenses: action.payload,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: action.payload.expensesLeft,
      receiveExpenses: action.payload.expensesLeft,
      editor: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  default:
    return state;
  }
}
export default wallet;

// case COIN_INFO:
//   return {
//     ...state,
//     cambio: action.ask,
//     totalMoney: state.totalMoney + Number(state.expensesMock.value) * (action.ask),
//     expenses: [...state.receiveExpenses,
//       { id: state.receiveExpenses.length,
//         value: state.expensesMock.value,
//         description: state.expensesMock.description,
//         currency: state.expensesMock.currency,
//         method: state.expensesMock.method,
//         tag: state.expensesMock.tag,
//         exchangeRates: state.dataCoins,
//         ask: action.ask,
//         name: action.name,
//         code: action.code,
//       },
//     ],
//   };

// case SAVE_MONEY:
//   return {
//     ...state,
//     totalMoney: state.totalMoney + Number(action.payload) * (state.cambio),
//   };

// expensesMock: {
//   id: 0,
//   value: action.value,
//   description: action.description,
//   currency: action.currency,
//   method: action.paymentMethod,
//   tag: action.category,
// }
// case COIN_INFO:
//   return {
//     ...state,
//     coinInfo: {
//       ask: action.ask,
//       name: action.name,
//       code: action.code,
//     },
//   };

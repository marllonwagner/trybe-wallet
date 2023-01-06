// Coloque aqui suas actions
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_MONEY = 'SAVE_MONEY';
export const GET_COINS = 'GET_COINS';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const COIN_INFO = 'COIN_INFO';
export const SAVE_DATA = 'SAVE_DATA';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const receiveExpenses = () => ({
  type: RECEIVE_EXPENSES,

});

export const getCoins = (coins) => ({
  type: GET_COINS,
  payload: {
    coins,
  },
});

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export const saveMoney = (money = 0) => ({
  type: SAVE_MONEY,
  payload: money,

});

export const saveExpense = ([value, description,
  currency, method, tag]) => ({
  type: SAVE_EXPENSE,
  value,
  description,
  currency,
  method,
  tag,
});

export const coinInfo = ([ask, name, code]) => ({
  type: COIN_INFO,
  ask,
  name,
  code,

});

export const saveData = (data) => ({
  type: SAVE_DATA,
  payload: data,
});

export const updateExpenses = (expensesLeft) => ({
  type: UPDATE_EXPENSES,
  payload: { expensesLeft,
  },
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,

});
// function requestSuccessful(imageURL) {
//   return {
//     type: REQUEST_SUCCESSFUL,
//     payload: imageURL,

//   };
// }

function requestFailed(error) {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
}

// function saveData(data) {
//   const savedData = data;
//   return savedData;
// }
// function requestStarted() {
//   return { type: REQUEST_STARTED };
// }

export function fetchCoins() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => [delete data.USDT, dispatch(getCoins(Object.keys(data))),
        dispatch(saveData(data))])
      .catch((error) => dispatch(requestFailed(error)));
  };
}

// export const fetchCoins = () => async (dispatch) => {
//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await response.json();
//   delete data.USDT;
//   dispatch(getCoins(Object.keys(data)));
// };

export const fetchCurrency = (coin) => async (dispatch) => {
  try {
    const response = await fetch(`https://economia.awesomeapi.com.br/json/${coin}`);
    const data = await response.json();
    const axk = data[0].ask;
    const nme = data[0].name;
    const cde = data[0].code;
    dispatch(coinInfo([axk, nme, cde]));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

// export function fetchCurrency(coin) {
//   return (dispatch) => {
//     fetch(`https://economia.awesomeapi.com.br/json/${coin}`)
//       .then((response) => response.json())
//       .then((data) => dispatch(coinInfo([data[0].code, data[0].name, data[0].ask])))
//       .catch((error) => dispatch(requestFailed(error)));
//   };
// }

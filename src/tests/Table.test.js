import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Wallet from '../pages/Wallet';
import Table from '../components/Table';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData, { expenseMock } from './helpers/mockData';
import WalletForm from '../components/WalletForm';
import WalletFormEditor from '../components/WalletFormEditor';

// const INITIAL_STATE = {
//   wallet: {
//     expenses: expenseMock,
//     receiveExpenses: expenseMock,
//     currencies: Object.keys(mockData).filter((e) => e !== 'USDT'),
//     editor: false,
//     idToEdit: 0,
//   },
// };

// describe('Table component test', () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       json: jest.fn().mockResolvedValue(expenseMock),
//     });
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
//   test('Table buttons should be on the screen ', async () => {
//     renderWithRouterAndRedux(<WalletForm />, { initalState: INITIAL_STATE });

//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');

//     const valueInput = screen.getByTestId('value-input');
//     const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
//     const inputDescEl = screen.getByTestId('description-input');
//     const currencyInput = screen.getByTestId('currency-input');
//     const categoryInput = screen.getByTestId('tag-input');
//     const methodInput = screen.getByTestId('method-input');

//     userEvent.type(valueInput, '5');
//     userEvent.type(inputDescEl, 'teste1');
//     userEvent.selectOptions(currencyInput, 'USD');
//     userEvent.selectOptions(categoryInput, 'Alimentação');
//     userEvent.selectOptions(methodInput, 'Dinheiro');
//     userEvent.click(addBtn);

//     // const tableEl = screen.getByTestId('expenseTable');
//     // expect(tableEl).toBeInTheDocument();

//     // const editBtn = screen.getAllByTestId('edit-btn')[0];
//     // expect(editBtn).toBeInTheDocument();
//     // expect(tableEl).toContainElement(editBtn);
//   });
// });

const INITIAL_STATE = {
  wallet: {
    expenses: expenseMock,
    receiveExpenses: expenseMock,
    currencies: Object.keys(mockData).filter((e) => e !== 'USDT'),
    editor: false,
    idToEdit: 0,
  },
};

describe('Test component WalletForm', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(expenseMock),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('fetch should be called and inserted values should be on the screen', async () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState: INITIAL_STATE });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');

    const valueInput = screen.getByTestId('value-input');
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    const inputDescEl = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const categoryInput = screen.getByTestId('tag-input');
    const methodInput = screen.getByTestId('method-input');

    userEvent.type(valueInput, '5');
    userEvent.type(inputDescEl, 'teste1');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(categoryInput, 'Alimentação');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.click(addBtn);

    renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });

    const tableEl = screen.getByTestId('expenseTable');
    expect(tableEl).toBeInTheDocument();

    const descCell = screen.getByRole('cell', { name: /teste1/i });
    expect(descCell).toHaveTextContent(/teste1/i);

    const tagCell = screen.getByRole('cell', { name: /alimentação/i });
    expect(tagCell).toHaveTextContent(/alimentação/i);

    const methodCell = screen.getByRole('cell', { name: /dinheiro/i });
    expect(methodCell).toHaveTextContent(/dinheiro/i);

    const valueCell = screen.getByRole('cell', { name: /5\.00/i });
    expect(valueCell).toHaveTextContent(/5\.00/i);

    const currencyCell = screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
    expect(currencyCell).toHaveTextContent(/dólar americano\/real brasileiro/i);

    const exchangeCell = screen.getByRole('cell', { name: /4\.75/i });
    expect(exchangeCell).toHaveTextContent(/4\.75/i);

    const convertedCell = screen.getByRole('cell', { name: /23\.77/i });
    expect(convertedCell).toHaveTextContent(/23\.77/i);

    const realCell = screen.getAllByText('Real')[0];
    expect(realCell).toHaveTextContent('Real');

    const editBtn = screen.getAllByTestId('edit-btn');
    expect(editBtn).toHaveLength(2);
    userEvent.click(editBtn[0]);

    renderWithRouterAndRedux(<WalletFormEditor />, { initialState: INITIAL_STATE });

    const expenseEditBtn = screen.getByRole('button', { name: /editar despesa/i });
    expect(expenseEditBtn).toBeInTheDocument();

    // expect(valueInput).toHaveValue('');
    // expect(inputDescEl).toHaveValue('');
    // expect(currencyInput).toHaveValue('USD');
    // expect(categoryInput).toHaveValue('Alimentação');
    // expect(methodInput).toHaveValue('Dinheiro');
  });
});

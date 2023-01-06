import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import Wallet from '../pages/Wallet';
import mockData, { expenseMock } from './helpers/mockData';
import WalletForm from '../components/WalletForm';
import WalletFormEditor from '../components/WalletFormEditor';

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

    expect(valueInput).toHaveValue(5);
    expect(inputDescEl).toHaveValue('teste1');
    expect(currencyInput).toHaveValue('USD');
    expect(categoryInput).toHaveValue('Alimentação');
    expect(methodInput).toHaveValue('Dinheiro');
  });
});

describe('Test component WalletFormEditor', () => {
  test('correct inserted values to edit should be on the screen', async () => {
    renderWithRouterAndRedux(<WalletFormEditor />, { initialState: INITIAL_STATE });

    const valueInput = screen.getByTestId('value-input');
    const editExpBtn = screen.getByRole('button', { name: /editar despesa/i });
    const inputDescEl = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const categoryInput = screen.getByTestId('tag-input');
    const methodInput = screen.getByTestId('method-input');

    userEvent.type(valueInput, '20');
    userEvent.type(inputDescEl, 'teste2');
    userEvent.selectOptions(currencyInput, 'CAD');
    userEvent.selectOptions(categoryInput, 'Lazer');
    userEvent.selectOptions(methodInput, 'Cartão de débito');

    userEvent.click(editExpBtn);

    const editBtn = screen.getAllByRole('button', { name: /editar/i })[0];
    expect(editBtn).toBeInTheDocument();

    userEvent.click(editBtn);

    // const descTabEl = screen.getByRole('cell', { name: /lazer/i });
    // expect(descTabEl).toBeInTheDocument();

    // const delBtn = screen.getAllByTestId('delete-btn')[1];
    // expect(delBtn).toBeInTheDocument();
    // expect(valueInput).toHaveValue(5);
    // expect(inputDescEl).toHaveValue('teste1');
    // expect(currencyInput).toHaveValue('USD');
    // expect(categoryInput).toHaveValue('Alimentação');
    // expect(methodInput).toHaveValue('Dinheiro');
  });
});

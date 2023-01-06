import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Test of Header on Wallet page', () => {
  test('Email(Header element, show user E-mail), should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const emailEl = screen.getByTestId('email-field');
    expect(emailEl).toBeInTheDocument();
    expect(emailEl).toHaveTextContent(/email:/i);
  });

  test('Total Field(Header element, shows total expenses), should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalFieldEl = screen.getByTestId('total-field');
    expect(totalFieldEl).toBeInTheDocument();
    expect(totalFieldEl).toHaveTextContent(/0\.00/i);
  });

  test('Currency Field(Header element, shows user currency), should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const curFieldEl = screen.getByTestId('header-currency-field');
    expect(curFieldEl).toBeInTheDocument();
    expect(curFieldEl).toHaveTextContent(/brl/i);
  });
});

describe('Test of Form on Wallet page', () => {
  test('Form element, should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldAndFormEl = screen.getByTestId('addForm');

    expect(fieldAndFormEl).toBeInTheDocument();
  });

  test('Number input with text Valor, should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldAndFormEl = screen.getByTestId('addForm');
    expect(fieldAndFormEl).toBeInTheDocument();

    const TextInputNumEl = screen.getByText(/valor:/i);
    const inputNumEl = screen.getByTestId('value-input');
    expect(TextInputNumEl).toBeInTheDocument();
    expect(inputNumEl).toBeInTheDocument();
    expect(inputNumEl).toHaveTextContent('');
  });

  test('Description input with text Descrição, should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldAndFormEl = screen.getByTestId('addForm');
    expect(fieldAndFormEl).toBeInTheDocument();

    const TextInputDescEl = screen.getByText(/descrição:/i);
    const inputDescEl = screen.getByTestId('description-input');
    expect(TextInputDescEl).toBeInTheDocument();
    expect(inputDescEl).toBeInTheDocument();
    expect(inputDescEl).toHaveTextContent('');
  });

  test('Select Currency with text Moeda, should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldAndFormEl = screen.getByTestId('addForm');
    expect(fieldAndFormEl).toBeInTheDocument();

    const selectCurrencyText = screen.getByText(/moeda:/i);
    const currencyInput = screen.getByTestId('currency-input');
    expect(selectCurrencyText).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();

    expect(currencyInput).toHaveLength(0);
  });

  test('Select Method with text Metodo de pagamento, should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldAndFormEl = screen.getByTestId('addForm');
    expect(fieldAndFormEl).toBeInTheDocument();

    const selectMethodText = screen.getByText(/metodo de pagamento:/i);
    const methodInput = screen.getByTestId('method-input');
    expect(selectMethodText).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();

    expect(methodInput).toHaveLength(3);
  });

  test('Select Category with text categoria, should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldAndFormEl = screen.getByTestId('addForm');
    expect(fieldAndFormEl).toBeInTheDocument();

    const selectCategoryText = screen.getByText(/categoria:/i);
    const categoryInput = screen.getByTestId('tag-input');
    expect(selectCategoryText).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();

    expect(categoryInput).toHaveLength(5);
  });

  test('Button with text Adiciona despesa, should be on screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldAndFormEl = screen.getByTestId('addForm');
    expect(fieldAndFormEl).toBeInTheDocument();

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addBtn).toBeInTheDocument();
    expect(addBtn).toHaveTextContent(/adicionar despesa/i);
  });
});

describe('Test of Table in Wallet Page', () => {
  test('table element should be on the screen', () => {
    renderWithRouterAndRedux(<Wallet />);

    const tableEl = screen.getByRole('table');
    expect(tableEl).toBeInTheDocument();
  });

  test('Table text(Descrição), should be in the Table', () => {
    renderWithRouterAndRedux(<Wallet />);

    const tableEl = screen.getByRole('table');
    expect(tableEl).toBeInTheDocument();

    const descripTable = screen.getByRole('columnheader', { name: /descrição/i });
    expect(descripTable).toBeInTheDocument();
    expect(descripTable).toHaveTextContent(/descrição/i);
    expect(tableEl).toContainElement(descripTable);
  });

  test('Table text(Tag), should be in the Table', () => {
    renderWithRouterAndRedux(<Wallet />);

    const tableEl = screen.getByRole('table');
    expect(tableEl).toBeInTheDocument();

    const tagTable = screen.getByRole('columnheader', { name: /tag/i });
    expect(tagTable).toBeInTheDocument();
    expect(tagTable).toHaveTextContent(/tag/i);
    expect(tableEl).toContainElement(tagTable);
  });

  test('Table text(Método de pagamento), should be in the Table', () => {
    renderWithRouterAndRedux(<Wallet />);

    const tableEl = screen.getByRole('table');
    expect(tableEl).toBeInTheDocument();

    const methodTable = screen.getByRole('columnheader', { name: /método de pagamento/i });
    expect(methodTable).toBeInTheDocument();
    expect(methodTable).toHaveTextContent(/método de pagamento/i);
    expect(tableEl).toContainElement(methodTable);
  });
});

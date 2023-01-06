import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import mockData, { expenseMock } from './helpers/mockData';

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    expenses: expenseMock,
    receiveExpenses: expenseMock,
    currencies: Object.keys(mockData).filter((e) => e !== 'USDT'),
    editor: false,
    idToEdit: 0,
  },
};

describe('Component Header functions Test ', () => {
  test('Inserted e-mail on login page , should be on screen ', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });

    const emailEl = screen.getByText(/email:teste@teste\.com/i);
    expect(emailEl).toBeInTheDocument();

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeDefined();
    expect(totalField).toHaveTextContent('98.88');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('test Login Page elements', () => {
  test('test if an Email input on screen, works', () => {
    renderWithRouterAndRedux(<Login />);
    const email = 'teste@teste.com';

    const emailInputEl = screen.getByTestId('email-input');
    expect(emailInputEl).toBeInTheDocument();
    expect(emailInputEl).toHaveTextContent('');

    userEvent.type(emailInputEl, email);
    expect(emailInputEl).toHaveValue(email);
  });

  test('test if  a password input on screen, works', () => {
    renderWithRouterAndRedux(<Login />);
    const password = '1234567';

    const passInputEl = screen.getByTestId('password-input');
    expect(passInputEl).toBeInTheDocument();
    expect(passInputEl).toHaveTextContent('');

    userEvent.type(passInputEl, password);
    expect(passInputEl).toHaveValue(password);
  });

  test('test if have a disabled button with text Entrar on screen', () => {
    renderWithRouterAndRedux(<Login />);

    const btnEl = screen.getByRole('button', { name: /entrar/i });
    expect(btnEl).toBeInTheDocument();
    expect(btnEl).toBeDisabled();
  });

  test('test if have a filedSet with a form and his elements in the document', () => {
    renderWithRouterAndRedux(<Login />);

    const filedSetEl = screen.getByRole('group');
    expect(filedSetEl).toBeInTheDocument();

    const formEl = screen.getByRole('form');
    expect(filedSetEl).toContainElement(formEl);
  });

  // test('test if have a filedSet with a form and his elements in the document', () => {
  //   renderWithRouterAndRedux(<Login />);

  //   const filedSetEl = screen.getByRole('group');
  //   expect(filedSetEl).toBeInTheDocument();

  //   const formEl = screen.getByRole('form');
  //   expect(filedSetEl).toContainElement(formEl);
  // });

  test('test if the button is enabled after insert correct email and password , and if after click it , tranfers to a new page', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const email = 'teste@teste.com';

    const emailInputEl = screen.getByTestId('email-input');
    expect(emailInputEl).toBeInTheDocument();
    expect(emailInputEl).toHaveTextContent('');

    const password = '1234567';

    const passInputEl = screen.getByTestId('password-input');
    expect(passInputEl).toBeInTheDocument();
    expect(passInputEl).toHaveTextContent('');

    const btnEl = screen.getByRole('button', { name: /entrar/i });
    expect(btnEl).toBeInTheDocument();
    expect(btnEl).toBeDisabled();

    userEvent.type(emailInputEl, email);
    userEvent.type(passInputEl, password);

    expect(btnEl).not.toBeDisabled();

    userEvent.click(btnEl);
    const actualUrl = history.location.pathname;
    expect(actualUrl).toEqual('/carteira');
  });
});

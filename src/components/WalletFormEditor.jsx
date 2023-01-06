import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateExpenses } from '../redux/actions';

class WalletFormEditor extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  // componentDidMount() {
  //   const { expenses } = this.props;
  //   console.log(expenses);
  // }

  handleChange = ({ target }) => {
    // const { currency } = this.state;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {

    });
  };

  handleExpense = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expenseToEdit = expenses.find((e) => e.id === idToEdit);
    const expenseEdited = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expenseToEdit.exchangeRates,
    };
    const expensesLeft = expenses.filter((e) => e.id !== idToEdit);
    dispatch(updateExpenses(expensesLeft));
    const arrExpensesEdited = [...expensesLeft, expenseEdited];
    // console.log(expensesLeft);
    // console.log(arrExpensesEdited.sort((a, b) => a.id - b.id));
    dispatch(updateExpenses(arrExpensesEdited.sort((a, b) => a.id - b.id)));
  };

  render() {
    const { currencies } = this.props;
    const { value,
      description,
      currency,
      method,
      tag,

    } = this.state;

    return (

      <div
        className="wallet-form-editor-container"
        data-testid="addForm"
      >
        <form
          className="wallet-form"
          action=""
        >

          <label
            className="description-label"
            htmlFor="description"
          >
            <span className="description-text">
              {' '}
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              Descrição da despesa

            </span>
            <input
              className="description-input"
              onChange={ this.handleChange }
              name="description"
              value={ description }
              data-testid="description-input"
              type="text"
            />
          </label>

          <label
            className="category-label"
            htmlFor="category"
          >
            <span className="category-text">

            &nbsp;
            &nbsp;
            &nbsp;

              Categoria da despesa
            </span>

            <select
              className="category"
              onChange={ this.handleChange }
              value={ tag }
              data-testid="tag-input"
              name="tag"
              id="category"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label
            className="value-label"
            htmlFor="value"
          >
            <span className="input-value-text">
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              Valor
            </span>

            <input
              className="input-value"
              onChange={ this.handleChange }
              // onChange={ () => [dispatch(saveExpense([value]))] }
              value={ value }
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
            />
          </label>
          <label
            className="currency-label"
            htmlFor="currency"
          >
            <span
              className="currency-text"
            >
              Moeda

            </span>
            <select
              className="currency"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
              data-testid="currency-input"
              id="currency"
            >
              { currencies && currencies.map((cur, i) => (
                <option key={ i }>{cur}</option>
              ))}
            </select>
          </label>

          <label
            className="method-label"
            htmlFor="paymentMethod"
          >
            <span className="method-text">Metodo de Pagamento</span>

            <select
              className="method"
              onChange={ this.handleChange }
              value={ method }
              data-testid="method-input"
              name="method"
              id="paymentMethod"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
        </form>
        <button
          className="form-btn"
          onClick={ this.handleExpense }
          type="button"
        >
          <span className="form-btn-text">Editar despesa</span>

        </button>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

WalletFormEditor.propTypes = {
  currencies: PropTypes.array,
  map: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletFormEditor);

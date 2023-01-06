import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpenses, editExpense } from '../redux/actions';
import '../css/table.css';
import editBtn from '../css/assets/editBtn.svg';
import deleteBtn from '../css/assets/deleteBtn.svg';

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const expensesLeft = expenses.filter((e) => e.id !== id);
    // dispatch(receiveExpenses(expensesLeft));
    dispatch(updateExpenses(expensesLeft));
    // return expensesLeft;

    // console.log(expenses);
  };

  excuteEditor = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table
          className="table"
          data-testid="expenseTable"
        >
          <thead className="thead">
            <tr className="tr">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => {
              const coinInfo = Object.values(e.exchangeRates !== undefined
                && e.exchangeRates)
                .find((el) => el.code === e.currency);
              return (
                <tr
                  key={ e.id }
                >

                  <td>{e.description}</td>
                  <td>{e.tag}</td>
                  <td>{e.method}</td>
                  <td>{Number(e.value).toFixed(2)}</td>
                  <td>{coinInfo.name.split('/Real Brasileiro')}</td>
                  <td>{Number(coinInfo.ask).toFixed(2)}</td>
                  <td>{(Number(coinInfo.ask) * Number(e.value)).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <div className="table-btns">
                      <input
                        className="edit-btn"
                        src={ editBtn }
                        type="image"
                        alt=""
                        onClick={ () => this.excuteEditor(e.id) }
                        data-testid="edit-btn"
                      />
                      <input
                        className="delete-btn"
                        type="image"
                        src={ deleteBtn }
                        alt=""
                        onClick={ () => this.deleteExpense(e.id) }
                        data-testid="delete-btn"
                      />
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  receiveExpenses: state.wallet.receiveExpenses,
  // coinInfo: state.wallet.coinInfo,
});

export default connect(mapStateToProps)(Table);

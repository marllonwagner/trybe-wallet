import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoHeader from '../css/assets/logoHeader.svg';
import '../css/header.css';
import moedas from '../css/assets/moedas.svg';
import emailLogo from '../css/assets/emailLogo.svg';

class Header extends Component {
  totalValue = () => {
    const { expenses } = this.props;
    const values = expenses.map((e) => {
      const arrExc = Object.entries(e.exchangeRates);
      const isCurrency = arrExc.find((el) => el[0] === e.currency);
      return Number(e.value) * Number(isCurrency[1].ask);
    });
    return values.reduce((acc, cur) => acc + cur, 0);
  };

  render() {
    const { email,
      // totalMoney
    } = this.props;
    return (
      <div className="wallet-header">

        <div className="logo-header-field">

          <img
            className="logo-header"
            src={ logoHeader }
            alt=""
          />

        </div>

        <p
          className="total-field"
          data-testid="total-field"
        >
          <img src={ moedas } alt="" />

          <span className="expenses-text">Total de despesas:</span>

          <span className="value-text">
            {this.totalValue().toFixed(2)}

            BRL
          </span>

        </p>
        <p data-testid="header-currency-field">  </p>

        <p
          className="email-field"
          data-testid="email-field"
        >

          <img src={ emailLogo } alt="" />
          <span className="email-text">
            Email:
            {' '}
            {email}
          </span>

        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  // totalMoney: state.wallet.totalMoney,
  // expensesMock: state.wallet.expensesMock,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  totalMoney: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);

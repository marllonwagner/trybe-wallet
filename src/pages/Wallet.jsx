import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import WalletFormEditor from '../components/WalletFormEditor';
import '../css/wallet.css';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      editor
        ? (
          <div className="wallet-main-container">
            <div className="wallet-header-container">
              <Header />
              <WalletFormEditor />
            </div>
            <div className="wallet-table-container">
              <Table />
            </div>
          </div>
        )
        : (
          <div className="wallet-main-container">
            <div className="wallet-header-container">
              <Header />
              <WalletForm />
            </div>

            <div className="wallet-table-container-aux" />

            <div className="wallet-table-container">
              <Table />
            </div>
          </div>

        )
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,

});

Wallet.propTypes = {
  currencies: PropTypes.array,
  map: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);

// export default Wallet;

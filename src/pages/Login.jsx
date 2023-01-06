import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { saveEmail, saveEmail as saveEmailAct } from '../redux/actions';
import { saveEmail, saveMoney } from '../redux/actions';
import loginLogo from '../css/assets/loginLogo.svg';
import '../css/login.css';

const passwordMin = 5;
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    submitBtnDisabled: true,
  };

  handleChange = (event) => {
    const { email, password } = this.state;
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
    if (email.includes('.com') && email.includes('@') && password.length >= passwordMin) {
      this.setState({ submitBtnDisabled: false });
    } else {
      this.setState({ submitBtnDisabled: true });
    }
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(saveEmail(email));
    dispatch(saveMoney(0));
    this.redirect();
  };

  redirect = () => {
    const { history } = this.props;
    history.push('/carteira');
    console.log('chamou');
  };

  render() {
    const { email, password, submitBtnDisabled } = this.state;
    // const { dispatch } = this.props;

    return (
      <div className="login-main-container">
        <div className="login-box">

          <form
            className="login-form"
            name="loginForm"
            data-testid="form"
            action=""
          >
            <img src={ loginLogo } alt="" />
            <input
              className="login-email-box"
              onChange={ this.handleChange }
              value={ email }
              placeholder="E-mail"
              data-testid="email-input"
              type="email"
              name="email"
              id="email"
            />
            <input
              className="login-pass-box"
              onChange={ this.handleChange }
              value={ password }
              placeholder="senha"
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
            />
            {/* <Link to="/carteira"> */}
            <button
              className="login-btn-box"
              onClick={ this.handleClick }
              // onClick={ () => [dispatch(saveEmail(email)), dispatch(saveMoney(0)),
              // ] }
              disabled={ submitBtnDisabled }
              type="submit"
            >
              <span className="login-btn-text">Entrar</span>

            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func,
}.isRequired;

// const mapDispatchToProps = (dispatch) => ({
//   saveEmail: (email) => (
//     dispatch(saveEmailAct(email))
//   ),
// });

// export default connect(null, mapDispatchToProps)(Login);
export default connect()(Login);

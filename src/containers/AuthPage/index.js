import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { media } from 'commons/theme';

import SplashImg from 'assets/splash_login.jpg';
import LogoImg from 'assets/logo_white_shadow.svg';

import { login } from 'reducers/auth';

@connect(null, { login })
export default class AuthPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      validation: {
        username: '',
        password: '',
      },
    };
  }

  setInput = (field, value) => this.setState({ [field]: value });

  go = () => {
    if (this.validate()) {
      this.props.login(this.state.username, this.state.password);
    }
  };

  keyDown = key => {
    if (key.which === 13) {
      this.go();
    }
  };

  validate = () => {
    const { username, password } = this.state;
    const validation = {
      username: '',
      password: '',
    };

    let valid = true;

    if (username.length <= 6) {
      valid = false;
      validation.username = 'Username tidak boleh kosong atau kurang dari 6 karakter';
    }

    if (password.length <= 0) {
      valid = false;
      validation.password = 'Password tidak boleh kosong';
    }

    this.setState({ validation });
    return valid;
  };

  render() {
    return (
      <Auth>
        <Splash src={SplashImg} alt="splashbg" />
        <Login>
          <img src={LogoImg} alt="Logo" />
          <div className="form">
            <div className="input">
              <input
                type="text"
                value={this.state.username}
                onChange={evt => this.setInput('username', evt.target.value)}
                onKeyDown={this.keyDown}
                placeholder="Username"
              />
              {this.state.validation.username && <h6>{this.state.validation.username}</h6>}
              <input
                type="password"
                value={this.state.password}
                onChange={evt => this.setInput('password', evt.target.value)}
                onKeyDown={this.keyDown}
                placeholder="Kata Sandi"
              />
              {this.state.validation.password && <h6>{this.state.validation.password}</h6>}
            </div>
            <button onClick={this.go} className="submit">
              Masuk
            </button>
          </div>
        </Login>
      </Auth>
    );
  }
}

const Auth = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;

  ${media('mobile')} {
    padding: 2rem;
  }
`;

const Splash = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  object-fit: cover;
`;

const Login = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: center;

  img {
    height: 6rem;
    width: auto;
    margin-left: -0.5rem;
  }

  .form {
    width: 20rem;
    background: ${props => props.theme.color.blue};
    box-shadow: ${props => props.theme.shadow.regular};
    border-radius: 1rem;

    ${media('mobile')} {
      width: 100%;
    }

    .input {
      font-size: 1rem;
      color: ${props => props.theme.color.black};
      background: ${props => props.theme.color.white};
      border-radius: 1rem;
      padding: 1rem 0;

      input {
        width: 100%;
        border: none;
        outline: none;
        padding: 0.75rem 1.5rem;
        transition: 0.25s ease all;

        &:hover,
        &:focus {
          outline: none;
          background: ${props => props.theme.color.ivory};
          transition: 0.25s ease all;
        }
      }

      h6 {
        margin: 0;
        width: 100%;
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
        color: ${props => props.theme.color.pure};
        background: ${props => props.theme.color.red};
        border-radius: 0 0 ${props => props.theme.sizing.radius.regular}
          ${props => props.theme.sizing.radius.regular};
      }
    }

    .submit {
      width: 100%;
      padding: 1rem;
      border-radius: 1rem;
      color: ${props => props.theme.color.white};
      background: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
      font-size: 1rem;
      font-weight: 700;

      &:hover,
      &:focus {
        background: rgba(255, 255, 255, 0.5);
        transition: 0.25s ease all;
      }
    }
  }
`;

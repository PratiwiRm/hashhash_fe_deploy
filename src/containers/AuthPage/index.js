import React, { Component } from 'react';
import styled from 'styled-components';

import { media } from 'commons/theme';

import SplashImg from 'assets/splash_login.png';
import LogoImg from 'assets/logo_white_shadow.svg';

export default class AuthPage extends Component {
  render() {
    return (
      <Auth>
        <Splash src={SplashImg} alt="splashbg" />
        <Login>
          <img src={LogoImg} alt="Logo" />
          <div className="form">
            <div className="input">
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Kata Sandi" />
            </div>
            <button onClick={() => console.log('weeoo')} className="submit">
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
    }

    .submit {
      width: 100%;
      padding: 1rem;
      border-radius: 1rem;
      color: ${props => props.theme.color.white};
      background: ${props => props.theme.color.blue};
      font-size: 1rem;
      font-weight: 700;
    }
  }
`;

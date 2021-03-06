import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import { invert } from 'lodash';

import LogoImg from 'assets/logo_blue.svg';

import SITEMAP from 'commons/sitemap';

import { logout } from 'reducers/auth';

@connect(
  state => ({
    help: state.help,
  }),
  { push, logout }
)
export default class Navigation extends Component {
  static propTypes = {
    help: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  getCurrentRouteLabel = () => invert(SITEMAP)[window.location.pathname];

  matchCurrentRoute = route => window.location.pathname === SITEMAP[route];

  navigate = route => this.props.push(SITEMAP[route]);

  isMainRoute = () =>
    window.location.pathname === SITEMAP.pembelian || window.location.pathname === SITEMAP.logistik;

  render() {
    const { help } = this.props;

    return (
      <Navbar>
        <button onClick={() => this.navigate('index')}>
          <Logo src={LogoImg} alt="Logo" />
        </button>
        <Navlinks>
          <button
            onClick={() => this.navigate('bantuan')}
            disabled={this.matchCurrentRoute('bantuan')}
          >
            Bantuan
            {help.help.length > 0 && <div className="notifAccent" />}
          </button>
          <button
            onClick={() => this.navigate('performa')}
            disabled={this.matchCurrentRoute('performa')}
          >
            Performa
          </button>
          <button
            onClick={() => this.navigate('pegawai')}
            disabled={this.matchCurrentRoute('pegawai')}
          >
            Pegawai
          </button>
          <button
            onClick={() => this.navigate('supplier')}
            disabled={this.matchCurrentRoute('supplier')}
          >
            Supplier
          </button>
          <button onClick={this.props.logout}>Logout</button>
        </Navlinks>
        <MainSwitcher>
          {!this.isMainRoute() && <MainLink disabled>{this.getCurrentRouteLabel()}</MainLink>}
          <MainLink
            onClick={() => this.navigate('pembelian')}
            disabled={this.matchCurrentRoute('pembelian')}
          >
            Pembelian
          </MainLink>
          <MainLink
            onClick={() => this.navigate('logistik')}
            disabled={this.matchCurrentRoute('logistik')}
          >
            Logistik
          </MainLink>
        </MainSwitcher>
      </Navbar>
    );
  }
}

const Navbar = styled.div`
  width: 100%;
  margin: 5rem auto 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Logo = styled.img`
  height: 2rem;
  width: auto;
`;

const Navlinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;

  a,
  button {
    position: relative;
    color: ${props => props.theme.color.gray};
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    margin: 0 0 0 2rem;
    padding: 0;

    &:hover,
    &:focus {
      color: ${props => props.theme.color.black};
      transition: 0.25s ease all;
    }

    &:disabled {
      color: ${props => props.theme.color.blue};

      &.preview {
        color: ${props => props.theme.color.gray};
        opacity: 0.5;

        &:hover {
          color: ${props => props.theme.color.gray};
        }
      }
    }

    .notifAccent {
      position: absolute;
      top: 0;
      right: -0.5rem;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 1rem;
      background: ${props => props.theme.color.green};
    }
  }
`;

const MainSwitcher = styled.div`
  margin: 2rem 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
`;

const MainLink = styled.button`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 2rem 0 0;
  padding: 0.25rem 0.75rem;
  color: ${props => props.theme.color.gray};
  transition: 0.25s ease all;
  text-transform: capitalize;

  &:hover,
  &:focus {
    color: ${props => props.theme.color.black};
    transition: 0.25s ease all;
  }

  &:disabled {
    color: ${props => props.theme.color.white};
    background: ${props => props.theme.color.blue};
    border-radius: ${props => props.theme.sizing.radius.regular};
  }
`;

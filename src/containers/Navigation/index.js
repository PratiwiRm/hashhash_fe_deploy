import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styled from 'styled-components';

import { isEmpty } from 'lodash';

import LogoImg from 'assets/logo_blue.svg';

import SITEMAP from 'commons/sitemap';

import { media } from 'commons/theme';

@connect(state => ({ auth: state.auth }), { push })
export default class Navigation extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  matchCurrentRoute = route => window.location.pathname === SITEMAP[route];

  navigate = route => this.props.push(SITEMAP[route]);

  render() {
    return (
      <Navbar>
        <button onClick={() => this.navigate('index')}>
          <Logo src={LogoImg} alt="Logo" />
        </button>
        <Navlinks>
          <button className="preview" disabled onClick={() => this.navigate('bantuan')}>
            Permintaan Bantuan
          </button>
          <button className="preview" disabled onClick={() => this.navigate('performa')}>
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
          <button>Logout</button>
        </Navlinks>
        <MainSwitcher>
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
  }
`;

const MainSwitcher = styled.div`
  margin: 1.5rem 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: 100%;
`;

const MainLink = styled.button`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 2rem 0 0;
  padding: 0;
  color: ${props => props.theme.color.gray};
  transition: 0.25s ease all;

  &:hover,
  &:focus {
    color: ${props => props.theme.color.black};
    transition: 0.25s ease all;
  }

  &:disabled {
    color: ${props => props.theme.color.blue};
  }
`;

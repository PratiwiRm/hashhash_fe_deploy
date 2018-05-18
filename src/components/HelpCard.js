import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconChevronWhite from 'assets/icon_chevron_white.svg';

export default class HelpCard extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    employees: PropTypes.object.isRequired,
    supplier: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      showResolve: false,
      resolveMsg: '',
    };
  }

  render() {
    const { showResolve, resolveMsg } = this.state;
    const { data, employees } = this.props;
    const supplier = this.props.supplier.find(el => el.id == employees[data.employee].id_supplier);

    return (
      <Wrapper>
        <Profile expand={showResolve}>
          <img src={employees[data.employee].foto} alt="profpic" />
          <div>
            <h1>{employees[data.employee].nama}</h1>
            <h2>{employees[data.employee].username}</h2>
            {employees[data.employee].peran.toLowerCase() === 'picker' && <h6>{supplier.nama}</h6>}
            <h5>{employees[data.employee].peran}</h5>
          </div>
        </Profile>
        <HelpContext expand={showResolve}>
          <div className="content">
            <h6>Membutuhkan Bantuan pada tugas:</h6>
            <h3>Pembelian 20 Kantong Plastik Merah - L (500 g), OTO</h3>
            <h6>Memberikan pesan:</h6>
            <p>
              "Ullamcorper duis suspendisse potenti iaculis tempus id class diam cum ridiculus
              ligula penatibus at a a per nec mollis nascetur sociosqu.A et eget vestibulum a
              condimentum arcu ad scelerisque donec condimentum convallis curae nisl a eros in
              aliquam neque a hendrerit.At quis duis cubilia dignissim nec vivamus consectetur."
            </p>
          </div>
          <div className="input">
            <h6>Kirim Balasan</h6>
            <textarea
              type="text"
              value={resolveMsg}
              onChange={evt => this.setState({ resolveMsg: evt.target.value })}
              placeholder="Ketik balasan disini"
            />
            <button>Kirim</button>
          </div>
          <button className="toggle" onClick={() => this.setState({ showResolve: !showResolve })}>
            <img src={IconChevronWhite} alt="chevron" />
          </button>
        </HelpContext>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  background: ${props => props.theme.color.pure};
  border-radius: ${props => props.theme.sizing.radius.card};
  box-shadow: ${props => props.theme.shadow.regular};
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const Profile = styled.div`
  width: ${props => (props.expand ? '100%' : '57%')};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  transition: 0.125s linear all;

  img {
    flex: ${props => (props.expand ? '2' : '1')};
    display: block;
    height: 10rem;
    width: 15rem;
    object-fit: cover;
    border-radius: ${props => props.theme.sizing.radius.card} 0 0
      ${props => (props.expand ? '0' : props.theme.sizing.radius.card)};
    transition: 0.25s ease all;
  }

  div {
    flex: 4;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding: 1rem 2rem;
    transition: 0.25s ease all;

    h1 {
      width: 100%;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    h2 {
      width: 100%;
      font-size: 1.125rem;
      font-weight: 700;
      margin: 0 0 0.25rem;
    }

    h5 {
      font-size: 0.875rem;
      margin: 1rem 0 0;
      font-weight: 700;
      padding: 0.25rem 0.5rem;
      color: ${props => props.theme.color.pure};
      background: ${props => props.theme.color.blue};
      border-radius: ${props => props.theme.sizing.radius.small};
      text-transform: capitalize;
    }

    h6 {
      width: 100%;
      font-size: 0.875rem;
      font-weight: 400;
      color: ${props => props.theme.color.gray};
      margin: 0;
    }
  }
`;

const HelpContext = styled.div`
  flex: ${props => (props.expand ? 'none' : '1')};
  width: ${props => (props.expand ? '100%' : '0')};
  color: ${props => props.theme.color.pure};
  background: ${props => props.theme.color.blue};
  border-radius: 0 ${props => (props.expand ? '0' : props.theme.sizing.radius.card)}
    ${props => props.theme.sizing.radius.card}
    ${props => (props.expand ? props.theme.sizing.radius.card : '0')};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;

  .content {
    position: relative;
    width: ${props => (props.expand ? '100%' : 'calc(100% - 3rem)')};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding: ${props => (props.expand ? '2rem' : '0 2rem')};
    transition: 0.25s ease border-radius, 0.25s ease padding;

    h3,
    h6,
    p {
      width: 100%;
    }

    h6 {
      font-size: 0.875rem;
      margin: 0 0 0.25rem;
      font-weight: 400;
    }

    h3 {
      font-size: ${props => (props.expand ? '1.5rem' : '1rem')};
      margin: 0 0 1rem;
    }

    p {
      display: block;
      display: -webkit-box;
      height: ${props => (props.expand ? 'auto' : 'calc(1.25rem*1.25*2)')};
      margin: 0;
      padding: 0 0 0 ${props => (props.expand ? '1rem' : '0')};
      border-left: ${props => (props.expand ? `0.1rem solid ${props.theme.color.pure}` : 'none')};
      font-size: ${props => (props.expand ? '1.75rem' : '1.25rem')};
      font-weight: 700;
      line-height: 1.25;
      -webkit-line-clamp: ${props => (props.expand ? 'none' : '2')};
      -webkit-box-orient: vertical;
      overflow: ${props => (props.expand ? 'visible' : 'hidden')};
      text-overflow: ellipsis;
      transition: 0.25s ease all;
    }
  }

  .toggle {
    width: ${props => (props.expand ? '100%' : '3rem')};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 1rem;
    background: ${props => props.theme.color.blueDark};
    border-radius: ${props => {
      if (props.expand) {
        return props.theme.sizing.radius.card;
      }

      return `0 ${props.theme.sizing.radius.card} ${props.theme.sizing.radius.card} 0`;
    }};
    transition: 0.25s ease border-radius, 0.25s ease opacity;

    &:hover,
    &:focus {
      opacity: 0.5;
      transition: 0.25s ease opacity;
    }

    img {
      width: 1rem;
      transform: ${props => (props.expand ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: 0.25s ease transform;
    }
  }

  .input {
    width: 100%;
    display: ${props => (props.expand ? 'flex' : 'none')};
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    margin: 0;
    padding: 0 2rem 2rem;

    h6 {
      font-size: 1rem;
      margin: 0 0 0.25rem;
      font-weight: 400;
    }

    textarea {
      font-size: 1rem;
      width: 100%;
      color: ${props => props.theme.color.black};
      background: ${props => props.theme.color.pure};
      border-radius: ${props => props.theme.sizing.radius.card}
        ${props => props.theme.sizing.radius.card} 0 0;
      padding: 1rem;
    }

    button {
      font-size: 1rem;
      font-weight: 700;
      width: 100%;
      padding: 0.5rem 1rem;
      background: ${props => props.theme.color.blueDark};
      border-radius: 0 0 ${props => props.theme.sizing.radius.card}
        ${props => props.theme.sizing.radius.card};
      transition: 0.25s ease opacity;

      &:hover,
      &:focus {
        opacity: 0.5;
        transition: 0.25s ease opacity;
      }
    }
  }
`;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import { InputWrapper } from 'components/SharedElements';

export default class EmployeeModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    create: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
    create: false,
  };

  constructor(props) {
    super(props);

    if (this.props.create) {
      this.state = {
        phone_num: '',
        name: '',
        password: '',
        isPicker: true,
        supplierId: '',
      };
    } else {
      this.state = {
        phone_num: '',
        name: '',
        password: '',
        isPicker: true,
        supplierId: '',
      };
    }
  }

  setInput = (field, value) => {
    this.setState({ [field]: value });
  };

  save = () => {
    console.log('abc');
  };

  render() {
    const { create, visible, close } = this.props;

    return (
      <ModalWrapper visible={visible}>
        <CloseButton onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </CloseButton>
        <ModalContent>
          <h1>{create ? 'Tambah Data Pegawai' : 'Ubah Data Pegawai'}</h1>
          <InputBox>
            <span>Nomor Telpon</span>
            <input
              type="text"
              value={this.state.phone_num}
              onChange={evt => this.setInput('phone_num', evt.target.value)}
              placeholder="085XXXXXX..."
            />
          </InputBox>
          <InputBox>
            <span>Nama Lengkap</span>
            <input
              type="text"
              value={this.state.name}
              onChange={evt => this.setInput('name', evt.target.value)}
              placeholder="John Doe"
            />
          </InputBox>
          <InputBox>
            <span>Password</span>
            <input
              type="password"
              value={this.state.password}
              onChange={evt => this.setInput('password', evt.target.value)}
              placeholder="Password"
            />
          </InputBox>
          <Switcher>
            <span>Role</span>
            <button disabled={this.state.isPicker} onClick={() => this.setInput('isPicker', true)}>
              Picker
            </button>
            <button
              disabled={!this.state.isPicker}
              onClick={() => this.setInput('isPicker', false)}
            >
              Driver
            </button>
          </Switcher>
          {this.state.isPicker && (
            <InputBox>
              <span>Supplier:</span>
              <select
                value={this.state.supplierId}
                onChange={evt => this.setInput('supplierId', evt.target.value)}
              >
                <option selected disabled>
                  Pilih Supplier
                </option>
                <option value="supplier1">Supplier 1</option>
                <option value="supplier2">Supplier 2</option>
                <option value="supplier3">Supplier 3</option>
                <option value="supplier4">Supplier 4</option>
              </select>
            </InputBox>
          )}
          <Submit onClick={this.save}>Tambah</Submit>
        </ModalContent>
      </ModalWrapper>
    );
  }
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.theme.zindex.modal};
  width: 100%;
  height: 100%;
  background: ${props => props.theme.color.whiteRGBA('0.85')};
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const CloseButton = styled.button`
  width: 100%;
  max-width: ${props => props.theme.sizing.containerMaxWidth};
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 10rem auto 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.color.gray};

  img {
    width: 1.25rem;
    height: auto;
    transform: rotate(90deg);
    margin: 0 0.5rem 0 0;
  }
`;

const ModalContent = styled.div`
  margin: 0 auto 5rem;
  width: 100%;
  max-width: ${props => props.theme.sizing.containerMaxWidth};
  background: ${props => props.theme.color.pure};
  border-radius: ${props => props.theme.sizing.radius.card};
  box-shadow: ${props => props.theme.shadow.regular};
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 2rem;
    color: ${props => props.theme.color.gray};
  }
`;

const InputBox = styled(InputWrapper)`
  width: 100%;
  margin: 1rem 0 0;

  input,
  select {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
`;

const Switcher = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin: 1rem 0 0;

  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0 0 0.25rem;
    color: ${props => props.theme.color.gray};
  }

  button {
    width: calc(50% - 1rem);
    font-size: 1rem;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    color: ${props => props.theme.color.black};
    background: ${props => props.theme.color.pure};
    box-shadow: ${props => props.theme.shadow.lite};
    transition: 0.25s ease all;

    &:hover,
    &:focus,
    &:disabled {
      color: ${props => props.theme.color.pure};
      background: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
    }
  }
`;

const Submit = styled.button`
  width: 100%;
  margin: 2rem 0 0;
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.color.pure};
  background: ${props => props.theme.color.blue};
  border-radius: 3rem;
  box-shadow: ${props => props.theme.shadow.regular};
  transition: 0.25s ease all;

  &:hover,
  &:focus {
    opacity: 0.75;
    transition: 0.25s ease all;
  }
`;

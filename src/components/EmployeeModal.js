import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import { InputWrapper } from 'components/SharedElements';

export default class EmployeeModal extends Component {
  static propTypes = {
    supplier: PropTypes.array.isRequired,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    data: PropTypes.object,
    create: PropTypes.bool,
  };

  static defaultProps = {
    data: {},
    create: false,
  };

  constructor(props) {
    super(props);

    const { create, data } = this.props;

    if (create) {
      this.state = {
        picture: '',
        phone_num: '',
        name: '',
        identity_number: '',
        type: 'Picker',
        supplier: '',
        password: '',
        validation: {
          picture: '',
          phone_num: '',
          name: '',
          identity_number: '',
          supplier: '',
          password: '',
        },
      };
    } else {
      this.state = {
        picture: data.picture,
        phone_num: data.phone_num,
        name: data.name,
        type: data.type,
        identity_number: data.identity_number,
        supplier: data.type.toLowerCase() === 'picker' ? data.supplier : '',
        password: '',
        validation: {
          picture: '',
          phone_num: '',
          name: '',
          identity_number: '',
          supplier: '',
          password: '',
        },
      };
    }
  }

  setInput = (field, value) => {
    this.setState({ [field]: value });
  };

  save = () => {
    if (this.validate()) {
      this.props.save(this.state);
      this.props.close();
    }
  };

  validate = () => {
    const validation = {
      picture: '',
      phone_num: '',
      name: '',
      identity_number: '',
      supplier: '',
      password: '',
    };

    let invalid = false;
    const numberRegExp = /^\d+$/;

    if (this.state.picture.length <= 4 || !this.state.picture.startsWith('http')) {
      validation.picture = 'URL tidak valid';
      invalid = true;
    }

    if (this.state.phone_num.length <= 8 || !numberRegExp.test(this.state.phone_num)) {
      validation.phone_num =
        'Nomor Telpon harus lebih panjang dari 8 karakter dan hanya terdiri dari angka';
      invalid = true;
    }

    if (this.state.name.length === 0) {
      validation.name = 'Nama tidak boleh kosong';
      invalid = true;
    }

    if (
      this.state.identity_number.length !== 16 ||
      !numberRegExp.test(this.state.identity_number)
    ) {
      validation.identity_number =
        'Nomor KTP harus sepanjang 16 karakter dan hanya terdiri dari angka';
      invalid = true;
    }

    if (this.state.type.toLowerCase() === 'picker' && this.state.supplier.length === 0) {
      validation.supplier = 'Supplier tidak boleh kosong';
      invalid = true;
    }

    if (this.state.password.length <= 8) {
      validation.password = 'Password harus lebih dari 8 karakter';
      invalid = true;
    }

    this.setState({ validation });
    return !invalid;
  };

  render() {
    const { supplier, create, close } = this.props;

    return (
      <ModalWrapper>
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
            {this.state.validation.phone_num && <h6>{this.state.validation.phone_num}</h6>}
          </InputBox>
          <InputBox>
            <span>Nama Lengkap</span>
            <input
              type="text"
              value={this.state.name}
              onChange={evt => this.setInput('name', evt.target.value)}
              placeholder="John Doe"
            />
            {this.state.validation.name && <h6>{this.state.validation.name}</h6>}
          </InputBox>
          <InputBox>
            <span>Profile Picture</span>
            <input
              type="text"
              value={this.state.picture}
              onChange={evt => this.setInput('picture', evt.target.value)}
              placeholder="http..."
            />
            {this.state.validation.picture && <h6>{this.state.validation.picture}</h6>}
          </InputBox>
          <InputBox>
            <span>Nomor KTP</span>
            <input
              type="text"
              value={this.state.identity_number}
              onChange={evt => this.setInput('identity_number', evt.target.value)}
              placeholder="3374..."
            />
            {this.state.validation.identity_number && (
              <h6>{this.state.validation.identity_number}</h6>
            )}
          </InputBox>
          <InputBox>
            <span>Password</span>
            <input
              type="password"
              value={this.state.password}
              onChange={evt => this.setInput('password', evt.target.value)}
              placeholder="Password"
            />
            {this.state.validation.password && <h6>{this.state.validation.password}</h6>}
          </InputBox>
          <Switcher>
            <span>Role</span>
            <button
              disabled={this.state.type.toLowerCase() === 'picker'}
              onClick={() => this.setInput('type', 'Picker')}
            >
              Picker
            </button>
            <button
              disabled={!this.state.type.toLowerCase() === 'picker'}
              onClick={() => this.setInput('type', 'Driver')}
            >
              Driver
            </button>
          </Switcher>
          {this.state.type.toLowerCase() === 'picker' && (
            <InputBox>
              <span>Supplier:</span>
              <select
                value={this.state.supplier}
                onChange={evt => this.setInput('supplier', evt.target.value)}
              >
                <option selected disabled>
                  Pilih Supplier
                </option>
                {supplier.map(value => (
                  <option key={`${value.name}${value.address}`} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
              {this.state.validation.supplier && <h6>{this.state.validation.supplier}</h6>}
            </InputBox>
          )}
          <Submit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</Submit>
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
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
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

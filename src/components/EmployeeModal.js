import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import {
  ModalWrapper,
  ModalClose,
  ModalTitle,
  ModalContent,
  ModalInput,
  ModalSwitcher,
  ModalSubmit,
} from 'components/SharedElements';

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
        <ModalClose onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </ModalClose>
        <ModalTitle>{create ? 'Tambah Data Pegawai' : 'Ubah Data Pegawai'}</ModalTitle>
        <ModalContent>
          <ModalInput>
            <span>Nomor Telpon</span>
            <input
              type="text"
              value={this.state.phone_num}
              onChange={evt => this.setInput('phone_num', evt.target.value)}
              placeholder="085XXXXXX..."
            />
            {this.state.validation.phone_num && <h6>{this.state.validation.phone_num}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Nama Lengkap</span>
            <input
              type="text"
              value={this.state.name}
              onChange={evt => this.setInput('name', evt.target.value)}
              placeholder="John Doe"
            />
            {this.state.validation.name && <h6>{this.state.validation.name}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Profile Picture</span>
            <input
              type="text"
              value={this.state.picture}
              onChange={evt => this.setInput('picture', evt.target.value)}
              placeholder="http..."
            />
            {this.state.validation.picture && <h6>{this.state.validation.picture}</h6>}
          </ModalInput>
          <ModalInput>
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
          </ModalInput>
          <ModalInput>
            <span>Password</span>
            <input
              type="password"
              value={this.state.password}
              onChange={evt => this.setInput('password', evt.target.value)}
              placeholder="Password"
            />
            {this.state.validation.password && <h6>{this.state.validation.password}</h6>}
          </ModalInput>
          <ModalSwitcher>
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
          </ModalSwitcher>
          {this.state.type.toLowerCase() === 'picker' && (
            <ModalInput>
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
            </ModalInput>
          )}
          <ModalSubmit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</ModalSubmit>
        </ModalContent>
      </ModalWrapper>
    );
  }
}

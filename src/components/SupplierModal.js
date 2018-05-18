import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import {
  ModalWrapper,
  ModalClose,
  ModalTitle,
  ModalContent,
  ModalInput,
  ModalSubmit,
} from 'components/SharedElements';

export default class SupplierModal extends Component {
  static propTypes = {
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
        nama: '',
        lokasi: '',
        validation: {
          nama: '',
          lokasi: '',
        },
      };
    } else {
      this.state = {
        id: data.id,
        nama: data.nama,
        lokasi: data.lokasi,
        validation: {
          nama: '',
          lokasi: '',
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
      nama: '',
      lokasi: '',
    };
    let valid = true;

    const { nama, lokasi } = this.state;

    if (nama.length === 0) {
      validation.nama = 'Nama Supplier tidak boleh kosong';
      valid = false;
    }

    if (lokasi.length === 0) {
      validation.lokasi = 'Alamat Supplier tidak boleh kosong';
      valid = false;
    }

    this.setState({ validation });
    return valid;
  };

  render() {
    const { create, close, data } = this.props;

    return (
      <ModalWrapper>
        <ModalClose onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </ModalClose>
        <ModalTitle>{create ? 'Tambah Data Supplier' : 'Ubah Data Supplier'}</ModalTitle>
        <SupplierModalContent>
          <h4>SEMUA DATA WAJIB DIISI</h4>
          {!create && <h2>Supplier #{data.id}</h2>}
          <ModalInput>
            <span>Nama Supplier</span>
            <input
              type="text"
              value={this.state.nama}
              onChange={evt => this.setInput('nama', evt.target.value)}
              placeholder="Tengkulak 123"
            />
            {this.state.validation.nama && <h6>{this.state.validation.nama}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Alamat Supplier</span>
            <textarea
              value={this.state.lokasi}
              onChange={evt => this.setInput('lokasi', evt.target.value)}
              placeholder="Jalan Gatot Subroto No. 12 ..."
            />
            {this.state.validation.lokasi && <h6>{this.state.validation.lokasi}</h6>}
          </ModalInput>
          <ModalSubmit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</ModalSubmit>
        </SupplierModalContent>
      </ModalWrapper>
    );
  }
}

const SupplierModalContent = styled(ModalContent)`
  h2 {
    font-size: 2rem;
    margin: 0 0 2rem;
  }
`;

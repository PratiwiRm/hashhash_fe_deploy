import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        id: '',
        name: '',
        address: '',
      };
    } else {
      this.state = {
        id: data.id,
        name: data.name,
        address: data.address,
      };
    }
  }

  setInput = (field, value) => {
    this.setState({ [field]: value });
  };

  save = () => {
    this.props.save(this.state);
    this.props.close();
  };

  render() {
    const { create, close, data } = this.props;

    return (
      <ModalWrapper>
        <ModalClose onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </ModalClose>
        <ModalTitle>{create ? 'Tambah Data Supplier' : 'Ubah Data Supplier'}</ModalTitle>
        <ModalContent>
          {!create && <h2>Supplier #{data.id}</h2>}
          <ModalInput>
            <span>Nama Supplier</span>
            <input
              type="text"
              value={this.state.name}
              onChange={evt => this.setInput('name', evt.target.value)}
              placeholder="Tengkulak 123"
            />
          </ModalInput>
          <ModalInput>
            <span>Alamat Supplier</span>
            <textarea
              value={this.state.address}
              onChange={evt => this.setInput('address', evt.target.value)}
              placeholder="Jalan Gatot Subroto No. 12 ..."
            />
          </ModalInput>
          <ModalSubmit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</ModalSubmit>
        </ModalContent>
      </ModalWrapper>
    );
  }
}

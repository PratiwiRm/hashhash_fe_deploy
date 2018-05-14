import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import { PICKER_TASK_HEADER_FIELDS, PICKER_TASK_TEMPLATE } from 'commons/structure';
import { htmlInputDateFormatter } from 'commons/utils';

import {
  ModalWrapper,
  ModalClose,
  ModalTitle,
  ModalContent,
  ModalInput,
  ModalSwitcher,
  ModalSubmit,
} from 'components/SharedElements';

export default class DeliveryModal extends Component {
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
        validation: {},
      };

      PICKER_TASK_HEADER_FIELDS.forEach(value => {
        this.state[value] = '';
        this.state.validation[value] = '';
      });

      this.state.delivery_date = Moment()
        .format('YYYY/MM/DD')
        .toString();

      this.state.status = 'pending';
    } else {
      this.state = {
        validation: {},
      };

      PICKER_TASK_HEADER_FIELDS.forEach(value => {
        this.state[value] = data[value];
        this.state.validation[value] = '';
      });
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
    const validation = {};

    PICKER_TASK_HEADER_FIELDS.forEach(value => {
      validation[value] = '';
    });

    let invalid = false;
    const numberRegExp = /^\d+$/;

    if (this.state.product === '') {
      invalid = true;
      validation.product = 'Nama produk tidak bisa kosong';
    }

    if (this.state.packaging === '') {
      invalid = true;
      validation.packaging = 'Packaging produk tidak bisa kosong';
    }

    if (!numberRegExp.test(this.state.quantity) || this.state.quantity <= 0) {
      invalid = true;
      validation.quantity =
        'Jumlah produk harus dalam angka atau tidak boleh kurang dari sama dengan 0';
    }

    if (this.state.order_id === '') {
      invalid = true;
      validation.order_id = 'Order ID pesanan tidak bisa kosong';
    }

    if (this.state.delivery_date === '') {
      invalid = true;
      validation.delivery_date = 'Tanggal pengiriman produk tidak bisa kosong';
    }

    if (this.state.address === '') {
      invalid = true;
      validation.address = 'Alamat pengiriman produk tidak bisa kosong';
    }

    if (this.state.type === '') {
      invalid = true;
      validation.type = 'Tipe tugas tidak bisa kosong';
    }

    if (this.state.supplier === '') {
      invalid = true;
      validation.supplier = 'Supplier tujuan tidak bisa kosong';
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
        <ModalTitle>{create ? 'Tambah Tugas Pemesanan' : 'Ubah Tugas Pemesanan'}</ModalTitle>
        <ModalContent>
          <h4>* = required</h4>
          <ModalInput>
            <span>Produk*</span>
            <textarea
              type="text"
              value={this.state.product}
              onChange={evt => this.setInput('product', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].product}
            />
            {this.state.validation.product && <h6>{this.state.validation.product}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Packaging*</span>
            <input
              type="text"
              value={this.state.packaging}
              onChange={evt => this.setInput('packaging', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].packaging}
            />
            {this.state.validation.packaging && <h6>{this.state.validation.packaging}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Quantity*</span>
            <input
              type="number"
              value={this.state.quantity}
              onChange={evt => this.setInput('quantity', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].quantity}
            />
            {this.state.validation.quantity && <h6>{this.state.validation.quantity}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Order ID*</span>
            <input
              type="text"
              value={this.state.order_id}
              onChange={evt => this.setInput('order_id', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].order_id}
            />
            {this.state.validation.order_id && <h6>{this.state.validation.order_id}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Tanggal Pengiriman*</span>
            <input
              type="date"
              value={htmlInputDateFormatter(this.state.delivery_date)}
              onChange={evt =>
                this.setInput('delivery_date', htmlInputDateFormatter(evt.target.value))
              }
              placeholder={PICKER_TASK_TEMPLATE[0].delivery_date}
            />
            {this.state.validation.delivery_date && <h6>{this.state.validation.delivery_date}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Alamat*</span>
            <textarea
              value={this.state.address}
              onChange={evt => this.setInput('address', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].address}
            />
            {this.state.validation.address && <h6>{this.state.validation.address}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Patokan Alamat</span>
            <textarea
              value={this.state.address_guide}
              onChange={evt => this.setInput('address_guide', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].address_guide}
            />
          </ModalInput>
          <ModalSwitcher>
            <span>Tipe*</span>
            <button
              disabled={this.state.type.toLowerCase() === 'purchase'}
              onClick={() => this.setInput('type', 'purchase')}
            >
              Purchase
            </button>
            <button
              disabled={this.state.type.toLowerCase() === 'cancel'}
              onClick={() => this.setInput('type', 'cancel')}
            >
              Cancel
            </button>
            {this.state.validation.type && <h6>{this.state.validation.type}</h6>}
          </ModalSwitcher>
          <ModalInput>
            <span>Supplier*</span>
            <select
              value={this.state.supplier}
              onChange={evt => this.setInput('supplier', evt.target.value)}
            >
              <option disabled value="">
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
          <ModalSubmit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</ModalSubmit>
        </ModalContent>
      </ModalWrapper>
    );
  }
}

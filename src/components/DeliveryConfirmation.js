import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmpty } from 'lodash';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import {
  ModalWrapper,
  ModalClose,
  ModalTitle,
  ModalContent,
  ModalInput,
  ModalImageInput,
  ModalSwitcher,
  ModalSubmit,
} from 'components/SharedElements';

// order_id: '94618de7-3428-4ff5-a8fa-b96ce8a8404x',
// delivery_date: '2018/04/20',
// status: 'done',
// customer: 'Ayam Geprek Ummat',
// address:
//   'Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia',
// address_guide: '',
// product: 'Tepung Terigu, SEGITIGA BIRU',
// product_img:
//   'https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg',
// packaging: 'Karung (25.0 kg)',
// quantity: '4',
// assigned: '089601107931',
// type: 'cancel',
// id_supplier: 1,

export default class DeliveryConfirmation extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      feedbackInput: '',
      validation: {
        feedbackInput: '',
      },
    };
  }

  setInput = (field, value) => this.setState({ [field]: value });

  onAccept = () => {
    if (this.validate()) {
      this.props.close();
    }
  };

  onReject = () => {
    if (this.validate()) {
      this.props.close();
    }
  };

  validate = () => {
    const { feedbackInput } = this.state;
    const validation = {
      feedbackInput: '',
    };

    let valid = true;

    if (feedbackInput.length === 0) {
      validation.feedbackInput = 'Catatan tidak boleh kosong';
      valid = false;
    }

    this.setState({ validation });
    return valid;
  };

  render() {
    const { close } = this.props;

    return (
      <ModalWrapper>
        <ModalClose onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </ModalClose>
        <ModalTitle>Konfirmasi Tugas #1331234</ModalTitle>
        <ConfirmationContent>
          <h4>Pembatalan produk</h4>
          <div className="task">
            <img
              alt="dummy"
              src="https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg"
            />
            <div className="info">
              <span>
                Order ID: <strong>#94618de7-3428-4ff5-a8fa-b96ce8a8404x</strong>
              </span>
              <h1>4 Karung (25.0 kg) Tepung Terigu, SEGITIGA BIRU</h1>
              <h3>Supplier KembarBersama</h3>
              <h2>
                Pemesan: <strong>Ayam Geprek Ummat</strong>
              </h2>
              <p>
                Alamat:{' '}
                <strong>
                  Jl. Kebagusan I No.45, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus
                  Ibukota Jakarta 12520, Indonesia
                </strong>
                <br />
                Tanggal Pengiriman: <strong>23 Mei 2018</strong>
              </p>
            </div>
          </div>
          <h4>Konfirmasi Pembatalan</h4>
          <div className="confirmation">
            <div className="photos">
              <h3>Foto Close-Up Produk</h3>
              <img
                alt="dummy"
                src="https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg"
              />
            </div>
            <div className="photos">
              <h3>Foto Produk Keseluruhan</h3>
              <img
                alt="dummy"
                src="https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg"
              />
              <img
                alt="dummy"
                src="https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg"
              />
              <img
                alt="dummy"
                src="https://res.cloudinary.com/dharmawan/image/upload/v1526576901/20170816_130445_pe9jmy.jpg"
              />
            </div>
          </div>
          <ModalInput>
            <span>Catatan Penolakan/Penerimaan</span>
            <input
              type="text"
              value={this.state.feedbackInput}
              onChange={evt => this.setInput('feedbackInput', evt.target.value)}
              placeholder="Catatan Penolakan/Penerimaan"
            />
            {this.state.validation.feedbackInput && <h6>{this.state.validation.feedbackInput}</h6>}
          </ModalInput>
          <div className="action">
            <button onClick={this.onReject} className="reject">
              Tolak Pengerjaan
            </button>
            <button onClick={this.onAccept} className="accept">
              Terima Pengerjaan
            </button>
          </div>
        </ConfirmationContent>
      </ModalWrapper>
    );
  }
}

const ConfirmationContent = styled(ModalContent)`
  .task {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 0 0 4rem;

    img {
      width: 15rem;
      height: 15rem;
      border: 0.2rem solid ${props => props.theme.color.pure};
      border-radius: ${props => props.theme.sizing.radius.regular};
      box-shadow: ${props => props.theme.shadow.lite};
      margin-right: 2rem;
      object-fit: cover;
      transition: 0.25s ease all;
    }

    .info {
      flex: 1;

      h1 {
        font-size: 1.5rem;
        margin: 0.5rem 0;
      }

      h2 {
        font-size: 1.25rem;
        margin: 1rem 0 0.25rem;
        font-weight: 400;
      }

      span,
      h3 {
        font-size: 1rem;
        font-weight: 400;
      }

      p {
        font-size: 1rem;
        line-height: 1.5;
      }
    }
  }

  .confirmation {
    margin: -2rem 0 0;
    padding: 2rem 0 0;

    .photos {
      border: 0.5rem solid ${props => props.theme.color.pure};
      border-radius: ${props => props.theme.sizing.radius.regular};
      box-shadow: ${props => props.theme.shadow.lite};
      margin: 0 0 2rem;

      &:last-of-type {
        margin: 0;
      }

      h3 {
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        padding: 0.75rem 1.5rem;
        background: ${props => props.theme.color.ivory};
        color: ${props => props.theme.color.dark};
        border-radius: ${props => props.theme.sizing.radius.regular}
          ${props => props.theme.sizing.radius.regular} 0 0;
      }

      img {
        width: 100%;
        height: auto;
        margin: 0;
        object-fit: cover;
        border-radius: 0 0 ${props => props.theme.sizing.radius.regular}
          ${props => props.theme.sizing.radius.regular};
      }
    }
  }

  .action {
    width: 100%;
    margin: 2rem 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;

    textarea {
      width: 100%;
      font-size: 1rem;
      padding: 1rem 2rem;
      margin 0 0 2rem;
      color: ${props => props.theme.color.dark};
      background: ${props => props.theme.color.pure};
      border: none;
      border-radius: ${props => props.theme.sizing.radius.regular};
      box-shadow: ${props => props.theme.shadow.regular};
    }

    button {
      width: calc(50% - 1rem);
      padding: 0.75rem 1.5rem;
      border-radius: 3rem;
      box-shadow: ${props => props.theme.shadow.regular};
      font-size: 1.25rem;
      font-weight: 700;
      color: ${props => props.theme.color.pure};

      &.reject {
        background: ${props => props.theme.color.red};
      }

      &.accept {
        background: ${props => props.theme.color.blue};
      }
    }
  }
`;

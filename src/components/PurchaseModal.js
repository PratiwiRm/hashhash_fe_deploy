import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import {
  PICKER_TASK_HEADER_FIELDS,
  PICKER_TASK_TEMPLATE,
  htmlInputDateFormatter,
} from 'commons/structure';

import { InputWrapper } from 'components/SharedElements';

export default class PurchaseModal extends Component {
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
        .format('YYYY-MM-DD')
        .toString();
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
    this.props.save(this.state);
    this.props.close();
  };

  validate = () => {
    const validation = {};

    PICKER_TASK_HEADER_FIELDS.forEach(value => {
      validation[value] = '';
    });

    const invalid = false;
    const numberRegExp = /^\d+$/;

    this.setState({ validation });
    return !invalid;
  };

  render() {
    const { supplier, create, close } = this.props;

    console.log(htmlInputDateFormatter(this.state.delivery_date));

    return (
      <ModalWrapper>
        <CloseButton onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </CloseButton>
        <ModalContent>
          <h1>{create ? 'Tambah Data Pegawai' : 'Ubah Data Pegawai'}</h1>
          <InputBox>
            <span>Order ID</span>
            <input
              type="text"
              value={this.state.order_id}
              onChange={evt => this.setInput('order_id', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.order_id}
            />
            {this.state.validation.order_id && <h6>{this.state.validation.order_id}</h6>}
          </InputBox>
          <InputBox>
            <span>Delivery Date</span>
            <input
              type="date"
              value={htmlInputDateFormatter(this.state.delivery_date)}
              onChange={evt =>
                this.setInput('delivery_date', htmlInputDateFormatter(evt.target.value))
              }
              placeholder={PICKER_TASK_TEMPLATE.delivery_date}
            />
            {this.state.validation.delivery_date && <h6>{this.state.validation.delivery_date}</h6>}
          </InputBox>
          <InputBox>
            <span>Status</span>
            <input
              type="text"
              value={this.state.status}
              onChange={evt => this.setInput('status', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.status}
            />
            {this.state.validation.status && <h6>{this.state.validation.status}</h6>}
          </InputBox>
          <InputBox>
            <span>Address</span>
            <textarea
              value={this.state.address}
              onChange={evt => this.setInput('address', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.address}
            />
            {this.state.validation.address && <h6>{this.state.validation.address}</h6>}
          </InputBox>
          <InputBox>
            <span>Address Guide</span>
            <textarea
              value={this.state.address_guide}
              onChange={evt => this.setInput('address_guide', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.address_guide}
            />
            {this.state.validation.address_guide && <h6>{this.state.validation.address_guide}</h6>}
          </InputBox>
          <InputBox>
            <span>Product</span>
            <textarea
              type="text"
              value={this.state.product}
              onChange={evt => this.setInput('product', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.product}
            />
            {this.state.validation.product && <h6>{this.state.validation.product}</h6>}
          </InputBox>
          <InputBox>
            <span>Packaging</span>
            <input
              type="text"
              value={this.state.packaging}
              onChange={evt => this.setInput('packaging', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.packaging}
            />
            {this.state.validation.packaging && <h6>{this.state.validation.packaging}</h6>}
          </InputBox>
          <InputBox>
            <span>Quantity</span>
            <input
              type="number"
              value={this.state.quantity}
              onChange={evt => this.setInput('quantity', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.quantity}
            />
            {this.state.validation.quantity && <h6>{this.state.validation.quantity}</h6>}
          </InputBox>
          <InputBox>
            <span>Assigned</span>
            <input
              type="text"
              value={this.state.assigned}
              onChange={evt => this.setInput('assigned', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE.assigned}
            />
          </InputBox>
          <Switcher>
            <span>Type</span>
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
          </Switcher>
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

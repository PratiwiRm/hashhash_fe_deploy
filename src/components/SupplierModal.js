import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import { InputWrapper } from 'components/SharedElements';

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
        <CloseButton onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </CloseButton>
        <ModalContent>
          <h1>{create ? 'Tambah Data Supplier' : 'Ubah Data Supplier'}</h1>
          {!create && <h2>Supplier #{data.id}</h2>}
          <InputBox>
            <span>Nama Supplier</span>
            <input
              type="text"
              value={this.state.name}
              onChange={evt => this.setInput('name', evt.target.value)}
              placeholder="Tengkulak 123"
            />
          </InputBox>
          <InputBox>
            <span>Alamat Supplier</span>
            <textarea
              value={this.state.address}
              onChange={evt => this.setInput('address', evt.target.value)}
              placeholder="Jalan Gatot Subroto No. 12 ..."
            />
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

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 1rem;
    color: ${props => props.theme.color.blue};
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

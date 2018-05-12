import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import IconDownloadWhite from 'assets/icon_download_white.svg';

import { media } from 'commons/theme';

import SupplierCard from 'components/SupplierCard';
import SupplierModal from 'components/SupplierModal';
import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import { loadSupplier, addSupplier, editSupplier } from 'reducers/supplier';

import Navigation from '../Navigation';

@connect(
  state => ({
    supplier: state.supplier,
  }),
  {
    loadSupplier,
    addSupplier,
    editSupplier,
  }
)
export default class Supplier extends Component {
  static propTypes = {
    supplier: PropTypes.object.isRequired,
    loadSupplier: PropTypes.func.isRequired,
    addSupplier: PropTypes.func.isRequired,
    editSupplier: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      addModal: false,
      editModal: false,
      editIndex: -1,
    };
  }

  componentDidMount() {
    this.props.loadSupplier();
  }

  toggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  };

  openEditModal = index => {
    this.setState({ editModal: true, editIndex: index });
  };

  closeEditModal = () => {
    this.setState({ editModal: false, editIndex: -1 });
  };

  render() {
    const { supplier } = this.props;

    return (
      <Wrapper>
        <Navigation />
        <ControlPanel>
          <Controls>
            <Control flex>
              <span>Data:</span>
              <button className="blue">
                <img src={IconDownloadWhite} alt="upload" />Daftar Supplier
              </button>
            </Control>
            <button className="primary blue" onClick={this.toggleAddModal}>
              + Tambah Supplier
            </button>
          </Controls>
        </ControlPanel>
        <SupplierList>
          {supplier.supplier.map((value, index) => (
            <SupplierCard
              key={`${value.id}x${value.name}`}
              data={value}
              onClick={() => this.openEditModal(index)}
            />
          ))}
        </SupplierList>
        {this.state.addModal && (
          <SupplierModal create save={this.props.addSupplier} close={this.toggleAddModal} />
        )}
        {this.state.editModal && (
          <SupplierModal
            data={supplier.supplier[this.state.editIndex]}
            save={newSupplier => this.props.editSupplier(this.state.editIndex, newSupplier)}
            close={this.closeEditModal}
          />
        )}
      </Wrapper>
    );
  }
}

const SupplierList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;

  & > button {
    width: calc((100% - 8rem) / 5);
    margin: 0 2rem 2rem 0;

    &:nth-of-type(5n) {
      margin: 0 0 2rem;
    }

    ${media('smallDesktop')} {
      width: calc((100% - 6rem) / 4);

      &:nth-of-type(4n) {
        margin: 0 0 2rem;
      }

      &:nth-of-type(5n) {
        margin: 0 2rem 2rem 0;
      }
    }
  }
`;

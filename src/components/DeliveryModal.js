import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';

import {
  DRIVER_TASK_HEADER_FIELDS,
  DRIVER_TASK_TEMPLATE,
  destructurizeDriverTask,
} from 'commons/structure';
import { htmlInputDateFormatter } from 'commons/utils';

import {
  ModalWrapper,
  ModalClose,
  ModalTitle,
  ModalContent,
  ModalInput,
  ModalSubmit,
} from 'components/SharedElements';

export default class DeliveryModal extends Component {
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
    this.nodeTemplate = {};
    this.validationTemplate = {};

    DRIVER_TASK_HEADER_FIELDS.forEach(value => {
      this.nodeTemplate[value] = '';
      this.validationTemplate[value] = '';
    });

    delete this.nodeTemplate.task;
    delete this.validationTemplate.task;

    if (create) {
      this.state = {
        nodes: [
          {
            ...this.nodeTemplate,
            type: 'PICKUP',
            validation: { ...this.validationTemplate },
          },
          {
            ...this.nodeTemplate,
            type: 'DROPOFF',
            validation: { ...this.validationTemplate },
          },
        ],
      };
    } else {
      this.state = {
        nodes: [],
      };

      const destructurized = destructurizeDriverTask(data);

      destructurized.forEach(node => {
        const formatted = { ...node, validation: { ...this.validationTemplate } };
        this.state.nodes.push(formatted);
      });
    }
  }

  setInput = (field, index, value) => {
    const { nodes } = this.state;

    const node = nodes[index];
    node[field] = value;

    const newNodes = [...nodes.slice(0, index), node, ...nodes.slice(index + 1)];

    this.setState({ nodes: newNodes });
  };

  addNode = () => {
    const newNode = {
      ...this.nodeTemplate,
      type: 'DROPOFF',
      validation: { ...this.validationTemplate },
    };

    this.setState({ nodes: [...this.state.nodes, newNode] });
  };

  removeNode = index => {
    const { nodes } = this.state;
    const newNodes = [...nodes.slice(0, index), ...nodes.slice(index + 1)];

    this.setState({ nodes: newNodes });
  };

  save = () => {
    if (this.validate()) {
      const { nodes } = this.state;
      const newTask = {
        ...this.props.data,
        pick_up: [nodes[0]],
        drop_off: [...nodes.slice(1)],
      };

      this.props.save(newTask);
    }
  };

  validate = () => {
    const newNodes = [...this.state.nodes];

    let invalid = false;

    this.state.nodes.forEach((node, index) => {
      const validation = { ...this.validationTemplate };

      if (node.outlite === '') {
        invalid = true;
        validation.outlite = 'Nama outlet tidak bisa kosong';
      }

      if (node.lokasi === '') {
        invalid = true;
        validation.lokasi = 'Alamat outlet tidak bisa kosong';
      }

      if (node.note === '') {
        invalid = true;
        validation.note = 'Catatan penting tidak bisa kosong';
      }

      if (node.nama_pic === '') {
        invalid = true;
        validation.nama_pic = 'Person in charge tidak bisa kosong';
      }

      if (node.kontak_pic === '') {
        invalid = true;
        validation.kontak_pic = 'Kontak tidak bisa kosong';
      }

      newNodes[index] = { ...newNodes[index], validation };
    });

    this.setState({ nodes: newNodes });
    return !invalid;
  };

  render() {
    const { nodes } = this.state;
    const { create, close } = this.props;

    return (
      <ModalWrapper>
        <ModalClose onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </ModalClose>
        <ModalTitle>{create ? 'Tambah Tugas Logistik' : 'Ubah Tugas Logistik'}</ModalTitle>
        <DeliveryModalContent>
          <h4>* = required</h4>
          <h2>Destinasi Pengambilan</h2>
          <ModalInput>
            <span>Nama outlet*</span>
            <input
              type="text"
              value={nodes[0].outlite}
              onChange={evt => this.setInput('outlite', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].outlite}
            />
            {nodes[0].validation.outlite && <h6>{nodes[0].validation.outlite}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Alamat outlet*</span>
            <textarea
              value={nodes[0].lokasi}
              onChange={evt => this.setInput('lokasi', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].lokasi}
            />
            {nodes[0].validation.lokasi && <h6>{nodes[0].validation.lokasi}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Catatan penting*</span>
            <textarea
              value={nodes[0].note}
              onChange={evt => this.setInput('note', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].note}
            />
            {nodes[0].validation.note && <h6>{nodes[0].validation.note}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Person in Charge*</span>
            <input
              type="text"
              value={nodes[0].nama_pic}
              onChange={evt => this.setInput('nama_pic', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].nama_pic}
            />
            {nodes[0].validation.nama_pic && <h6>{nodes[0].validation.nama_pic}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Contact*</span>
            <input
              type="text"
              value={nodes[0].kontak_pic}
              onChange={evt => this.setInput('kontak_pic', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].kontak_pic}
            />
            {nodes[0].validation.kontak_pic && <h6>{nodes[0].validation.kontak_pic}</h6>}
          </ModalInput>
          <h2>Destinasi Pengiriman</h2>
          {nodes.slice(1, nodes.length).map((node, index) => (
            <DeliveryNode>
              <h3>Pengiriman #{index + 1}</h3>
              {this.state.nodes.length > 2 && (
                <DeleteNodeButton onClick={() => this.removeNode(index + 1)}>
                  - Hapus destinasi pengiriman
                </DeleteNodeButton>
              )}
              <ModalInput>
                <span>Nama outlet*</span>
                <input
                  type="text"
                  value={node.outlite}
                  onChange={evt => this.setInput('outlite', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].outlite}
                />
                {node.validation.outlite && <h6>{node.validation.outlite}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Alamat outlet*</span>
                <textarea
                  value={node.lokasi}
                  onChange={evt => this.setInput('lokasi', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].lokasi}
                />
                {node.validation.lokasi && <h6>{node.validation.lokasi}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Catatan penting*</span>
                <textarea
                  value={node.note}
                  onChange={evt => this.setInput('note', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].note}
                />
                {node.validation.note && <h6>{node.validation.note}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Person in Charge*</span>
                <input
                  type="text"
                  value={node.nama_pic}
                  onChange={evt => this.setInput('nama_pic', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].nama_pic}
                />
                {node.validation.nama_pic && <h6>{node.validation.nama_pic}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Contact*</span>
                <input
                  type="text"
                  value={node.kontak_pic}
                  onChange={evt => this.setInput('kontak_pic', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].kontak_pic}
                />
                {node.validation.kontak_pic && <h6>{node.validation.kontak_pic}</h6>}
              </ModalInput>
            </DeliveryNode>
          ))}
          <AddNodeButton onClick={this.addNode}>+ Tambah destinasi pengiriman</AddNodeButton>
          <ModalSubmit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</ModalSubmit>
        </DeliveryModalContent>
      </ModalWrapper>
    );
  }
}

const DeliveryModalContent = styled(ModalContent)`
  h2 {
    color: ${props => props.theme.color.dark};
    font-size: 2.5rem;

    &:last-of-type {
      margin: 2rem 0 0;
    }
  }

  h3 {
    color: ${props => props.theme.color.dark};
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const DeliveryNode = styled.div`
  width: 100%;
  padding: 2rem;
  border-radius: ${props => props.theme.sizing.radius.regular};
  background: ${props => props.theme.color.ivory};
  margin: 2rem 0 0;

  & > div {
    width: calc(100% + 4rem);
    margin: 0 -2rem 2rem;

    &:last-of-type {
      margin: 0 -2rem;
    }
  }
`;

const AddNodeButton = styled.button`
  width: 100%;
  margin: 2rem 0;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.sizing.radius.regular};
  color: ${props => props.theme.color.dark};
  background: ${props => props.theme.color.ivory};
  transition: 0.25s ease all;
  font-size: 1.25rem;
  font-weight: bold;

  &:hover,
  &:focus {
    color: ${props => props.theme.color.white};
    background: ${props => props.theme.color.green};
    transition: 0.25s ease all;
  }
`;

const DeleteNodeButton = styled.button`
  margin: 0 0 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.sizing.radius.regular};
  color: ${props => props.theme.color.white};
  background: ${props => props.theme.color.red};
  transition: 0.25s ease all;
  font-size: 1rem;
  font-weight: bold;

  &:hover,
  &:focus {
    opacity: 0.5;
    transition: 0.25s ease all;
  }
`;

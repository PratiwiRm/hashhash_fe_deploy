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
        pick_ups: [nodes[0]],
        drop_offs: [...nodes.slice(1)],
      };

      this.props.save(newTask);
      this.props.close();
    }
  };

  validate = () => {
    const newNodes = [...this.state.nodes];

    let invalid = false;

    this.state.nodes.forEach((node, index) => {
      const validation = { ...this.validationTemplate };

      if (node.outlet === '') {
        invalid = true;
        validation.outlet = 'Nama outlet tidak bisa kosong';
      }

      if (node.address === '') {
        invalid = true;
        validation.address = 'Alamat outlet tidak bisa kosong';
      }

      if (node.notes === '') {
        invalid = true;
        validation.notes = 'Catatan penting tidak bisa kosong';
      }

      if (node.pic === '') {
        invalid = true;
        validation.pic = 'Person in charge tidak bisa kosong';
      }

      if (node.contact === '') {
        invalid = true;
        validation.contact = 'Kontak tidak bisa kosong';
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
          <h2>Destinasi Pengambilan</h2>
          <h4>* = required</h4>
          <ModalInput>
            <span>Nama outlet*</span>
            <input
              type="text"
              value={nodes[0].outlet}
              onChange={evt => this.setInput('outlet', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].outlet}
            />
            {nodes[0].validation.outlet && <h6>{nodes[0].validation.outlet}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Alamat outlet*</span>
            <textarea
              value={nodes[0].address}
              onChange={evt => this.setInput('address', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].address}
            />
            {nodes[0].validation.address && <h6>{nodes[0].validation.address}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Catatan penting*</span>
            <textarea
              value={nodes[0].notes}
              onChange={evt => this.setInput('notes', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].notes}
            />
            {nodes[0].validation.notes && <h6>{nodes[0].validation.notes}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Person in Charge*</span>
            <input
              type="text"
              value={nodes[0].pic}
              onChange={evt => this.setInput('pic', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].pic}
            />
            {nodes[0].validation.pic && <h6>{nodes[0].validation.pic}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Contact*</span>
            <input
              type="text"
              value={nodes[0].contact}
              onChange={evt => this.setInput('contact', 0, evt.target.value)}
              placeholder={DRIVER_TASK_TEMPLATE[0].contact}
            />
            {nodes[0].validation.contact && <h6>{nodes[0].validation.contact}</h6>}
          </ModalInput>
          <h2>Destinasi Pengiriman</h2>
          <h4>* = required</h4>
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
                  value={node.outlet}
                  onChange={evt => this.setInput('outlet', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].outlet}
                />
                {node.validation.outlet && <h6>{node.validation.outlet}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Alamat outlet*</span>
                <textarea
                  value={node.address}
                  onChange={evt => this.setInput('address', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].address}
                />
                {node.validation.address && <h6>{node.validation.address}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Catatan penting*</span>
                <textarea
                  value={node.notes}
                  onChange={evt => this.setInput('notes', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].notes}
                />
                {node.validation.notes && <h6>{node.validation.notes}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Person in Charge*</span>
                <input
                  type="text"
                  value={node.pic}
                  onChange={evt => this.setInput('pic', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].pic}
                />
                {node.validation.pic && <h6>{node.validation.pic}</h6>}
              </ModalInput>
              <ModalInput>
                <span>Contact*</span>
                <input
                  type="text"
                  value={node.contact}
                  onChange={evt => this.setInput('contact', index + 1, evt.target.value)}
                  placeholder={DRIVER_TASK_TEMPLATE[0].contact}
                />
                {node.validation.contact && <h6>{node.validation.contact}</h6>}
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

  h4 {
    color: ${props => props.theme.color.gray};
  }
`;

const DeliveryNode = styled.div`
  width: 100%;
  padding: 2rem 2rem 2rem;
  border-radius: ${props => props.theme.sizing.radius.regular};
  background: ${props => props.theme.color.ivory};
  margin: 2rem 0 0;

  & > div {
    margin: 0 0 2rem;

    &:last-of-type {
      margin: 0;
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

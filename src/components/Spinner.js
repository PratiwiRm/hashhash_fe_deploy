import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

@connect(state => ({ ...state }), null)
export default class Spinner extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
    logistic: PropTypes.object.isRequired,
    purchasing: PropTypes.object.isRequired,
    supplier: PropTypes.object.isRequired,
  };

  render() {
    const { auth, employee, logistic, purchasing, supplier } = this.props;

    const isLoading =
      auth.loading ||
      employee.loading ||
      logistic.loading ||
      purchasing.loading ||
      supplier.loading;

    return (
      <Spinkit show={isLoading}>
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </Spinkit>
    );
  }
}

const Spinkit = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background: rgba(240, 240, 240, 0.75);
  display: ${props => (props.show ? 'block' : 'none')};

  .double-bounce1,
  .double-bounce2 {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: ${props => props.theme.color.blue};
    opacity: 0.6;
    position: absolute;
    top: calc(50% - 5rem);
    left: calc(50% - 5rem);
    animation: sk-bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    animation-delay: -1s;
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;

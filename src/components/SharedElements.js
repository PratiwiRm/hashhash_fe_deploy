import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';
import IconChevronWhite from 'assets/icon_chevron_white.svg';
import IconChevronInvertedWhite from 'assets/icon_chevron_inverted_white.svg';

import { media } from 'commons/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: ${props => props.theme.sizing.containerMaxWidth};
  margin: 0 auto;
  padding: 0 0 5rem;

  ${media('smallDesktop')} {
    padding: 0 2rem 5rem;
  }
`;

export const ControlPanel = styled.div`
  width: 100%;
  margin: 0 0 2rem;

  span {
    font-size: 1rem;
    color: ${props => props.theme.color.gray};
    margin-right: 0.5rem;
  }

  label {
    display: inline-block;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem 0 0;
    cursor: pointer;
    color: ${props => props.theme.color.pure};
    background: ${props => props.theme.color.blue};
    transition: 0.25s ease all;
    border: none;
    outline: none;
    box-shadow: ${props => props.theme.shadow.lite};
    border-radius: ${props => props.theme.sizing.radius.regular};

    &:hover,
    &:focus,
    &:disabled {
      transition: 0.25s ease all;
      opacity: 0.5;
    }

    & > input {
      display: none;
    }

    img {
      height: 0.875rem;
      width: auto;
      margin-right: 0.5rem;
    }
  }

  input,
  select,
  button {
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem 0 0;
    cursor: pointer;
    background: ${props => props.theme.color.pure};
    color: ${props => props.theme.color.black};
    transition: 0.25s ease all;
    border: none;
    outline: none;
    box-shadow: ${props => props.theme.shadow.lite};
    border-radius: ${props => props.theme.sizing.radius.regular};

    &:last-of-type {
      margin: 0;
    }

    &:hover,
    &:focus,
    &:disabled {
      color: ${props => props.theme.color.pure};
      background: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
    }
  }

  button {
    &.primary {
      font-size: 1.25rem;
      padding: 0.75rem 1.5rem;
    }

    &.blue {
      color: ${props => props.theme.color.pure};
      background: ${props => props.theme.color.blue};

      &:hover,
      &:focus,
      &:disabled {
        opacity: 0.5;
      }
    }

    img {
      height: 0.875rem;
      width: auto;
      margin-right: 0.5rem;
    }
  }

  select {
    padding-right: 2rem;
    background: url("${IconChevronBlue}") no-repeat 95% 50% ${props => props.theme.color.pure};
    -webkit-appearance: none;

    &:hover,
    &:focus,
    &:disabled {
      background: url("${IconChevronWhite}") no-repeat 95% 50%  ${props => props.theme.color.blue};
    }

    &:active {
      background: url("${IconChevronInvertedWhite}") no-repeat 95% 50%  ${props =>
  props.theme.color.blue};
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 0 0 2rem;

  &:last-of-type {
    margin: 0;
  }

  & > div {
    margin: 0 2rem 0 0;

    &:last-of-type {
      margin: 0;
    }
  }
`;

export const Control = styled.div`
  flex: ${props => (props.flex ? '1' : 'none')};
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  margin: ${props => (props.nomargin ? '0' : '0 0 1rem')};
  color: ${props => props.theme.color.blue};
`;

export const InputWrapper = styled.div`
  span {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0 0 0.25rem;
    color: ${props => props.theme.color.gray};
  }

  input,
  textarea,
  select {
    font-size: 1rem;
    font-weight: 700;
    width: 100%;
    padding: 0.5rem 1rem;
    margin: 0;
    cursor: pointer;
    background: ${props => props.theme.color.pure};
    color: ${props => props.theme.color.black};
    transition: 0.25s ease all;
    border: none;
    outline: none;
    box-shadow: ${props => props.theme.shadow.lite};
    border-radius: ${props => props.theme.sizing.radius.regular};

    &:last-of-type {
      margin: 0;
    }

    &:hover,
    &:focus,
    &:disabled {
      color: ${props => props.theme.color.pure};
      background: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
    }
  }

  select {
    padding-right: 2rem;
    background: url("${IconChevronBlue}") no-repeat 95% 50% ${props => props.theme.color.pure};
    -webkit-appearance: none;

    &:hover,
    &:focus,
    &:disabled {
      background: url("${IconChevronWhite}") no-repeat 95% 50%  ${props => props.theme.color.blue};
    }

    &:active {
      background: url("${IconChevronInvertedWhite}") no-repeat 95% 50%  ${props =>
  props.theme.color.blue};
    }
  }

  h6 {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0.25rem 0 0;
    padding: 0.5rem 1rem;
    color: ${props => props.theme.color.pure};
    background: ${props => props.theme.color.red};
    border-radius: ${props => props.theme.sizing.radius.small};
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.theme.zindex.modal};
  width: 100%;
  height: 100%;
  background: ${props => props.theme.color.whiteRGBA('0.95')};
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ModalClose = styled.button`
  width: 100%;
  max-width: ${props => props.theme.sizing.containerMaxWidth};
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 5rem auto 1rem;
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

export const ModalTitle = styled.h1`
  width: 100%;
  max-width: ${props => props.theme.sizing.containerMaxWidth};
  margin: 0 auto 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.color.blue};
`;

export const ModalContent = styled.div`
  margin: 0 auto 5rem;
  width: 100%;
  max-width: ${props => props.theme.sizing.containerMaxWidth};
  background: ${props => props.theme.color.pure};
  border-radius: ${props => props.theme.sizing.radius.card};
  box-shadow: ${props => props.theme.shadow.regular};
  padding: 2rem;
`;

export const ModalInput = styled(InputWrapper)`
  width: 100%;
  margin: 2rem 0 0;

  input,
  select {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }

  select,
  select:hover,
  select:focus,
  select:active {
    background-position: 97.5% 50%;
  }
`;

export const ModalSwitcher = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin: 2rem 0 0;

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

  h6 {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0.5rem 0 0;
    padding: 0.5rem 1rem;
    color: ${props => props.theme.color.pure};
    background: ${props => props.theme.color.red};
    border-radius: ${props => props.theme.sizing.radius.small};
  }
`;

export const ModalSubmit = styled.button`
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

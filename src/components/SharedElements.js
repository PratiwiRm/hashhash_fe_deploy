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

    &:last-of-type {
      margin: 0;
    }

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

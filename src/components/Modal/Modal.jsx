import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.switchBodyScroll('hidden', '17px');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.switchBodyScroll('unset', '0');
  }

  switchBodyScroll(state, margin) {
    document.body.style.overflow = state;
    document.body.style.marginRight = margin;
  }

  handleKeyDown = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, children } = this.props;

    return (
      <Overlay
        onClick={({ target, currentTarget }) => {
          if (target === currentTarget) {
            closeModal();
          }
        }}
      >
        <ModalWindow>{children}</ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

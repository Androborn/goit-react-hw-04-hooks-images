import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

export function Modal({ closeModal, children }) {
  useEffect(() => {
    const keydownHandler = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', keydownHandler);
    switchBodyScroll('hidden', '17px');
    return () => {
      window.removeEventListener('keydown', keydownHandler);
      switchBodyScroll('unset', '0');
    };
  }, [closeModal]);

  function switchBodyScroll(state, margin) {
    document.body.style.overflow = state;
    document.body.style.marginRight = margin;
  }

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

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

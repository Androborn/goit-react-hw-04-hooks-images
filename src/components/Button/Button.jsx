import PropTypes from 'prop-types';

import { Btn } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <Btn type="button" onClick={onClick}>
      {children}
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

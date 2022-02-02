import PropTypes from 'prop-types';

import { SearchbarHeader } from './Searchbar.styled';

export const Searchbar = ({ children }) => {
  return <SearchbarHeader>{children}</SearchbarHeader>;
};

Searchbar.propTypes = {
  children: PropTypes.node.isRequired,
};

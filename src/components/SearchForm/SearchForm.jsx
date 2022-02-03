import { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, FormBtn, FormBtnLabel, FormInput } from './SearchForm.styled';

export function SearchForm({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchSubmit(e) {
    e.preventDefault();

    onSubmit(searchQuery.toLowerCase());
    resetForm();
  }

  function resetForm() {
    setSearchQuery('');
  }

  return (
    <Form onSubmit={handleSearchSubmit}>
      <FormBtn type="submit">
        <FormBtnLabel>Search</FormBtnLabel>
      </FormBtn>

      <FormInput
        type="text"
        autoComplete="off"
        autoFocus
        placeHolder="Search images and photos"
        name="searchQuery"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
    </Form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

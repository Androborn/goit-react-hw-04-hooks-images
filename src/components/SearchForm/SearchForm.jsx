import { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, FormBtn, FormBtnLabel, FormInput } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    return this.setState({
      [name]: value,
    });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    const { resetForm } = this;
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    onSubmit(searchQuery.toLowerCase());
    resetForm();
  };

  resetForm = () =>
    this.setState({
      searchQuery: '',
    });

  render() {
    const { handleSearchSubmit, handleInputChange } = this;
    const { searchQuery } = this.state;

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
          onChange={handleInputChange}
        />
      </Form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

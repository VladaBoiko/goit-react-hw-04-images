import { Form, Field, Formik } from 'formik';
import { Header } from './SearchBar.styled';
import PropTypes from 'prop-types';
const initialValues = {
  query: '',
  page: 1,
};
export const SearchBar = ({ updateQuery }) => {
  const handleSubmit = (values, { resetForm }) => {
    updateQuery(values);
    // getData();
    resetForm();
  };
  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <Field
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <button type="submit">
            <span>Search</span>
          </button>
        </Form>
      </Formik>
    </Header>
  );
};

SearchBar.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  // getData: PropTypes.func.isRequired,
};

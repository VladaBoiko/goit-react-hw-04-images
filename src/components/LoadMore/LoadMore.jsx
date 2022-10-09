import { Button } from './loadMore.styled';
import PropTypes from 'prop-types';
export const LoadMore = ({ click }) => {
  return (
    <Button type="button" onClick={click}>
      Load more...
    </Button>
  );
};

LoadMore.propTypes = {
  click: PropTypes.func.isRequired,
};

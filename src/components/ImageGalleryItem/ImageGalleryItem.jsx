import { Li } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
export const ImgGalleryItem = ({ img, alt, onClick, largeImageURL }) => {
  return (
    <Li>
      <img src={img} alt={alt} data-src={largeImageURL} onClick={onClick} />
    </Li>
  );
};

ImgGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

import { ImgGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import { Ul } from './ImageGallery.styled';
import PropTypes from 'prop-types';
export const ImgGallery = ({ data, onClick }) => {
  return (
    <Ul>
      {data.map(img => {
        return (
          <ImgGalleryItem
            img={img.webformatURL}
            alt={img.tags}
            largeImageURL={img.largeImageURL}
            key={nanoid(4)}
            onClick={onClick}
          />
        );
      })}{' '}
    </Ul>
  );
};

ImgGallery.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

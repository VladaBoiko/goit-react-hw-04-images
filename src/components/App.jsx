/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { SearchBar } from './Searchbar/SearchBar';
import { ImgGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'API/Api';
import { LoadMore } from './LoadMore/LoadMore';
import Modal from './Modal/Modal';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalBigImg, setModalBigImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const updateQuery = value => {
    setQuery(value.query);
    setPage(1);
    setImages([]);
  };
  const getData = async () => {
    try {
      if (!query) {
        console.log(query);
        return;
      }
      setIsLoading(true);
      const images = await getImages(page, query);
      setImages(state => [...state, ...images.images]);
      setIsLoading(false);
      setHits(images.total);
      setTotalHits(images.totalHits);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);
  const loadMore = async () => {
    setPage(state => state + 1);
  };
  const toggleModal = evt => {
    setShowModal(state => !state);
    if (evt.target.nodeName !== 'IMG') {
      return;
    }
    setModalBigImg(evt.target.dataset.src);
    setModalAlt(evt.target.getAttribute('alt'));
  };
  const resetModal = () => {
    setShowModal(state => !state);
    setModalBigImg('');
    setModalAlt('');
  };
  return (
    <div
      style={{
        width: '1240px',
        padding: '0 20px',
        margin: '0 auto',
      }}
    >
      <SearchBar updateQuery={updateQuery} />
      {images.length === 0 && !isLoading && (
        <p
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: '75px',
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: '#87a9c7',
          }}
        >
          There`re no images yet. Please enter the search category!
        </p>
      )}
      {images.length !== 0 && (
        <>
          <ImgGallery data={images} onClick={toggleModal} />{' '}
        </>
      )}
      {hits >= 12 && images.length !== totalHits && !isLoading && (
        <LoadMore click={loadMore} />
      )}

      {isLoading && (
        <ColorRing
          visible={true}
          height="180"
          width="180"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {showModal && (
        <Modal src={modalBigImg} alt={modalAlt} close={resetModal} />
      )}
    </div>
  );
}

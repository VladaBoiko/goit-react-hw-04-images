import { ColorRing } from 'react-loader-spinner';
import { Component } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImgGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'API/Api';
import { LoadMore } from './LoadMore/LoadMore';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    error: false,
    page: 1,
    hits: null,
    totalHits: null,
    showModal: false,
    modalData: {
      bigImg: '',
      alt: '',
    },
  };
  updateQuery = value => {
    this.setState({
      query: value.query,
      page: 1,
      images: [],
    });
  };
  getData = async () => {
    // console.log(this.state, 'get');
    try {
      if (!this.state.query) {
        console.log(this.state.query);
        return;
      }
      this.setState({ isLoading: true });
      const images = await getImages(this.state.page, this.state.query);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.images],
        isLoading: false,
        hits: images.total,
        totalHits: images.totalHits,
      }));
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error);
    }
  };
  async componentDidUpdate(_, prevState) {
    const prevRequest = prevState.query;
    const nextRequest = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      // console.log(this.state, 'update')
      this.state.images = [];
      this.state.page = 1;
      this.getData();
    }
    if (prevPage !== nextPage) {
      this.getData();
    }
  }
  loadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  toggleModal = evt => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (evt.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({
      modalData: {
        bigImg: evt.target.dataset.src,
        alt: evt.target.getAttribute('alt'),
      },
    });
  };
  resetModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({
      modalData: {
        bigImg: '',
        alt: '',
      },
    });
  };
  render() {
    const { images, isLoading, hits, totalHits, showModal, modalData } =
      this.state;
    const { bigImg, alt } = modalData;
    return (
      <div
        style={{
          width: '1240px',
          padding: '0 20px',
          margin: '0 auto',
        }}
      >
        <SearchBar updateQuery={this.updateQuery} />
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
            <ImgGallery data={images} onClick={this.toggleModal} />{' '}
          </>
        )}
        {hits >= 12 && images.length !== totalHits && !isLoading && (
          <LoadMore click={this.loadMore} />
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
        {showModal && <Modal src={bigImg} alt={alt} close={this.resetModal} />}
      </div>
    );
  }
}

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Window } from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.clickEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEscape);
  }

  clickEscape = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.props.close();
  };

  clickBackdrop = event => {
    console.log(event.target);
    console.log(event.currentTarget);
    if (event.target !== event.currentTarget) {
      return;
    }
    this.props.close();
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <Backdrop onClick={this.clickBackdrop}>
        <Window>
          <img src={src} alt={alt} />
        </Window>
      </Backdrop>,
      document.querySelector('#modal-root')
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

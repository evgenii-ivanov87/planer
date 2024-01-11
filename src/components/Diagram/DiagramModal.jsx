import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from '@material-ui/core';
import { ReactComponent as CloseModalBtn } from '../Modal/closeModalBtn.svg';

import PropTypes from 'prop-types';
import { refs } from './refs';
import Diagram from './Diagram';

import s from './Diagram.module.scss';

const modalRoot = document.querySelector('#modal-root');

const DiagramModal = ({ sprint, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseByEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseByEsc);
    };
  });

  // Close by backdrop
  const handleCloseByBackdrop = e =>
    e.currentTarget === e.target && onCloseModal();

  // Close by ESC
  const handleCloseByEsc = e => e.code === 'Escape' && onCloseModal();

  // Close by click on btn
  const handleCloseByButton = () => onCloseModal();

  // ------- useMediaQuery -------
  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const tabletMin = useMediaQuery(handleMinWidth(refs.tabletMin));
  const mobileMax = useMediaQuery(handleMaxWidth(refs.mobileMax));

  // ----- End useMediaQuery -----

  return createPortal(
    <div className={s.backdrop} onClick={handleCloseByBackdrop}>
      <div className={s.content}>
        <CloseModalBtn
          className={s.CloseModalBtn}
          onClick={handleCloseByButton}
        />

        {mobileMax && <p className={s.contentText}>Rotate your device</p>}
        {tabletMin && <Diagram sprint={sprint} />}
      </div>
    </div>,
    modalRoot,
  );
};

DiagramModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default DiagramModal;

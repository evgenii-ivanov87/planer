import s from './ButtonClose.module.scss';
import PropTypes from 'prop-types';

const ButtonClose = ({ onClose }) => {
  return (
    <button
      type="button"
      className={`${s.btnClose} ${s.btnCloseDiagram}`}
      onClick={onClose}
    ></button>
  );
};
ButtonClose.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ButtonClose;

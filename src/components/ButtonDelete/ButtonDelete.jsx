import PropTypes from 'prop-types';

import styles from './ButtonDelete.module.scss';

const ButtonDelete = ({ handleClick }) => {
  return (
    <button
      type="button"
      className={styles.btnDelete}
      onClick={() => handleClick()}
    ></button>
  );
};

ButtonDelete.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ButtonDelete;

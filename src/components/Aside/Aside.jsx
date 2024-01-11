import PropTypes from 'prop-types';

import s from './Aside.module.scss';

const Aside = ({ children }) => <aside className={s.Aside}>{children}</aside>;

Aside.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Aside;

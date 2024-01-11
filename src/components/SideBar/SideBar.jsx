import s from './SideBar.module.scss';

import PropTypes from 'prop-types';

const SideBar = ({ children }) => <div className={s.SideBar}>{children}</div>;

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideBar;

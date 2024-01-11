import PropTypes from 'prop-types';

import s from './SideBarScrollWrap.module.scss';

const SideBarScrollWrap = ({ children }) => (
  <div className={s.SideBarScrollWrap}>{children}</div>
);

SideBarScrollWrap.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideBarScrollWrap;

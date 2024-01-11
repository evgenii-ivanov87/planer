import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserBar from 'components/UserBar';
import { getIsAuthenticated } from 'redux/auth/auth-selectors';
import routes from 'routes';

import result from './images/logo.svg';
import styles from './AppBar.module.scss';

export default function AppBar() {
  const isAuthorized = useSelector(getIsAuthenticated);

  return (
    <header className={styles.Header}>
      <NavLink to={isAuthorized ? routes.projects : routes.signup}>
        <img src={result} alt="companyLogo" className={styles.Logo} />
      </NavLink>

      {isAuthorized && <UserBar />}
    </header>
  );
}

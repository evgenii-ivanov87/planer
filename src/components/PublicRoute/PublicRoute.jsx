import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsAuthenticated } from '../../redux/auth/auth-selectors';

const PublicRoute = ({ component: Component, redirectTo, ...routeProps }) => {
  const isAuthorized = useSelector(getIsAuthenticated);

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthorized && routeProps.restricted ? (
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;

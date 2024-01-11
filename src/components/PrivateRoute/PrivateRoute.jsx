import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsAuthenticated } from 'redux/auth/auth-selectors';

const PrivateRoute = ({ component: Component, redirectTo, ...routeProps }) => {
  const isAuthorized = useSelector(getIsAuthenticated);

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthorized ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

export default PrivateRoute;

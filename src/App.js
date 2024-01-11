import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from 'components/Loader/Loader';
import Container from 'components/Container';
import AppBar from 'components/AppBar';
import Footer from 'components/Footer';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import authOperations from 'redux/auth/auth-operations';
import {
  getIsAuthenticated,
  getIsSignup,
  getStatusLoadingUser,
} from 'redux/auth/auth-selectors';
import AuthComponent from './components/AuthComponent';

import routes from 'routes';
import './scss/_main.scss';

const LoginPage = lazy(
  () => import('./pages/LoginPage') /* webpackChunkName: "LoginPage" */,
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage" */),
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage' /* webpackChunkName: "ProjectsPage" */),
);
const SprintsPage = lazy(() =>
  import('./pages/SprintsPage' /* webpackChunkName: "SprintsPage" */),
);
const TasksPage = lazy(() =>
  import('./pages/TasksPage' /* webpackChunkName: "TasksPage" */),
);

const App = () => {
  const isAuthorized = useSelector(getIsAuthenticated);
  const isSignup = useSelector(getIsSignup);
  const isLoadingUser = useSelector(getStatusLoadingUser);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoad(true);
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />

      <Container>
        <Suspense fallback={<Spinner />}>
          {isLoadingUser || (
            <Switch>
              <PublicRoute
                path={routes.login}
                restricted
                component={LoginPage}
                redirectTo={routes.projects}
              />

              <Route
                path={routes.signup}
                restricted
                render={props =>
                  isAuthorized ? (
                    <Redirect to={routes.projects} />
                  ) : isSignup ? (
                    <Redirect to={routes.login} />
                  ) : (
                    <RegisterPage />
                  )
                }
              />

              <Route
                path={routes.google}
                restricted
                render={props =>
                  isAuthorized ? (
                    <Redirect to={routes.projects} />
                  ) : isSignup ? (
                    <Redirect to={routes.login} />
                  ) : (
                    <AuthComponent />
                  )
                }
              />

              <PrivateRoute
                path={routes.tasks}
                restricted
                component={TasksPage}
                redirectTo={routes.login}
              />

              <PrivateRoute
                path={routes.sprints}
                restricted
                component={SprintsPage}
                redirectTo={routes.login}
              />

              <PrivateRoute
                path={routes.projects}
                restricted
                component={ProjectsPage}
                redirectTo={routes.login}
              />

              <Route
                path={routes.home}
                restricted
                render={props =>
                  isAuthorized ? (
                    <Redirect to={routes.projects} />
                  ) : (
                    <Redirect to={routes.signup} />
                  )
                }
              />
              <Redirect to={routes.home} />
            </Switch>
          )}
        </Suspense>
      </Container>
      {load && <Footer />}
    </>
  );
};

export default App;

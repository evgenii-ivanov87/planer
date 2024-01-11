import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

const AuthComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(authOperations.getUserByGoogleAuth()), [dispatch]);
  return <p>Checking...</p>;
};

export default AuthComponent;

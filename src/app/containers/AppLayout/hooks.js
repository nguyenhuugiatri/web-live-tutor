import { makeSelectIsAuthenticated } from 'app/containers/Login/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { emitConnectionLogin, emitDisconnectionLogout } from './socket';
import { selectUserInfoAuthenticate } from 'app/containers/Login/selectors';

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const user = useSelector(selectUserInfoAuthenticate);

  if (isAuthenticated) {
    emitConnectionLogin(user);
  } else {
    emitDisconnectionLogout();
  }

  return {
    selectors: {
      isAuthenticated,
      currentRole: user?.currentRole,
    },
    handler: {},
  };
};

export const useAuthenticatedRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const isRedirect = ['/login', '/register'].includes(location.pathname);
  const { from } = location.state || { from: { pathname: '/' } };
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated && isRedirect) {
      history.replace(from);
    }
  }, [isAuthenticated, history, from, isRedirect]);
};

export default useHooks;

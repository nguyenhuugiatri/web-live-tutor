import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const login = payload => {
  return request(WEB_API, {
    url: 'auth/login',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const register = payload => {
  return request(WEB_API, {
    url: 'auth/register',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const verifyAccount = token => {
  return request(WEB_API, {
    url: `auth/verifyAccount`,
    params: {
      token,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const google = payload => {
  return request(WEB_API, {
    url: 'auth/google',
    method: 'POST',
    data: {
      access_token: payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const facebook = payload => {
  return request(WEB_API, {
    url: 'auth/facebook',
    method: 'POST',
    data: {
      access_token: payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const getRefreshToken = payload => {
  return request(WEB_API, {
    url: 'auth/refresh-token',
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

import axios from 'axios';
import i18n from 'locales/i18n';
import get from 'lodash/fp/get';
import isNil from 'lodash/fp/isNil';
import { errorCode } from 'utils/constants';
import { getAccessToken } from 'utils/localStorageUtils';
import { notifyError } from 'utils/notify';

const createClient = (baseURL, isMultipart = 0) => {
  if (!isMultipart) {
    return axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
      },
    });
  } else {
    return axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
      },
    });
  }
};

const request = (baseURL, options, isMultipart) => {
  const onSuccess = response => response;
  const onError = error => Promise.reject(error.response || error.message);
  const client = createClient(baseURL, isMultipart);
  return client(options).then(onSuccess).catch(onError);
};

export const handleGeneralError = error => {
  handleShowError(error);
  if (!isNil(error.response)) {
    return {
      error: error.response
        .clone()
        // json() method returns a promise that resolves with the result as JSON
        .json()
        .catch(() => error.response.text())
        .then(objData => ({
          error: { ...objData, status: error.response.status },
        })),
    };
  }
  return { error };
};

const handleShowError = error => {
  const message = get('data.message', error);
  const statusCode = get('data.statusCode', error);
  const messaseShow = i18n.t(`Error_code.${errorCode[statusCode]}`);
  if (statusCode && errorCode[statusCode] && message) notifyError(messaseShow);
};

export default request;

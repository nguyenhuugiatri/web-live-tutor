import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const depositToAccount = payload => {
  return request(BASE_URL, {
    url: `/payment/deposit`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

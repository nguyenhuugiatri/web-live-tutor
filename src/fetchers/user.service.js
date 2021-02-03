import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const manageFavoriteTutor = tutorId => {
  return request(WEB_API, {
    url: 'user/manageFavoriteTutor',
    method: 'POST',
    data: { tutorId },
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};

export const getFavoriteTutorList = () => {
  return request(WEB_API, {
    url: 'user/favoriteTutor',
    method: 'GET',
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};

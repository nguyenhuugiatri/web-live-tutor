import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getCoursesList = id => {
  return request(BASE_URL, {
    url: `/course`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getDetailCourse = id => {
  return request(BASE_URL, {
    url: `/course/${id}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const tutorAddCourse = id => {
  return request(BASE_URL, {
    url: `/course/${id}`,
    method: 'POST',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const tutorRemoveCourse = id => {
  return request(BASE_URL, {
    url: `/course/${id}`,
    method: 'DELETE',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

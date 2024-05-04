// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** errorHtml GET http://localhost:7529/api/error */
export async function errorHtmlUsingGet(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('http://localhost:7529/api/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** errorHtml PUT http://localhost:7529/api/error */
export async function errorHtmlUsingPut(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('http://localhost:7529/api/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** errorHtml POST http://localhost:7529/api/error */
export async function errorHtmlUsingPost(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('http://localhost:7529/api/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** errorHtml DELETE http://localhost:7529/api/error */
export async function errorHtmlUsingDelete(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('http://localhost:7529/api/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** errorHtml PATCH http://localhost:7529/api/error */
export async function errorHtmlUsingPatch(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('http://localhost:7529/api/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** error GET http://localhost:7529/api/error */
export async function errorUsingGet(options?: { [key: string]: any }) {
  return request<Record<string, any>>('http://localhost:7529/api/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** error PUT http://localhost:7529/api/error */
export async function errorUsingPut(options?: { [key: string]: any }) {
  return request<Record<string, any>>('http://localhost:7529/api/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** error POST http://localhost:7529/api/error */
export async function errorUsingPost(options?: { [key: string]: any }) {
  return request<Record<string, any>>('http://localhost:7529/api/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** error DELETE http://localhost:7529/api/error */
export async function errorUsingDelete(options?: { [key: string]: any }) {
  return request<Record<string, any>>('http://localhost:7529/api/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** error PATCH http://localhost:7529/api/error */
export async function errorUsingPatch(options?: { [key: string]: any }) {
  return request<Record<string, any>>('http://localhost:7529/api/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}

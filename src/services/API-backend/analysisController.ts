// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInterfaceInfoInvoke GET http://localhost:7529/api/analysis/top/interface/invoke */
export async function listTopInterfaceInfoInvokeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVO>('http://localhost:7529/api/analysis/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}

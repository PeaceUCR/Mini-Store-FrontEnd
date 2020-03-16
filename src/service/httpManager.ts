import Taro from '@tarojs/taro';

function BindApiBaseUrl(url: string, baseUrl: string = `${API_HOST}`) {
  if (/^https:\/\//i.test(url)) {
    return url;
  } else {
    return `${baseUrl}${url}`;
  }
}


export function handleOtherError(error) {
  return Taro.showModal({
    title: '',
    content: JSON.stringify(error),
    showCancel: false
  });
}

function api<Req = any, Res = any>(
  url: string,
  data: Req | {},
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'): Promise<Res> {
  const token = Taro.getStorageSync('token');

  console.log(`http request: ${url}`, data);

  return Taro.request({
    url: BindApiBaseUrl(url),
    data,
    header: {
      'content-type': 'application/json;charset=UTF-8',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    method,
  }).then((res) => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      return res.data as Res;
    } else {
      throw res;
    }
  }).catch((error) => {
    handleOtherError(error);
    console.error(url, error);
    throw error;
  });
}

export function get<Req = any, Res = any>(url: string, data: object | {}): Promise<Res> {
  return api<Req, Res>(url, data, 'GET');
}

export function post<Req = any, Res = any>(url: string, data: object | {}): Promise<Res> {
  return api<Req, Res>(url, data, 'POST');
}

export function put<Req = any, Res = any>(url: string, data: object | {}): Promise<Res> {
  return api<Req, Res>(url, data, 'PUT');
}




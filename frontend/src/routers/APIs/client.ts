import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from 'axios';

const BASE_URL = 'http://localhost:8080/';

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

export const client = axios.create(axiosConfig);
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const access_token = localStorage.getItem('jwtToken');
  /* 토큰이 있을 경우 헤더에 삽입한다. 없을 경우 빈 문자열을 넣는다(null은 안됨) */
  if (!!access_token) {
    config.headers = {
      Authorization: !!access_token ? `${access_token}` : '',
    };
  }
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  console.log(
    `response : ${method?.toUpperCase()} ${url} | Response ${status}`,
  );
  return response;
};

const onError = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err);
};

client.interceptors.request.use(onRequest, onError);
client.interceptors.response.use(onResponse, onError);

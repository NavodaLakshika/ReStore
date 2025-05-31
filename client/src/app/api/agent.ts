import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Router';
import { PaginatedResponse } from '../models/pagination';
import { store } from '../store/configureStore';

const sleep = () => new Promise(resolve => setTimeout(resolve, 400));

// Axios global config
axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

// Extract response body
const responseBody = (response: AxiosResponse) => response.data;

// Attach token if available
axios.interceptors.request.use(config => {
  const token = store.getState().account.user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axios.interceptors.response.use(
  async response => {
    await sleep();

    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
      return response;
    }

    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data?.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(...data.errors[key]);
            }
          }
          throw modelStateErrors;
        }
        toast.error(data?.title || 'Bad Request');
        break;
      case 401:
        toast.error(data?.title);
        break;
      case 404:
        toast.error(data?.title || 'Not Found');
        break;
      case 500:
        router.navigate('/server-error', { state: { error: data } });
        break;
      default:
        toast.error('Something went wrong');
        break;
    }

    return Promise.reject(error.response);
  }
);

// Generic HTTP methods
const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(responseBody),
};

// Domain-specific API calls
const Catalog = {
  list: (params: URLSearchParams) => requests.get('products', params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get('products/filters'),
};

const TestErrors = {
  Get400Error: () => requests.get('buggy/bad-request'),
  Get401Error: () => requests.get('buggy/unauthorized'),
  Get404Error: () => requests.get('buggy/not-found'),
  Get500Error: () => requests.get('buggy/server-error'),
  GetValidationError: () => requests.get('buggy/validation-error'),
};

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
  login: (values: any) => requests.post('account/login', values),
  register: (values: any) => requests.post('account/register', values),
  currentUser: () => requests.get('account/currentUser'),
};

// Exporting all API agents
export const agent = {
  Catalog,
  TestErrors,
  Basket,
  Account,
};

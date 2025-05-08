import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";

const sleep = () => new Promise(resolve => setTimeout(resolve, 400));

// Set base URL
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; // Enable cookies for cross-origin requests

// Extract response body
const responseBody = (response: AxiosResponse) => response.data;

// Axios response interceptor
axios.interceptors.response.use(async response => {

await sleep(); // Simulate delay for testing

  return response
},
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(...data.errors[key]);
            }
          }
          throw modelStateErrors;
        }
        toast.error(data.title || 'Bad Request');
        break;
      case 401:
        toast.error(data.title || 'Unauthorized');
        break;
      case 404:
        toast.error(data.title || 'Not Found');
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

// Generic request methods
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

// API calls
const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`)
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

}

// ✅ Export agent with named export
export const agent = {
  Catalog,
  TestErrors,
  Basket,
};

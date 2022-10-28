import axios from 'axios';

const getToken = () => localStorage.getItem('ma_token');

const client = axios.create({
  baseURL: 'http://localhost:8290',
});

client.interceptors.request.use( (config) =>{
  const token = getToken();
  if (token) {
    // eslint-disable-next-line 
    config.headers['authorization'] = token;
  }
  return config;
});

export function getProducts(query=undefined) {
  if(query){
    return client.get(`/products/${query}`).then((res) => res.data.data);
  }
  return client.get('/products').then((r) => r.data.data);
}

export function updateProduct(data){
  return client.put(`/products/${data.id}`,data).then((r) => r.data.data);
}

export function deleteProduct(data){
  return client.delete(`/products/${data.id}`).then((r) => r.data.data);
}

export function addProduct(data){
  return client.post(`/products`,data).then((r) => r.data.data);
}

export function authenticateUser() {
  return client.get('/authentication').then((r) => r.data.data);
}

export function signUpUser(user) {
  return client.post('/authentication/signup', user).then((r) => r.data.data);
}

export function loginUser(user) {
  return client.post('/authentication/login', user).then((r) => r.data.data);
}

export function getMobilePin(mobileNumber) {
  console.log(mobileNumber)
  return client.get(`/payment/getMobilePin/${mobileNumber}`).then((r) => r.data.data);
}

export function getDeliveryCost(address) {
  return client.get(`/delivery/${address}`).then((r) => r.data.data);
}

export function customerPayment(data) {
  return client.post('/customer/buy', data).then((r) => r.data.data);
}
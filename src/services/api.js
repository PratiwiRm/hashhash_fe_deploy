import defaults from 'superagent-defaults';

const baseURL = 'http://35.198.250.145:8000/api';
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dharmawan/image/upload';
const cloudinaryPreset = 'm4hytxid';

const apiURLs = {
  login: `${baseURL}/login/`,
  driver: `${baseURL}/driver/`,
  picker: `${baseURL}/picker/`,
  supplier: `${baseURL}/supplier/`,
  ktp: `${baseURL}/ktp/`,
  sim: `${baseURL}/sim/`,
};

const request = defaults();
const requestCloudinary = defaults();

export async function loginPost(username, password) {
  return request.post(apiURLs.login).send({ username, password });
}

export async function driverGet() {
  return request.get(apiURLs.driver);
}

export async function driverPost(data) {
  return request.post(apiURLs.driver).send(data);
}

export async function driverPut(id, data) {
  return request.put(`${apiURLs.driver}${id}/`).send(data);
}

export async function pickerGet() {
  return request.get(apiURLs.picker);
}

export async function pickerPost(data) {
  return request.post(apiURLs.picker).send(data);
}

export async function pickerPut(id, data) {
  return request.put(`${apiURLs.picker}${id}/`).send(data);
}

export async function supplierGet() {
  return request.get(apiURLs.supplier);
}

export async function supplierPost(data) {
  return request.post(apiURLs.supplier).send(data);
}

export async function supplierPut(id, data) {
  return request.put(`${apiURLs.supplier}${id}/`).send(data);
}

export async function ktpGet() {
  return request.get(apiURLs.ktp);
}

export async function ktpPost(data) {
  return request.post(apiURLs.ktp).send(data);
}

export async function ktpPut(id, data) {
  return request.put(`${apiURLs.ktp}${id}/`).send(data);
}

export async function simGet() {
  return request.get(apiURLs.sim);
}

export async function simPost(data) {
  return request.post(apiURLs.sim).send(data);
}

export async function simPut(id, data) {
  return request.put(`${apiURLs.sim}${id}/`).send(data);
}

export async function uploadImage(image, progress) {
  return requestCloudinary
    .post(cloudinaryUrl)
    .field('upload_preset', cloudinaryPreset)
    .field('file', image)
    .on(progress);
}

export default request;

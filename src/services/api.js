import defaults from 'superagent-defaults';

const baseURL = 'http://35.186.148.120:8080/api';
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dharmawan/image/upload';
const cloudinaryPreset = 'm4hytxid';

const apiURLs = {
  login: `${baseURL}/login/`,
  driver: `${baseURL}/driver/`,
  picker: `${baseURL}/picker/`,
  supplier: `${baseURL}/supplier/`,
  ktp: `${baseURL}/ktp/`,
  sim: `${baseURL}/sim/`,
  batch: `${baseURL}/batch/`,
  task_picker: `${baseURL}/task_picker/`,
  task_driver: `${baseURL}/task_driver/`,
  pemberian_task: `${baseURL}/pemberian_task/`,
  polling_bantuan: `${baseURL}/polling/bantuan/`,
  rangkuman_tugas_per_hari: `${baseURL}/rangkuman_tugas_per_hari/`,
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

export async function supplierDelete(id) {
  return request.delete(`${apiURLs.supplier}${id}/`);
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

export async function batchGet() {
  return request.get(apiURLs.batch);
}

export async function batchPost(data) {
  return request.post(apiURLs.batch).send(data);
}

export async function batchPut(id, data) {
  return request.put(`${apiURLs.batch}${id}/`).send(data);
}

export async function taskPickerGet() {
  return request.get(apiURLs.task_picker);
}

export async function taskPickerPost(data) {
  return request.post(apiURLs.task_picker).send(data);
}

export async function taskPickerPut(id, data) {
  return request.put(`${apiURLs.task_picker}${id}/`).send(data);
}

export async function taskDriverGet() {
  return request.get(apiURLs.task_driver);
}

export async function taskDriverPost(data) {
  return request.post(apiURLs.task_driver).send(data);
}

export async function taskDriverPut(id, data) {
  return request.put(`${apiURLs.task_driver}${id}/`).send(data);
}

export async function taskDriverDetailGet(id) {
  return request.get(`${apiURLs.task_driver}${id}/`);
}

export async function taskDriverPickUpPost(taskId, data) {
  return request.post(`${baseURL}/${taskId}/pick_up/`).send(data);
}

export async function taskDriverPickUpPut(taskId, pickUpId, data) {
  return request.put(`${baseURL}/${taskId}/pick_up/${pickUpId}/`).send(data);
}

export async function taskDriverDropOffPost(taskId, data) {
  return request.post(`${baseURL}/${taskId}/drop_off/`).send(data);
}

export async function taskDriverDropOffPut(taskId, dropOffId, data) {
  return request.put(`${baseURL}/${taskId}/drop_off/${dropOffId}/`).send(data);
}

export async function taskDriverDropOffDelete(taskId, dropOffId) {
  return request.delete(`${baseURL}/${taskId}/drop_off/${dropOffId}/`);
}

export async function pemberianTaskGet() {
  return request.get(apiURLs.pemberian_task);
}

export async function pemberianTaskPost(data) {
  return request.post(apiURLs.pemberian_task).send(data);
}

export async function pemberianTaskPut(idTask, usernameManajer, usernamePegawai, data) {
  return request
    .put(`${
        apiURLs.pemberian_task
      }?id_task=${idTask}&username_manajer=${usernameManajer}&username_pegawai_lapangan=${usernamePegawai}`)
    .send(data);
}

export async function pollingBantuanGet() {
  return request.get(apiURLs.polling_bantuan);
}

export async function performanceGet() {
  return request.get(apiURLs.rangkuman_tugas_per_hari);
}

export async function fotoPickUpGet() {
  return request.get(`${baseURL}/foto/pick_up/paket/8/8/4/`);
}

export async function uploadImage(image, progress) {
  return requestCloudinary
    .post(cloudinaryUrl)
    .field('upload_preset', cloudinaryPreset)
    .field('file', image)
    .on(progress);
}

export default request;

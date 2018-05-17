import defaults from 'superagent-defaults';

const baseURL = 'http://35.198.250.145:8000/api';

const apiURLs = {
  login: `${baseURL}/login/`,
};

const request = defaults();
const requestCloudinary = defaults();

export async function loginPost(username, password) {
  return request.post(apiURLs.login).send({ username, password });
}

export default request;

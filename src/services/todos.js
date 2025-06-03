import axios from "axios";
const baseUrl = "/api/todos";

<<<<<<< HEAD
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

=======
>>>>>>> 5f93d34acf0123f67804239fbd494993f5ff134e
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
};

<<<<<<< HEAD
const create = async (newObject) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data
=======
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data)
>>>>>>> 5f93d34acf0123f67804239fbd494993f5ff134e
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data)
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data);
  
};

<<<<<<< HEAD
export default { getAll, create, update, remove, setToken };
=======
export default { getAll, create, update, remove };
>>>>>>> 5f93d34acf0123f67804239fbd494993f5ff134e

import { clearUserData, getUserData, setUserData } from "./helper.js";
const baseURL = "http://localhost:3030";
//create request
async function request(url, options) {
  try {
    let res = await fetch(url, options);

    if (res.ok != true) {
      if (res.status == 403) {
        sessionStorage.removeItem("userData");
      }
      const error = await res.json();
      throw new Error(error.message);
    }
    try {
      return await res.json();
    } catch (err) {
      return res;
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

//create options
function createOptions(method = "get", data) {
  let options = {
    method,
    headers: {},
  };
  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  let userInfo = getUserData();
  if (userInfo != null) {
    options.headers["X-Authorization"] = userInfo.token;
  }

  return options;
}
//create get,post,put,delete method
async function get(url) {
  return request(baseURL + url, createOptions());
}
async function post(url, data) {
  return request(baseURL + url, createOptions("post", data));
}
async function put(url, data) {
  return request(baseURL + url, createOptions("put", data));
}
async function del(url) {
  return request(baseURL + url, createOptions("delete"));
}

//create login

async function login(email, password) {
  let result = await post("/users/login", { email, password });
  let userData = {
    username: result.username,
    email: result.email,
    id: result._id,
    token: result.accessToken,
    gender: result.gender,
  };
  setUserData(userData);
}
//create register
async function register(username, email, password, gender) {
  let result = await post("/users/register", {
    username,
    email,
    password,
    gender,
  });
  let userData = {
    username: result.username,
    email: result.email,
    id: result._id,
    token: result.accessToken,
    gender: result.gender,
  };
  setUserData(userData);
}
//creata logout
async function logout() {
  get("/users/logout");
  clearUserData();
}
export { login, logout, register, get, post, put, del };

let baseURL = "http://localhost:3030";

async function request(url, options) {
  try {
    let res = await fetch(baseURL + url, options);

    if (res.ok != true) {
      if (res.status == 403) {
        sessionStorage.removeItem("userData");
      }
      const error = await res.json();
      throw new Error(error.message);
    }
    if (res.status == 204) {
      return res;
    } else {
      return res.json();
    }
    //return data;
  } catch (error) {
    alert(error);
    throw error;
  }
}

function createOptions(method = "get", data) {
  let options = {
    method,
    headers: {},
  };
  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null) {
    options.headers["X-Authorization"] = userData.token;
  }
  return options;
}

//create decorator methods
async function get(url) {
  return request(url, createOptions());
}
async function post(url, data) {
  return request(url, createOptions("post", data));
}
async function put(url, data) {
  return request(url, createOptions("put", data));
}
async function del(url) {
  return request(url, createOptions("delete"));
}

//create login,register method
async function login(email, password) {
  let result = await post("/users/login", { email, password });
  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
}
async function register(email, password) {
  let result = await post("/users/register", { email, password });
  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
}

async function logout() {
    let result = await post('/users/logout');
    sessionStorage.removeItem('userData');
}

export { login,logout, register, get, post, put, del, request };

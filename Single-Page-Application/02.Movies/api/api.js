const baseURL = "http://localhost:3030";

async function request(url, options) {
  try {
    let response = await fetch(url, options);
    //check if response status is ok
    if (response.ok != true) {
      //check for valid token
      if (response.status == 403) {
        sessionStorage.removeItem("userData");
      }
      const error = await response.json();
      throw new Error(error.message);
    }
    //check if response return data
    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

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

function createOptions(method = "get", data) {
  let options = {
    method,
    headers: {},
  };
  if (data && data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  
  if (userData != null) {
    options.headers["X-Authorization"] = userData.token;
  }
  return options;
}

//function for login ,register and logout
async function login(email, password) {
  let result = await post("/users/login", { email, password });
  let userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
}
async function register(email, password) {
  let result = await post("/users/register", { email, password });
  let userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
}
async function logout() {
  await get("/users/logout");
  sessionStorage.removeItem("userData");
}

export { login, logout, register, request, post, put, get, del };

//check if username or password are empty
//if empty display error
//keep userData in localStorage
//After successful register redirect to home page
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", onRegister);
});

async function onRegister(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let email = formData.get("email");
  let password = formData.get("password");
  let repeat = formData.get("rePass");

  try {
    if (!email || !password) {
      throw new Error("All Fields are require");
    } else if (password != repeat) {
      throw new Error("Password not Equal!!");
    }
    let response = await fetch("http:localhost:3030/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok != true) {
      const err = await response.json();
      throw new Error(err.message);
    }
    let data = await response.json();
    let userInfo = {
      id: data._id,
      email: data.email,
      token: data.accessToken,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    window.location = "./index.html";
  } catch (error) {
    alert(error.message);
    window.location = "./register.html";
  }
}


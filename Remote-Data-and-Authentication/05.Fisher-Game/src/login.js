// /console.log("TODO:// Implement Login functionality");
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("user").style.display = "none";
  
  const form = document.querySelector("form");
  form.addEventListener("submit", onLogin);
});
async function onLogin(e) {
  e.preventDefault();
  
  let formData = new FormData(e.target);
  let email = formData.get("email");
  let password = formData.get("password");
  try {
    let res = await fetch("http://localhost:3030/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }
    let data = await res.json();
    let userInfo = {
      id: data._id,
      email: data.email,
      token: data.accessToken,
    };
   // const token = data.accessToken;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    window.location = "./index.html";
  } catch (err) {
    alert(err.message);
  }
}

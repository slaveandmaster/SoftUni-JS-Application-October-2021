function createTag(tag, obj, content) {
  let element = document.createElement(tag);
  for (const [key, value] of Object.entries(obj)) {
    element[key] = value;
  }
  if (content) {
    element.textContent = content;
  }
  return element;
}
function createCard(obj, idx) {
  let divProfile = createTag("div", { className: "profile" });
  let imgTag = createTag("img", {
    src: "./iconProfile2.png",
    className: "userIcon",
  });
  let labelLock = createTag("label", {}, "Lock");
  let inputLocked = createTag("input", {
    type: "radio",
    name: `user${idx}Locked`,
    value: "lock",
    checked: true,
  });
  inputLocked.setAttribute("checked", true);
  let labelUnLock = createTag("label", {}, "Unlock");
  let inputUnLocked = createTag("input", {
    type: "radio",
    name: `user${idx}Locked`,
    value: "unlock",
  });
  let br = createTag("br", {});
  let hr = createTag("hr", {});
  let labelUser = createTag("label", {}, "Username");
  let inputUser = createTag("input", {
    type: "text",
    name: `user${idx}Username`,
    value: obj.username,
    disabled: true,
    readonly: true,
  });
  divProfile.appendChild(imgTag);
  divProfile.appendChild(labelLock);
  divProfile.appendChild(inputLocked);
  divProfile.appendChild(labelUnLock);
  divProfile.appendChild(inputUnLocked);
  divProfile.appendChild(br);
  divProfile.appendChild(hr);
  divProfile.appendChild(labelUser);
  divProfile.appendChild(inputUser);
  let divHidden = createTag("div", { id: `user${idx}HiddenFields` });
  let hrTag = createTag("hr", {});
  let labelEmail = createTag("label", {}, "Email:");
  let inputEmail = createTag("input", {
    type: "email",
    name: `user${idx}Email`,
    value: obj.email,
    disabled: true,
    readonly: true,
  });
  let labelAge = createTag("label", {}, "Age:");
  let inputAge = createTag("input", {
    type: "email",
    name: `user${idx}Age`,
    value: obj.age,
    disabled: true,
    readonly: true,
  });
  divHidden.appendChild(hrTag);
  divHidden.appendChild(labelEmail);
  divHidden.appendChild(inputEmail);
  divHidden.appendChild(labelAge);
  divHidden.appendChild(inputAge);
  let btnShow = createTag("button", {}, "Show more");
  divProfile.appendChild(divHidden);
  divProfile.appendChild(btnShow);
  btnShow.addEventListener("click", (e) => {
    let parent = e.target.parentElement;
    let isCheckedField = parent.querySelector(
      "input[type=radio][value=unlock]"
    ).checked;
    let hiddenFields = Array.from(parent.children).find((x) =>
      x.id.includes("HiddenFields")
    );

    if (isCheckedField) {
      if (
        (e.target.tagName = "BUTTON" && e.target.textContent == "Show more")
      ) {
        hiddenFields.style.display = "block";
        e.target.textContent = "Hide it";
      } else {
        hiddenFields.style.display = "";
        e.target.textContent = "Show more";
      }
    }
  });
  return divProfile;
}

async function lockedProfile() {
  let main = document.querySelector("#main");
  main.innerHTML = "";
  const url = "http://localhost:3030/jsonstore/advanced/profiles";
  const response = await fetch(url);
  let data = await response.json();
  Object.values(data).forEach((x, i) => {
    main.appendChild(createCard(x, i + 1));
  });
}

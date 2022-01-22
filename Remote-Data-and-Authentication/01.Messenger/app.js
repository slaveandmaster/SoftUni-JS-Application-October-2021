function attachEvents() {
  const btnSubmit = document.getElementById("submit");
  const refreshBtn = document.getElementById("refresh");
  btnSubmit.addEventListener("click", onClick);
  refreshBtn.addEventListener("click", getMessages);
}
const chatName = document.querySelector('[name="author"]');
const msg = document.querySelector('[name="content"]');
const msgContent = document.getElementById("messages");

attachEvents();
async function onClick() {
  author = chatName.value.trim();
  message = msg.value;
  await sendMessages({ author, content: message });
  // author.value = '';
  message.value = "";
  msgContent.value += `${author}: ${content}`;
}

async function getMessages() {
  const url = "http://localhost:3030/jsonstore/messenger";
  const response = await fetch(url);
  let data = await response.json();

  let listMsg = Object.values(data)
    .map((x) => `${x.author}: ${x.content}`)
    .join("\n");
  msgContent.value = "";
  msgContent.value = listMsg;
}

async function sendMessages(content) {
  const url = "http://localhost:3030/jsonstore/messenger";
  const response = await fetch(url, {
    method: "post",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(content),
  });
  const res = await response.json();
  return res;
}

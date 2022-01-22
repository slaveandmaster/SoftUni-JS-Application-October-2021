function solve() {
  const departButton = document.getElementById("depart");
  const arriveButton = document.getElementById("arrive");
  const info = document.querySelector("#info > span");
  let stop = {
    next: "depot",
  };
  async function depart() {
    const url = "http://localhost:3030/jsonstore/bus/schedule/" + stop.next;
    const response = await fetch(url);
    data = await response.json();
    //change next stop
    stop = data;
    info.textContent = `Next stop ${data.name}`;
    departButton.disabled = true;
    arriveButton.disabled = false;
  }

  function arrive() {
    info.textContent = `Arriving at ${data.name}`;
    departButton.disabled = false;
    arriveButton.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();

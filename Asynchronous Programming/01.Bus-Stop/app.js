async function getInfo() {
  const input = document.getElementById("stopId");
  const busStop = document.getElementById("stopName");

  const busID = input.value;
  const url = "http://localhost:3030/jsonstore/bus/businfo/" + busID;
  try {
    const ulElement = document.getElementById("buses");
    ulElement.innerHTML = "";
    const response = await fetch(url);
    data = await response.json();
    //show bus Stop name
    busStop.textContent = data.name;
    //show buses stops and time;
    Object.entries(data.buses).map(([bus, time]) => {
      let listElement = document.createElement("li");
      listElement.textContent = `Bus ${bus} arrives in ${time} minutes`;
      ulElement.appendChild(listElement);
    });
    input.value = "";
  } catch (error) {
    busStop.textContent = "Error";
  }
}

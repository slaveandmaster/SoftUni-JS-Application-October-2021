function attachEvents() {
  let whetherBtn = document.getElementById("submit");
  whetherBtn.addEventListener("click", getWhether);
}

attachEvents();

async function getWhether() {
  const conditions = {
    Sunny: "&#x2600", // ☀
    "Partly sunny": "&#x26C5", // ⛅
    Overcast: "&#x2601", // ☁
    Rain: "&#x2614", // ☂
    Degrees: "&#176", // °
  };
  let currentCondition = document.getElementById("current");
  let upcomingCondition = document.getElementById("upcoming");
  const input = document.getElementById("location");
  let cityName = input.value;
  const url = "http://localhost:3030/jsonstore/forecaster/locations";
  const response = await fetch(url);
  const data = await response.json();
  let code = data.find(
    (o) => o.name.toLowerCase() == cityName.toLowerCase()
  ).code;

  let [current, upcomming] = await Promise.all([
    getWhetherCode(code),
    getWhetherUpcomming(code),
  ]);

  let forecast = document.getElementById("forecast");
  forecast.style.display = "";
  let divCurrent = document.createElement("div");
  divCurrent.classList.add("forecasts");
  divCurrent.innerHTML = `<span class="condition symbol">${
    conditions[current.forecast.condition]
  }</span>
<span class="condition">
<span class="forecast-data">${current.name}</span>
<span class="forecast-data">${current.forecast.low}&#176/${
    current.forecast.high
  }&#176</span>
<span class="forecast-data">${current.forecast.condition}</span>
</span>`;
  currentCondition.appendChild(divCurrent);
  let divUpcomming = document.createElement("div");
  divUpcomming.classList.add("forecast-info");
  //console.log(upcomming)
  upcomming.forecast.forEach((x) =>
    createTemplate(x, divUpcomming, upcomming.name, conditions)
  );
  upcomingCondition.appendChild(divUpcomming);
}

async function getWhetherCode(code) {
  const url = "http://localhost:3030/jsonstore/forecaster/today/" + code;
  const reponse = await fetch(url);
  const data = await reponse.json();
  return data;
}
async function getWhetherUpcomming(code) {
  const url = "http://localhost:3030/jsonstore/forecaster/upcoming/" + code;
  const reponse = await fetch(url);
  const data = await reponse.json();
  return data;
}

function createTemplate(info, el, name, conditions) {
  let spanElement = document.createElement("span");
  spanElement.className = "upcoming";
  spanElement.innerHTML = `<span class="symbol">${conditions[info.condition]}
    </span>
      <span class="condition">
      <span class="forecast-data">${name}</span>
      <span class="forecast-data">${info.low}&#176/${info.high}&#176</span>
      <span class="forecast-data">${info.condition}</span>
      </span>`;
  el.appendChild(spanElement);
}

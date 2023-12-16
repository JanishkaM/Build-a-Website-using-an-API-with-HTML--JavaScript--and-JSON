// Using the fetch API to get data from city_coordinates.json
fetch("data/city_coordinates.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // console.log(data)
    getCountry(data);
  })
  .catch((error) => {
    console.error("Error fetching the data:", error);
  });

function getCountry(data) {}

const selectElm = document.querySelector("[data-country-select]");
const formElm = document.querySelector("[data-form]");

function getCountry(data) {
  for (let i = 0; i < data.length; i++) {
    selectElm.innerHTML += `
    <option selected disabled hidden>Select your Country</option>
    <option value="lon=${data[i].longitude}&lat=${data[i].latitude}">${data[i].country} (${data[i].city})</option>
    `;
  }
}

selectElm.addEventListener("change", (e) => {
  const conuntryLonLat = e.target.value;
  // console.log(conuntryLonLat)
  getWeather(conuntryLonLat);
});

function getWeather(conuntryLonLat) {
  const product = "civillight";
  const apiUrl = `http://www.7timer.info/bin/api.pl?${conuntryLonLat}&product=${product}&output=json`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      getWeatherDetails(data);
    })
    .catch((error) => {
      console.error("Error fetching the data:", error);
    });
}

function getWeatherDetails(data) {
  const wetherResults = document.querySelector("[data-weather-results]");
  wetherResults.innerHTML = "";
  console.log(data);

  const init = data.init;
  const currentHour = init % 100;
  // console.log(currentHour);

  const dataSeries = data.dataseries;

  const col = document.createElement("div");
  col.classList.add("col");

  const card = document.createElement("div");
  card.classList.add("card", "border-0");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const weatherElm = document.createElement("h2");
  weatherElm.classList.add("card-title","wether-type", "text-capitalize", "text-center");

  const dateElm = document.createElement("h6");
  dateElm.classList.add("card-title", "date", "text-capitalize", "text-center");

  const image = document.createElement("img");
  image.classList.add("card-img-top","weather-img", "pt-4", "pb-3", "px-3");

  const tempElm = document.createElement("p");
  tempElm.classList.add("card-text","temp" , "text-center");

  const windElm = document.createElement("p");
  windElm.classList.add("card-text","wind", "text-center");

  col.append(card);
  card.append(cardBody);
  cardBody.append(image, weatherElm, tempElm, windElm, dateElm,);

  for (let i = 0; i < dataSeries.length; i++) {
    const dateRaw = dataSeries[i].date;

    const year = Math.floor(dateRaw / 10000);
    const month = Math.floor((dateRaw % 10000) / 100);
    const day = Math.floor((dateRaw % 1000) % 100);

    const dayNameRaw = new Date(year, month - 1, day);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dayNameRaw.getDay()];

    const date = `${year}-${month}-${day} (${dayName})`;
    const weather = dataSeries[i].weather;
    const tempMax = dataSeries[i].temp2m.max;
    const tempMin = dataSeries[i].temp2m.min;
    const wind = dataSeries[i].wind10m_max;


    if(weather === "clear"){
      image.src = "./images/clear.png";
    }else if(weather === "cloudy"){
      image.src = "./images/cloudy.png";
    }else if(weather === "fog"){
      image.src = "./images/fog.png";
    }else if(weather === "humid"){
      image.src = "./images/humid.png";
    }else if(weather === "ishower"){
      image.src = "./images/ishower.png";
    }else if(weather === "lightrain"){
      image.src = "./images/lightrain.png";
    }else if(weather === "lightsnow"){
      image.src = "./images/lightsnow.png";
    }else if(weather === "mcloudy"){
      image.src = "./images/mcloudy.png";
    }else if(weather === "oshower"){
      image.src = "./images/oshower.png";
    }else if(weather === "pcloudy"){
      image.src = "./images/pcloudy.png";
    }else if(weather === "rain"){
      image.src = "./images/rain.png";
    }else if(weather === "rainsnow"){
      image.src = "./images/rainsnow.png";
    }else if(weather === "snow"){
      image.src = "./images/snow.png";
    }else if(weather === "tsrain"){
      image.src = "./images/tsrain.png";
    }else if(weather === "tstorm"){
      image.src = "./images/tstorm.png";
    }else {
      image.src = "./images/windy.png";
    }

    weatherElm.innerHTML = `${weather}`;
    dateElm.innerHTML = `${date}`;
    tempElm.innerHTML = `<i class="bi bi-thermometer-high"></i>: ${tempMax}℃ | <i class="bi bi-thermometer-low"></i>: ${tempMin}℃`;
    windElm.innerHTML = `<i class="bi bi-wind"></i>: ${wind}m/s`;

    wetherResults.innerHTML += col.outerHTML;
  }
}

// http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json

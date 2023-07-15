function city(event) {
  event.preventDefault();
  let city_name = document.getElementById("search-input").value;
  let state_code = prompt("Enter your state's code if you're from the USA");
  let country_code = prompt("Enter your country's name");
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city_name +
    "," +
    state_code +
    "," +
    country_code +
    "&appid=" +
    apiKey;
  let kyiv = document.querySelector("#kyiv");
  kyiv.innerHTML = city_name;

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
      let location = response.data[0];
      let lat = location.lat;
      let lon = location.lon;
      let weatherUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;
      axios
        .get(weatherUrl)
        .then((response) => {
          console.log(response.data);
          console.log(response.data.main.temp);
          let h1 = document.querySelector("#zaluzh");
          h1.textContent =
            "It is " + response.data.main.temp + " degrees in " + city_name;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

let trig = document.querySelector("#search-button");
trig.addEventListener("click", city);

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
function weather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    apiKey;

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
      console.log(response.data.main.temp);
      let city_name = response.data.name;
      let h1 = document.querySelector("#zaluzh");
      h1.textContent =
        "It is " + response.data.main.temp + " degrees in " + city_name;
      let kyiv = document.querySelector("#kyiv");
      kyiv.innerHTML = city_name;
    })
    .catch((error) => {
      console.log(error);
    });
}

function triggerWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
  navigator.geolocation.getCurrentPosition(weather);
}

let trigger = document.querySelector("#locate");
trigger.addEventListener("click", triggerWeather);

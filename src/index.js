function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let speedElement=document.querySelector("#speed");
  let iconElement=document.querySelector("#icon")


  
  
console.log(response.data.condition.description);


  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML=response.data.condition.description;
  humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
  speedElement.innerHTML=`${response.data.wind.speed}km/hr`;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML=`<img src="${response.data.condition.icon_url}"class="current-temperature-icon"/> `
  
  getForecast(response.data.city)
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);





function displayforecast(response){
  console.log(response.data)



let forecastHTML="" ;


 response.data.daily.forEach(function(day,){
  
let forecastDate = new Date(day.time * 1000);
let dayOfWeek = forecastDate.toLocaleString("en-US", { weekday: "short" })


forecastHTML= forecastHTML+
`
  <div class="weather-forecast-day">
     <div class="weather-forecast-date">${dayOfWeek}</div>
       <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-tempratures">
          <div class="weather-forecast-temprature">
            <strong> ${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="weather-forecast-temprature">
              ${Math.round(day.temperature.minimum)}°</div>
      </div>
  </div>
  `; 
    });
    
    let forecastElement = document.querySelector("#forecast");
    if (forecastElement) {
      forecastElement.innerHTML = forecastHTML;
    } else {
      
    }
}

 function getForecast(city){
 let apiKey="7f4c30b04febo374bc0134d44e5tfcfa"
 let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
 axios(apiUrl).then(displayforecast);
}

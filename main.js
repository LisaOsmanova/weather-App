

// get longitude and latitude from the location 
window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector('span');
  

  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          const token = import.meta.env.VITE_WEATHER_API_TOKEN;
          const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},-${long}?&key=${token}&contentType=json`;

          fetch(api)
          .then(response => {
              return response.json();
          })
          .then(data => {
              console.log(data);
              const{temp, conditions,icon} = data.currentConditions;
              console.log(icon); //rain
              //Set DOM elements from the API
              temperatureDegree.textContent = temp;
              temperatureDescription.textContent = conditions;
              locationTimezone.textContent = data.timezone
              //Formula for celsius
              let celcius = (temp - 32) * (5 / 9);
              //set icon
              setIcons(icon, document.querySelector(".icon"));
              //set temperature to celcius/Farenheit
              temperatureSection.addEventListener('click',() => {
                  if(temperatureSpan.textContent === "F"){
                      temperatureSpan.textContent = "C";
                      temperatureDegree.textContent = Math.floor(celcius);
                  } else {
                      temperatureSpan.textContent = "F";
                      temperatureDegree.textContent = temp;
                  }
              })
          })

      });
  } 
  function setIcons(icon, iconElement){
      const skycons = new Skycons({color:"white"}); // new Skykons create a new instance of the "skycons", {"color": "pink"} - object which passes as an argument
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconElement, Skycons[currentIcon]);
  }
})


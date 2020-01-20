window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let loccationTimezone = document.querySelector(".location-timezone"); 
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    if(navigator.geolocation){
       
     navigator.geolocation.getCurrentPosition(position => {
     long = position.coords.longitude;
     lat = position.coords.latitude;

     const proxy = 'https://cors-anywhere.herokuapp.com/';
     const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5ef890c18e00f1c4b70a255432ba9c7f/${lat},${long}`;

     fetch(api)
         .then(response => {
          return response.json();
         })
       .then(data => {
         console.log(data);
        const { temperature, summary, icon } = data.currently;
        //Set DOM Elements from the API
        temperatureDegree.textContent =  temperature;
        temperatureDescription.textContent = summary;
        loccationTimezone.textContent = data.timezone;
        //set formula for celsius 
        let celsius = (temperature - 32) * (5 / 9);
        //set icon
        setIcon(icon, document.querySelector(".icon"));

        //change temp. to celsius
        temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F'){
                temperatureSpan.textContent ='C';
                temperatureDegree.textContent = Math.floor(celsius);
            } else {
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = temperature;
            }
        })
      });

      });
    }

  function setIcon(icon, iconID ){
    const skycons = new Skycons ({color: 'white'});
    const currentIcon =  icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
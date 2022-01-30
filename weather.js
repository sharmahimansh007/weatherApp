
// fetching weather api

 async function getWeather() {
    try {
      let city = document.querySelector("#search").value;

    //  1st  weather API from 1 day data is fetching
      let response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=9c39165671ee41fa89b121936220601&q=${city}&days=7&aqi=yes&alerts=no`
      );
      let data = await response.json();
      // showWeather(data);
      console.log("data:", data);


    //   2nd weather API from which 7 day data is fetching
      let lat = data.location.lat;
      let lon = data.location.lon;
      let response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=7days&appid=e554ee2bb9089658028407814cb72eea&units=metric `
      );
      let data2 = await response2.json();

    //   map API ----------

      let iframe=document.createElement("iframe")
      iframe.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`
      document.querySelector("#map").innerHTML=""
      console.log(iframe)
      document.querySelector("#map").append(iframe)
      
      showWeather(data, data2.daily,iframe);
    } catch (err) {
      console.log("err:", err);
    }
  }

  // show weather function
  function showWeather(weatherdata, sevenday,map) {
    console.log(sevenday);
    document.querySelector("#icons").classList.remove("none")
    document.querySelector(".otherinfo").classList.remove("none");
    document.querySelector(".sevendaysdatadiv").classList.add("none");
    document.querySelector("#map").classList.add("none")

    document.querySelector(".city").innerHTML = `${weatherdata.location.name} `;
    document.querySelector(
      ".temp"
    ).innerHTML = `${weatherdata.current.temp_c}<sup>°c</sup> <sup><img  src="${weatherdata.current.condition.icon}"/></sup>`;
    document.querySelector(
      ".time"
    ).innerHTML = `Date / Time : ${weatherdata.location.localtime}`;
    document.querySelector(".country").innerHTML = weatherdata.location.country;
    document.querySelector(".region").innerHTML = weatherdata.location.region;
    document.querySelector(".day").innerHTML =
      weatherdata.current.condition.text;
    document.querySelector(".humidity").innerHTML =
      weatherdata.current.humidity;
    document.querySelector(".pressure").innerHTML =
      weatherdata.current.pressure_mb;
    document.querySelector(
      ".wind"
    ).innerHTML = `${weatherdata.current.wind_kph} kph`;
    document.querySelector(
      ".vis"
    ).innerHTML = `${weatherdata.current.vis_km} km`;
    document.querySelector(".sunrise").innerHTML =
      weatherdata.forecast.forecastday[0].astro.sunrise;
    document.querySelector(".sunset").innerHTML =
      weatherdata.forecast.forecastday[0].astro.sunset;
    document.querySelector(".lastupdated").innerHTML =
      weatherdata.current.last_updated;

    

     //   changing background according weather and day status

     // change theme according weather in night--------------
    if (weatherdata.current.is_day == 0 && sevenday[0].weather[0].main=="Rain") {
      document.body.style.backgroundImage = "url('nightrain.jpg')";
      document.body.style.backgroundSize = "cover";document.querySelector(".otherinfo").style.color="#d3d1d1";
       document.querySelector(".sevendaysdatadiv").style.color="#d3d1d1";
      document.querySelector("#place").style.color="#d3d1d1";
      document.querySelector("#tempTime").style.color="#d3d1d1";
    }
    else if(weatherdata.current.is_day==0 && sevenday[0].weather[0].main=="Clear"){
      document.body.style.backgroundImage = "url('clearnight.jpg')";
      document.body.style.backgroundSize = "cover";
      document.querySelector(".otherinfo").style.color="#d3d1d1";
       document.querySelector(".sevendaysdatadiv").style.color="#d3d1d1";
      document.querySelector("#place").style.color="#d3d1d1";
      document.querySelector("#tempTime").style.color="#d3d1d1";

    }else if(weatherdata.current.is_day==0 && sevenday[0].weather[0].main=="Snow"){
      document.body.style.backgroundImage = "url('snownight.jpg')";
      document.body.style.backgroundSize = "cover";
      document.querySelector(".otherinfo").style.color="#131313";
       document.querySelector(".sevendaysdatadiv").style.color="#131313";

    }else if(weatherdata.current.is_day==0 && sevenday[0].weather[0].main=="Clouds"){
      document.body.style.backgroundImage = "url('cloudnight1.jpg')";
      document.body.style.backgroundSize = "cover";
      document.querySelector(".otherinfo").style.color="white";
       document.querySelector(".sevendaysdatadiv").style.color="white";
      document.querySelector("#place").style.color="white";
      document.querySelector("#tempTime").style.color="white";
    }

    // change theme according weather in day---------

     else if(weatherdata.current.is_day==1 && sevenday[0].weather[0].main=="Clouds"){
      document.body.style.backgroundImage = "url('cloudday.jpg')";
      document.querySelector(".otherinfo").style.color="white";
       document.querySelector(".sevendaysdatadiv").style.color="white";
      document.querySelector("#place").style.color="white";
      document.querySelector("#tempTime").style.color="white";
       
    }  else if(weatherdata.current.is_day==1 && sevenday[0].weather[0].main=="Snow"){
      
      document.body.style.backgroundImage = "url('snowday3.jpg')";
       document.querySelector(".otherinfo").style.color="black";
       document.querySelector(".sevendaysdatadiv").style.color="black";
      document.querySelector("#place").style.color="#a09d9d";
      document.querySelector("#tempTime").style.color="#313131";
    }else if(weatherdata.current.is_day==1 && sevenday[0].weather[0].main=="Rain"){
      
      document.body.style.backgroundImage = "url('dayrain.jpg')";
      document.querySelector(".otherinfo").style.color="#313131";
       document.querySelector(".sevendaysdatadiv").style.color="#313131";
      document.querySelector("#place").style.color="#313131";
      document.querySelector("#tempTime").style.color="#313131";
    }
    else if(weatherdata.current.is_day==1 && sevenday[0].weather[0].main=="Clear"){
      
      document.body.style.backgroundImage = "url('clearday4.jpg')";
      document.querySelector(".otherinfo").style.color="#131313";
       document.querySelector(".sevendaysdatadiv").style.color="#131313";
      document.querySelector("#place").style.color="#131313";
      document.querySelector("#tempTime").style.color="#131313";
    }

    // on click 7 day icon show seven day weather
    let x=weatherdata.location.localtime;
     console.log(x)
     let locdate=x[8]+x[9];
     let date =new Date()
     let curday =date.getDay()
     let x1=date.getDate()
    //  console.log(curday)
     
    let cu=+locdate
   
    // console.log(x1);
    // console.log(cu)
    let bag;
    if(x1<cu){
    bag=1

   }else if(x1>cu){
     bag=-1
   }else if(x1==cu){
     bag=0
   }

   if(bag==1){
  curday+=1;
}else if(bag==-1){
  curday-1
}
console.log("curday"+curday)
let dayarr=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let daysbag=[]
for(let i=curday; i<dayarr.length; i++){
   if(daysbag[0]==dayarr[i]){
    daysbag.push(dayarr[i]);

     break;
   }if(i==6){
     daysbag.push(dayarr[i]);

     i=-1
     
   }else{
     daysbag.push(dayarr[i])
   }
  
   }
   let d=daysbag
   console.log(d)


   
        document.querySelector(".sevendaysdatadiv").innerHTML = "";

        var j=0;

        // running a loop for show weather icon according to wearther 
        sevenday.forEach(function (elem) {
          let icon;
          if (elem.weather[0].main == "Clear") {
            icon = "sunny.png";
          } else if (elem.weather[0].main == "Snow") {
            icon = "snow.png";
          } else if (elem.weather[0].main == "Rain") {
            icon = "rain.png";
          } else if (elem.weather[0].main == "Clouds") {
            icon = "clouds.png";
          }
          
         
          let container = document.createElement("div");
          container.setAttribute("class", "sevendaydiv");
          
        // giving all the information of sevenday data in container with class name sevendaydiv 

          container.innerHTML = `<h1>${d[j]}</h1><div><h3>min/max</h3> <p>${elem.temp.min} / ${elem.temp.max}</p><p>${elem.weather[0].main} / ${elem.weather[0].description}</p> 
         <img src="${icon}"/></div>`;
         j++

        //  appending the sevenday  data 
         document.querySelector(".sevendaysdatadiv").append(container);
         
        });
 
      
  }              
//   toggle function 
  function showseven() {
        document.querySelector(".otherinfo").classList.toggle("none");
        document.querySelector(".sevendaysdatadiv").classList.toggle("none");
    document.querySelector("#map").classList.add("none")   
  }

  function showmap(){
    document.querySelector(".sevendaysdatadiv").classList.add("none");
    document.querySelector(".otherinfo").classList.remove("none");
    document.querySelector("#map").classList.toggle("none")
  }

  // search on press Enter function
  function showweatherdata(event) {
    if (event.key === "Enter") {
      getWeather();
    }
  }
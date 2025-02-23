
import React, { useState } from "react";
import { useEffect } from "react";

import "./App.css"
 
function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
 
  const currentDate = new Date();
 
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
 
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
 
  const formattedDate = `${month} ${day}, ${year}`;
 
  const API_KEY = "a938595721ae79dbc225ecae7b6ef3e1"; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
 
  const degree = ()=>{ return "\u00B0"}

  
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data)
      // if (response.ok) {
      setWeatherData(data);
      // setError(null);
      // } else {
      //   setError(data.message);
      //   setWeatherData(null);
      // }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // setError("Error fetching weather data. Please try again later.");
      // setWeatherData(null);
    }
  };
 
  useEffect(()=>{
 
     
   
 
  fetchWeatherData();
 
  },[])
 
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
 
  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/clear.png";
      case "Sun":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/sun.png"; // Path to your sunny weather icon
      case "Mist":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/mist.png"; // Path to your rainy weather icon
      case "Snow":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/snow.png"; // Path to your snowy weather icon
      case "Haze":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/haze.png";
      case "Fog":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/fog.png";
      case "Smoke":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/smoke.png"; 
      case "Rain":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/rain.png";
      case "Clouds":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/clouds.png";
      case "Thunderstorm":
        return "https://weather-3d-app.s3.us-east-1.amazonaws.com/thunder.jpg"; 
      case "Tornado":
          return "https://weather-3d-app.s3.us-east-1.amazonaws.com/tornado.png";// Path to your haze weather icon
      // Add more cases for other weather conditions as needed
      default:
        return null;
    }
  };
 
 
  return (
    <div className="App">
       
 
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img className="container_img" src={getWeatherIconUrl(weatherData.weather[0].main)} width="150px" alt="Weather Icon" />
              <h2 className="container_degree">{weatherData.main.temp}{degree()}C</h2>
              <h3 className="container_climate">{weatherData.weather[0].main}<span className="degree_icon"></span></h3>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
 
 
      </div>
    </div>
  );
}
 
export default App;
import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import arrow_icon from "./assets/icons8-arrow-50.png";
import wind_icon from "./assets/icons8-wind-50.png";
import pressure_icon from "./assets/icons8-pressure-gauge-50.png";
import precipitation_icon from "./assets/icons8-drop-50.png";
import humidity_icon from "./assets/humidity.svg";
import cloud_cover_icon from "./assets/cloud.svg";
import dew_point_icon from "./assets/icons8-dew-point-32.png";
import vision_icon from "./assets/eye.svg";
import uv_icon from "./assets/uv-index.svg";
import gust_icon from "./assets/cloudy-gusts.svg";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [latLon, setLatLon] = useState("Mumbai");
  const [show, setShow] = useState(false)

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${location ? location : "Mumbai"}&key=a09a773878f543aca1c3838fe1f991de`
    )
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok!");
        }
        return response.json();
      })
      .then((data) => {
        setLatLon(
          `${data["results"]["0"]["geometry"]["lat"]},${data["results"]["0"]["geometry"]["lng"]}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (latLon.length > 0) {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=4933201a797643bc83f133410242706&q=${latLon}`
      )
        .then((response) => {
          if (!response.ok) {
            console.log("Network response was not ok!");
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [latLon]);

  return (
    <>
      <header>
        <p className="title">Weather App</p>
        <form onSubmit={handleSubmit} className="search-box">
          <input
            className="location-name"
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Enter the location..."
          />
          <button className="submit-btn">Search</button>
        </form>
      </header>
      {weatherData && (
        <>
          <div className="weather-container">
            <div className="click" onClick={() => {setShow((prev) => (!prev))}}></div>
            <div className="weather-box">
              <div className="wind">
                <p className="wind-heading">Wind</p>
                <div className="wind-contents">
                  <div className="wind-box">
                    <img
                      className="arrow-icon"
                      src={arrow_icon}
                      alt="arrow_icon"
                      style={{
                        transform: `rotate(${
                          weatherData["current"]["wind_degree"] - 90
                        }deg)`,
                      }}
                    />
                    <p className="wind-direction-degree">
                      {weatherData["current"]["wind_dir"]}
                    </p>
                  </div>
                  <div className="wind-box">
                    <img
                      className="wind-icon"
                      src={wind_icon}
                      alt="wind_icon"
                    />
                    <p className="wind-speed-value">
                      {!show ? `${weatherData["current"]["wind_kph"]} kph` : `${weatherData["current"]["wind_mph"]} mph`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pressure-precipitation">
                <div className="pressure">
                  <p className="pressure-heading">Pressure</p>
                  <img
                    className="pressure-icon"
                    src={pressure_icon}
                    alt="pressure_icon"
                  />
                  <p className="pressure-value">
                    {!show ? `${weatherData["current"]["pressure_mb"]} mB` : `${weatherData["current"]["pressure_in"]} in`}
                  </p>
                </div>
                <div className="precipitation">
                  <p className="precipitation-heading">Rain</p>
                  <img
                    className="precipitation-icon"
                    src={precipitation_icon}
                    alt="precipitation_icon"
                  />
                  <p className="precipitation-value">
                    {!show ? `${weatherData["current"]["precip_mm"]} mm` : `${weatherData["current"]["precip_in"]} in`}
                  </p>
                </div>
              </div>
            </div>
            <div className="weather-box">
              <p className="temperature">
                {!show ? `${weatherData["current"]["temp_c"]}\u00B0C` : `${weatherData["current"]["temp_f"]}\u00B0F`}
              </p>
              <p className="feels-like-temp">
              Feels like: {!show ? `${weatherData["current"]["feelslike_c"]}\u00B0C` : `${weatherData["current"]["feelslike_f"]}\u00B0F`}
              </p>
              <div className="location">
                <p className="city">{weatherData["location"]["name"]}</p>
                <p className="state-country">
                  {weatherData["location"]["region"]}
                  {weatherData["location"]["region"] ? ", " : " "}
                  {weatherData["location"]["country"]}
                </p>
                <p className="lat-lon">
                  Lat : {weatherData["location"]["lat"]}&deg;,{" "}
                  Lon : {weatherData["location"]["lon"]}&deg;
                </p>
              </div>
              <img
                className="condition-box-image"
                src={weatherData["current"]["condition"]["icon"]}
                alt="IconPng"
              />
              <p className="condition-box-text">
                {weatherData["current"]["condition"]["text"]}
              </p>
            </div>
            <div className="weather-box">
              <div className="humidity-cloud-dew">
                <div className="humidity">
                  <img
                    className="humidity-icon"
                    src={humidity_icon}
                    alt="humidity_icon"
                  />
                  <p className="humidity-text">
                    Humidity : {weatherData["current"]["humidity"]}%
                  </p>
                </div>
                <div className="cloud-cover">
                  <img
                    className="cloud-cover-icon"
                    src={cloud_cover_icon}
                    alt="cloud_cover_icon"
                  />
                  <p className="cloud-cover-text">
                    Cloud : {weatherData["current"]["cloud"]}%
                  </p>
                </div>
                <div className="dew-point">
                  <img
                    className="dew-point-icon"
                    src={dew_point_icon}
                    alt="dew_point_icon"
                  />
                  <p className="dew-point-text">
                    Dew Point : {!show ? `${weatherData["current"]["dewpoint_c"]}\u00B0C` : `${weatherData["current"]["dewpoint_f"]}\u00B0F`}
                  </p>
                </div>
              </div>
              <div className="vision-uv-gust">
                <div className="vision">
                  <img
                    className="vision-icon"
                    src={vision_icon}
                    alt="vision_icon"
                  />
                  <p className="vision-text">
                  Vision : {!show ? `${weatherData["current"]["vis_km"]} km` : `${weatherData["current"]["vis_miles"]} mi`}
                  </p>
                </div>
                <div className="uv">
                  <img className="uv-icon" src={uv_icon} alt="uv_icon" />
                  <p className="uv-text">
                    UV Index : {weatherData["current"]["uv"]}
                  </p>
                </div>
                <div className="gust">
                  <img className="gust-icon" src={gust_icon} alt="gust_icon" />
                  <p className="gust-text">
                  Gust : {!show ? `${weatherData["current"]["gust_kph"]} kph` : `${weatherData["current"]["gust_mph"]} mph`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;

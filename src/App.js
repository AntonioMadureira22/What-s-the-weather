import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('New York');
  const [loading, setLoading] = useState(true);
  const [animationOn, setAnimationOn] = useState(true); // State to manage animation

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'a4aac97ac94b203e4f85929c9eaead8b';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
        const response = await axios.get(url);

        // Grouping the forecast data by day
        const dailyData = response.data.list.filter((reading) => reading.dt_txt.includes("18:00:00"));
        setForecast(dailyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the weather data:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const toggleAnimation = () => {
    setAnimationOn(!animationOn);
  };

  return (
    <div className={`app ${animationOn ? 'animation-on' : 'animation-off'}`}>
      <h1>5-Day Weather Forecast</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : forecast.length > 0 ? (
        <div className="forecast-container">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <h2>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</h2>
              <p>Temperature: {day.main.temp}°F</p>
              <p>Weather: {day.weather[0].description}</p>
              <p>Humidity: {day.main.humidity}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>City not found. Please try again.</p>
      )}
      <button onClick={toggleAnimation} className="toggle-button">
        {animationOn ? 'Turn Off Animation' : 'Turn On Animation'}
      </button>
    </div>
  );
}

export default App;

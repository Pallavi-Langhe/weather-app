import { useState } from "react";
import './forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DailyDetailsGrid = ({ item }) => (
  <div className="daily-details-grid">
    <div className="daily-details-grid-item">
      <label>Pressure:</label>
      <label>{item.main.pressure}</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Humidity:</label>
      <label>{item.main.humidity}</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Clouds:</label>
      <label>{item.clouds.all}%</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Wind speed:</label>
      <label>{item.wind.speed} m/s</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Sea level:</label>
      <label>{item.main.sea_level}m</label>
    </div>
    <div className="daily-details-grid-item">
      <label>Feels like:</label>
      <label>{item.main.feels_like}°C</label>
    </div>
  </div>
);

const Forecast = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="title">Daily</label>
      <div className="accordion">
        {data.list.slice(0, 7).map((item, idx) => (
          <div key={idx} className={`daily-item ${activeIndex === idx ? 'active' : ''}`} onClick={() => handleAccordionClick(idx)}>
            <div className='daily-item-top'>
            <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
            <label className="day">{forecastDays[idx]}</label>
            <label className="description">{item.weather[0].description}</label>
            <label className="min-max">{Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C</label>

            </div>
            {activeIndex === idx && <DailyDetailsGrid item={item} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default Forecast;

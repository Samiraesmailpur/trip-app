import { icons } from "@helpers/icons";
import "./WeatherToday.css";
import Countdown from "../Countdown/Countdown";

const WeatherToday = ({ weatherToday, trips }) => {
  const currentDay = new Date().toLocaleString("default", {
    weekday: "long",
  });
  return (
    <div className="weather-today">
      <p className="current-day">{currentDay}</p>
      <img
        className="weather-icon"
        src={icons[weatherToday.days[0].icon]}
        alt={weatherToday.days[0].icon}
      />
      <p className="temp">{weatherToday.days[0].temp}</p>
      <p className="city">{weatherToday.address}</p>
      <Countdown trips={trips} weatherToday={weatherToday} />
    </div>
  );
};

export default WeatherToday;

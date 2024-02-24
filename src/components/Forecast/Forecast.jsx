import { icons } from "@helpers/icons";
import "./Forecast.css";

const Forecast = ({ forecast: { days } }) => {
  return (
    <div>
      <p className="forecast-title">Week</p>
      <ul className="forecast-list">
        {days.map(({ tempmax, tempmin, icon, datetime }, idx) => (
          <li key={idx} className="forecast-item">
            <p className="forecast-day">
              {new Date(datetime).toLocaleString("default", {
                weekday: "long",
              })}
            </p>
            <img className="forecast-icon" src={icons[icon]} alt={days.icon} />
            <p className="forecast-temp">
              {tempmax}&#176;/{tempmin}&#176;
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;

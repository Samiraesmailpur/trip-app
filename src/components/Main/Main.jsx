import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Kyiv from "@assets/kyiv.jpeg";
import Seattle from "@assets/seattle.jpg";
import Toronto from "@assets/toronto.jpeg";
import { FiPlus } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { fetchWeatherForToday, fetchForecast } from "../../services/fetchData";
import WeatherToday from "../WeatherToday/WeatherToday";
import Forecast from "../Forecast/Forecast";

import "./Main.css";

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [weatherToday, setWeatherToday] = useState();
  const [forecast, setForecast] = useState();
  const [activeCity, setActiveCity] = useState("");
  const [trips, setTrips] = useState(() => {
    const storedTrips = localStorage.getItem("trips");
    return storedTrips
      ? JSON.parse(storedTrips)
      : [
          {
            id: nanoid(),
            city: "Seattle",
            startDate: "01.03.2024",
            endDate: "07.03.2024",
            image: Seattle,
          },
          {
            id: nanoid(),
            city: "Kyiv",
            startDate: "01.04.2024",
            endDate: "05.04.2024",
            image: Kyiv,
          },
          {
            id: nanoid(),
            city: "Toronto",
            startDate: "12.02.2024",
            endDate: "15.02.2024",
            image: Toronto,
          },
        ];
  });
  const [filteredTrips, setFilteredTrips] = useState(trips);

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips]);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const filterTrips = (value) => {
    const filteredTrips = trips.filter((trip) =>
      trip.city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTrips(filteredTrips);
  };

  const handleSearchTrip = (e) => {
    setInputValue(e.target.value);
    filterTrips(e.target.value);
  };

  const handleShowWeather = async (city, start, end) => {
    const formattedStartDate = start.split(".").reverse().join("-");
    const formattedEndDate = end.split(".").reverse().join("-");

    const weather = await fetchWeatherForToday(city);
    setWeatherToday(weather);
    const forecast = await fetchForecast(
      city,
      formattedStartDate,
      formattedEndDate
    );
    setForecast(forecast);
    setActiveCity(city);
  };

  return (
    <div className="main">
      <div className="input-box">
        <IoSearchSharp className="input-icon" />
        <input
          type="text"
          placeholder="Search your trip"
          className="input"
          value={inputValue}
          onChange={handleSearchTrip}
        />
      </div>
      <div className="flex-container">
        <ul className="list">
          {filteredTrips.map(({ id, city, startDate, endDate, image }) => (
            <li
              key={id}
              className="item"
              onClick={() => handleShowWeather(city, startDate, endDate)}
            >
              <div className="image-wrapper">
                <img className="image" src={image} alt={city} />
              </div>
              <div className={city === activeCity ? "active info" : "info"}>
                <p className="city-name">{city}</p>
                <p className="date">
                  {startDate} - {endDate}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn" onClick={() => setIsOpenModal(true)}>
          <FiPlus />
          <span>Add trip</span>
        </button>
      </div>
      {isOpenModal && (
        <Modal
          setIsOpenModal={setIsOpenModal}
          setTrips={setTrips}
          trips={trips}
        />
      )}
      {weatherToday && (
        <WeatherToday weatherToday={weatherToday} trips={trips} />
      )}
      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
};

export default Main;

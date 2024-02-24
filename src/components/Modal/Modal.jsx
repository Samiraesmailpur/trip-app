import "./Modal.css";
import { nanoid } from "nanoid";
import { RxCross2 } from "react-icons/rx";
import London from "@assets/london.jpeg";
import Berlin from "@assets/Berlin.jpeg";
import Paris from "@assets/paris.jpeg";
import LosAngeles from "@assets/hollywood.jpeg";
import NewYork from "@assets/new-york.jpeg";
import Rome from "@assets/rome.jpeg";
import Sydney from "@assets/sydney.jpeg";
import Tokyo from "@assets/tokyo.jpeg";
import { useState } from "react";

const options = [
  { id: nanoid(), city: "New York", image: NewYork },
  { id: nanoid(), city: "London", image: London },
  { id: nanoid(), city: "Paris", image: Paris },
  { id: nanoid(), city: "Tokyo", image: Tokyo },
  { id: nanoid(), city: "Sydney", image: Sydney },
  { id: nanoid(), city: "Los Angeles", image: LosAngeles },
  { id: nanoid(), city: "Berlin", image: Berlin },
  { id: nanoid(), city: "Rome", image: Rome },
];

const Modal = ({ setIsOpenModal, setTrips, trips }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");

  const minDateStart = new Date().toISOString().split("T")[0];
  const maxDateStart = new Date();
  maxDateStart.setDate(maxDateStart.getDate() + 15);
  const maxDateStartFormatted = maxDateStart.toISOString().split("T")[0];
  const maxDateEnd = startDate ? new Date(startDate) : new Date();
  maxDateEnd.setDate(maxDateEnd.getDate() + 15);
  const maxDateEndFormatted = maxDateEnd.toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setStartDate(value);
    } else if (name === "city") {
      setCity(value);
    } else {
      setEndDate(value);
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setIsOpenModal(false);
    }
  };

  const handleAddTrip = () => {
    const correctStartDate = startDate.split("-").reverse().join(".");
    const correctEndDate = endDate.split("-").reverse().join(".");
    const selectedOption = options.find((option) => option.city === city);

    const newTrip = {
      id: nanoid(),
      city,
      startDate: correctStartDate,
      endDate: correctEndDate,
      image: selectedOption ? selectedOption.image : null,
    };

    setTrips([...trips, newTrip]);
    setIsOpenModal(false);
  };

  return (
    <div className="backdrop" onClick={(e) => handleCloseModal(e)}>
      <div className="modal">
        <RxCross2 className="icon" onClick={() => setIsOpenModal(false)} />
        <form className="form">
          <p>Create trip</p>
          <hr className="line" />
          <div>
            <p className="label">
              <span>*</span> City
            </p>
            <select
              name="city"
              id="city"
              onChange={(e) => handleChange(e)}
              className="modal-field"
            >
              <option value="">Select a city</option>
              {options.map(({ id, city }) => (
                <option key={id} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="label">
              <span>*</span> Start date
            </p>
            <input
              className="modal-field"
              name="start"
              onChange={(e) => handleChange(e)}
              placeholder="date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              type="text"
              min={minDateStart}
              max={maxDateStartFormatted}
            />
          </div>
          <div>
            <p className="label">
              <span>*</span> End date
            </p>
            <input
              className="modal-field"
              disabled={!startDate}
              name="end"
              onChange={(e) => handleChange(e)}
              placeholder="date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              type="text"
              min={startDate}
              max={maxDateEndFormatted}
            />
          </div>
        </form>
        <hr className="line" />
        <div className="button-box">
          <button className="modal-btn" onClick={() => setIsOpenModal(false)}>
            Cancel
          </button>
          <button
            className="modal-btn"
            disabled={startDate === "" || city === "" || endDate === ""}
            onClick={() => handleAddTrip()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

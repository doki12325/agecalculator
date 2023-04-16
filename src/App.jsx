import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const [datedisp, setDatedisp] = useState({ day: 0, month: 0, year: 0 });
  const [touch, setTouch] = useState({ day: false, month: false, year: false });
  const [valid, setValid] = useState({ day: false, month: false, year: false });
  const [age, setAge] = useState({ day: "--", month: "--", year: "--" });
  const [base, setBase] = useState(false);

  useEffect(() => {
    setValid((prev) => ({
      day: date.day >= 1 && date.day <= 31 ? true : false,
      month: date.month >= 1 && date.month <= 12 ? true : false,
      year: date.year >= 1950 && date.year <= 2023 ? true : false,
    }));
  }, [date]);

  const agecalculator = () => {
    const today = new Date();
    const birthDate = new Date(`${date.month}/${date.day}/${date.year}`);

    let years;
    if (
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() == birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate())
    ) {
      years = today.getFullYear() - birthDate.getFullYear();
    } else {
      years = today.getFullYear() - birthDate.getFullYear() - 1;
    }

    let months;
    if (today.getDate() >= birthDate.getDate()) {
      months = today.getMonth() - birthDate.getMonth();
    } else if (today.getDate() < birthDate.getDate()) {
      months = today.getMonth() - birthDate.getMonth() - 1;
    }
    months = months < 0 ? months + 12 : months;
    let days;
    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (today.getDate() >= birthDate.getDate()) {
      days = today.getDate() - birthDate.getDate();
    } else {
      days =
        today.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
    }

    if (valid.day && valid.month && valid.year) {
      setAge({
        day: days,
        month: months,
        year: years,
      });
      setBase(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (age.year !== "--") {
        setDatedisp((prev) => ({
          day: prev.day >= age.day ? prev.day : prev.day + 1,
          month: prev.month >= age.month ? prev.month : prev.month + 1,
          year: prev.year >= age.year ? prev.year : prev.year + 1,
        }));
      }
    }, 70);
  }, [base, datedisp]);
  return (
    <div className="App">
      <div className="card-container">
        <div className="form-container">
          <div className="form-element">
            <label className="form-label">DAY</label>
            <input
              type="number"
              placeholder="DD"
              min={1}
              className="form-input"
              onChange={(e) => {
                setDate((prev) => ({ ...prev, day: e.target.value }));
              }}
              onFocus={() => {
                setTouch((prev) => ({ day: true, month: false, year: false }));
              }}
              style={{
                border: touch.day
                  ? date.day == "" || valid.day
                    ? "1px solid var(--purple)"
                    : "1px solid red"
                  : date.day == "" || valid.day
                  ? "1px solid var(--borders) "
                  : "1px solid red",
                color: date.day !== "" ? "black" : "",
              }}
            ></input>
            <label
              style={{
                opacity: touch.day
                  ? date.day == "" || valid.day
                    ? 0
                    : 1
                  : date.day == "" || valid.day
                  ? 0
                  : 1,
              }}
              className="error-text"
            >
              {date.day == "" ? "This field is required" : "Enter a valid day"}
            </label>
          </div>
          <div className="form-element">
            <label className="form-label">MONTH</label>
            <input
              type="number"
              min={1}
              placeholder="MM"
              className="form-input"
              onChange={(e) => {
                setDate((prev) => ({ ...prev, month: e.target.value }));
              }}
              onFocus={() => {
                setTouch((prev) => ({ day: false, month: true, year: false }));
              }}
              style={{
                border: touch.month
                  ? date.month == "" || valid.month
                    ? "1px solid var(--purple)"
                    : "1px solid red"
                  : date.month == "" || valid.month
                  ? "1px solid var(--borders) "
                  : "1px solid red",
                color: date.month !== "" ? "black" : "",
              }}
            ></input>
            <label
              style={{
                opacity: touch.month
                  ? date.month == "" || valid.month
                    ? 0
                    : 1
                  : date.month == "" || valid.month
                  ? 0
                  : 1,
              }}
              className="error-text"
            >
              {date.month == ""
                ? "This field is required"
                : "Enter a valid month"}
            </label>
          </div>
          <div className="form-element">
            <label className="form-label">YEAR</label>
            <input
              type="number"
              min={1}
              placeholder="YYYY"
              className="form-input"
              onChange={(e) => {
                setDate((prev) => ({ ...prev, year: e.target.value }));
              }}
              onFocus={() => {
                setTouch((prev) => ({ day: false, month: false, year: true }));
              }}
              style={{
                border: touch.year
                  ? date.year == "" || valid.year
                    ? "1px solid var(--purple)"
                    : "1px solid red"
                  : date.year == "" || valid.year
                  ? "1px solid var(--borders) "
                  : "1px solid red",
                color: date.year !== "" ? "black" : "",
              }}
            ></input>
            <label
              style={{
                opacity: touch.year
                  ? date.year == "" || valid.year
                    ? 0
                    : 1
                  : date.year == "" || valid.year
                  ? 0
                  : 1,
              }}
              className="error-text"
            >
              {date.year == ""
                ? "This field is required"
                : "Enter a valid year"}
            </label>
          </div>
        </div>
        <div className="divider-container">
          <div className="divider"></div>
          <div
            className="svg-container noSelect"
            style={{
              cursor:
                valid.day && valid.month && valid.year
                  ? "pointer"
                  : "not-allowed",
            }}
            onClick={() => {
              agecalculator();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="44"
              viewBox="0 0 46 44"
            >
              <g fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
              </g>
            </svg>
          </div>
        </div>
        <div className="finalage-container">
          <div className="age-container">
            <p className="age-number">{base ? datedisp.year : age.year}</p>
            <p className="age-label">{"years"}</p>
          </div>
          <div className="age-container">
            <p className="age-number">{base ? datedisp.month : age.month}</p>
            <p className="age-label">{"months"}</p>
          </div>
          <div className="age-container">
            <p className="age-number">{base ? datedisp.day : age.day}</p>
            <p className="age-label">{"days"}</p>
          </div>
        </div>
      </div>
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/doki12325">Dev Khokhar</a>.
      </div>
    </div>
  );
}

export default App;

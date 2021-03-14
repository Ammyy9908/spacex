import React from "react";

function Card({ filght_name, flight_number, img, year, mission_ids }) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={img} alt="card__thumb" />
      </div>
      <div className="card__content">
        <h1>{filght_name + " #" + flight_number}</h1>
        <h2>Mission IDS</h2>
        <ul>
          {mission_ids.map((item, index) => {
            return <li>{item}</li>;
          })}
        </ul>
        <p className="launch__year">
          <strong>Launch Year</strong>:{year}
        </p>
        <div className="success__info">
          <span className="successfull__launch">Launch Success:True</span>
          <span className="successfull__land">Land Success:True</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

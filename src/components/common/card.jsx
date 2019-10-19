import React from "react";

const Card = ({ location, weather, onClick }) => {
  return (
    <React.Fragment>
      <div className="c-weather animated fadeIn" onClick={onClick}>
        <h2 className="c-weather__city">
          {location.name}, {location.country}
        </h2>

        <div className="c-weather__details">
          <img
            src={"/icons/weather/" + weather.icon + ".svg"}
            className="c-weather__details__icon"
          />
          <div className="c-weather__details__temp">{weather.temp}°C</div>
        </div>

        <div className="c-weather__text">
          <div className="c-weather__text__phrase">{weather.phrase}</div>
          <div className="c-weather__text__minmax">
            {weather.temp_min}°C - {weather.temp_max}°C
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;

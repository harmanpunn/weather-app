import React from "react";
import Moment from "react-moment";

const MiniCard = ({ data, isForecast, location }) => {
  const date = (
    <Moment format="dddd, Do MMMM, HH:mm">{new Date(data.date * 1000)}</Moment>
  );

  return (
    <React.Fragment>
      <div className="c-forecast__weather animated fadeIn view">
        <div className="c-forecast__weather--date">
          {isForecast ? date : `${location.name}, ${location.country}`}
        </div>

        <div className="c-forecast__weather--details">
          <img
            src={"/icons/weather/" + data.icon + ".svg"}
            className="c-forecast__weather--details--icon"
          />
          <div className="c-forecast__weather--details--text">
            <div className="c-forecast__weather--details--text--phrase">
              {data.name}
            </div>
            <div className="c-forecast__weather--details--text--minmax">
              {data.temp_min}°C - {data.temp_max}°C
            </div>
          </div>
          <div className="c-forecast__weather--details--temp">
            {data.temp}°C
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MiniCard;

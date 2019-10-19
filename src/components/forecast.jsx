import React, { Component } from "react";
import { getForecast } from "../services/weatherService";
import MiniCard from "./common/miniCard";

class Forecast extends Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    console.log(this.props.location.state);
    const id = this.props.location.state ? this.props.location.state.id : null;
    const { data: weatherData } = await getForecast(id);
    this.setState({ weatherData, loaded: true });
  }

  handleCloseButton = () => {
    this.props.history.push("/");
  };

  render() {
    const { weatherData, loaded } = this.state;
    if (!loaded) return null;

    const location = {
      name: weatherData.city.name,
      country: weatherData.city.country
    };
    const daysList = weatherData.list;
    const weather = daysList.map(item => ({
      date: item.dt,
      temp: Math.round(item.main.temp),
      temp_max: Math.round(item.main.temp_max),
      temp_min: Math.round(item.main.temp_min),
      name: item.weather[0].main,
      icon: item.weather[0].icon
    }));

    window.weatherForecast = weather;
    return (
      <React.Fragment>
        <div className="c-container">
          <div className="c-title">
            <img src={"/icons/location.svg"} className="c-title__icon" />
            <h1 className="c-title__text">
              {location.name}, {location.country}
            </h1>
            <button className="c-close__popup" onClick={this.handleCloseButton}>
              <svg className="c-close__popup--icon">
                <use href="./icons/symbol-defs.svg#icon-plus"></use>
              </svg>
            </button>
          </div>

          <div className="c-title__subtext">Forecast for next 5 days</div>

          <div className="c-forecast">
            {weather.map(item => (
              <MiniCard key={item.date} data={item} isForecast={true} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Forecast;

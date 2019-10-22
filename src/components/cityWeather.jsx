import React, { Component } from "react";
import { getCityWeather } from "../services/weatherService";
import MiniCard from "./common/miniCard";
import LoadingSpinner from "./common/loadingSpinner";

class CityWeather extends Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    const { data: weatherData } = await getCityWeather(this.props.city);
    this.setState({ weatherData, loaded: true });
  }

  render() {
    const { weatherData, loaded } = this.state;

    if (!loaded) return null;

    const location = {
      name: weatherData.name,
      country: weatherData.sys.country
    };
    const weather = {
      date: weatherData.date,
      temp: Math.round(weatherData.main.temp),
      temp_max: Math.round(weatherData.main.temp_max),
      temp_min: Math.round(weatherData.main.temp_min),
      name: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon
    };

    return (
      <div
        className="c-city__weather animated fadeIn"
        onClick={this.props.onClick}
      >
        <MiniCard location={location} data={weather} />
      </div>
    );
  }
}

export default CityWeather;

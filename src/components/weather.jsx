import React, { Component } from "react";
import { getWeather } from "../services/weatherService";
import Card from "./common/card";
import LoadingSpinner from "./common/loadingSpinner";
import CityWeather from "./cityWeather";

class Weather extends Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    const { data: weatherData } = await getWeather();
    this.setState({ weatherData, loaded: true });
  }

  handleForecast = id => {
    console.log("Card Clicked !");
    this.props.history.push("/forecast", { id: id });
  };

  handleRemoveLocations = () => {
    localStorage.clear();
    window.location = "/";
  };

  render() {
    //window.wData = this.state.weatherData;
    const { weatherData, loaded } = this.state;
    const { savedLocations } = this.props;

    if (!loaded) return null;

    const location = {
      name: weatherData.name,
      country: weatherData.sys.country,
      id: weatherData.id
    };
    const weather = {
      temp: Math.round(weatherData.main.temp),
      temp_min: Math.round(weatherData.main.temp_min),
      temp_max: Math.round(weatherData.main.temp_max),
      phrase: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon
    };

    //console.log("Weather Data", weatherData);

    return (
      <React.Fragment>
        <div className="c-container">
          <div className="current">
            <div className="c-title animated fadeIn">
              <img src={"/icons/location.svg"} className="c-title__icon" />
              <h1 className="c-title__text">Current Location</h1>
            </div>
            <Card
              location={location}
              weather={weather}
              onClick={() => this.handleForecast(location.id)}
            />
          </div>

          <div className="other">
            <div className="c-title animated fadeIn">
              <svg className="c-title__icon">
                <use href="./icons/symbol-defs.svg#icon-map"></use>
              </svg>
              <h1 className="c-title__text">Other Locations</h1>
            </div>

            <div className="c-cities">
              {!savedLocations && (
                <div className="error__message">
                  You have no saved cities. Click on the button to add a city!
                </div>
              )}

              {savedLocations && (
                <React.Fragment>
                  {savedLocations.map(city => (
                    <CityWeather
                      key={city}
                      city={city}
                      onClick={() => this.handleForecast(city)}
                    />
                  ))}
                  <button
                    className="c-cities__remove--all animated fadeIn"
                    onClick={this.handleRemoveLocations}
                  >
                    Remove all locations
                  </button>
                </React.Fragment>
              )}
            </div>
            <button className="c-cities__add animated fadeIn">
              <svg className="c-cities__add--icon">
                <use href="./icons/symbol-defs.svg#icon-plus"></use>
              </svg>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Weather;

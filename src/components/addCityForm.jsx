import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCity } from "../services/weatherService";
import LoadingSpinner from "./common/loadingSpinner";
import CityWeather from "./cityWeather";
import { saveLocation } from "./../services/locationService";

class AddCityForm extends Form {
  state = {
    data: { cityName: "" },
    errors: {},
    submitted: false,
    isEmptyList: true
  };

  schema = {
    cityName: Joi.string()
      .required()
      .label("City Name")
  };

  constructor() {
    super();
    this.setState({ loaded: false });
  }

  componentDidMount() {
    document.body.classList.add("modal-open");
  }
  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  doSubmit = async () => {
    console.log("Submitted:", this.state.submitted);
    const { cityName } = this.state.data;
    const { data } = await getCity(cityName);
    const { list: cityList } = data;
    if (cityList.length) {
      this.setState({ cityList, isEmptyList: false });
    } else {
      this.setState({ isEmptyList: true });
    }
    this.setState({ loaded: true });
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  handleSaveCity = id => {
    console.log(id);
    saveLocation(id);
    window.location.reload();
  };

  //Render search results
  renderSearchResults(loaded, cityList) {
    const { isEmptyList } = this.state;
    if (isEmptyList) {
      return !loaded ? (
        <LoadingSpinner />
      ) : (
        <div className="error__message">There were no results, Sorry !</div>
      );
    }

    return !loaded ? (
      <LoadingSpinner />
    ) : (
      <React.Fragment>
        {cityList.map(city => (
          <CityWeather
            key={city.id}
            city={city.id}
            onClick={() => this.handleSaveCity(city.id)}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { show } = this.props;
    const { submitted, cityList, loaded } = this.state;
    return !show ? null : (
      <React.Fragment>
        <div className="c-modal animated fadeIn">
          <div className="c-cities__addCity open animated fadeIn">
            <button
              className="c-close__popup"
              onClick={e => {
                this.onClose(e);
              }}
            >
              <svg className="c-close__popup--icon">
                <use href="./icons/symbol-defs.svg#icon-plus"></use>
              </svg>
            </button>
            <div className="c-title animated fadeIn">
              <svg className="c-title__icon">
                <use href="./icons/symbol-defs.svg#icon-map"></use>
              </svg>
              <h1 className="c-title__text">Add New Location</h1>
            </div>
            <div className="c-title__subtext">
              Find a city and tap on it to add
            </div>
            <div className="c-search__city animated fadeIn">
              <form className="c-search__form" onSubmit={this.handleSubmit}>
                {this.renderInput("cityName")}
              </form>
              <div className="c-search__results">
                {submitted && this.renderSearchResults(loaded, cityList)}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddCityForm;

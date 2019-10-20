import React, { Component } from "react";

class AddCityForm extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.add("modal-open");
  }
  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    const { show } = this.props;
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddCityForm;

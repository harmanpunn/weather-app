import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Weather from "./components/weather";
import Forecast from "./components/forecast";
import { getSavedLocations } from "./services/locationService";

import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const savedLocations = JSON.parse(getSavedLocations());
    this.setState({ savedLocations });
  }

  render() {
    const { savedLocations } = this.state;
    return (
      <React.Fragment>
        <main className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Weather {...props} savedLocations={savedLocations} />
              )}
            />
            <Route path="/forecast" component={Forecast} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

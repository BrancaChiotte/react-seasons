import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";

class App extends React.Component {
  // REFACTORING - less code than creating constructor method
  state = { lat: null, errorMessage: "" };
  // same but without refactoring:
  // constructor(props) {
  //   super(props);

  //   this.state = { lat: null, errorMessage: "" };
  // }

  componentDidMount() {
    // REFACTORING - less lines of code
    window.navigator.geolocation.getCurrentPosition(
      // we called setstate!!!!
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })

      // same but without refactoring
      // (position) => {
      //     this.setState({ lat: position.coords.latitude });
      //   },
      //   (err) => {
      //     this.setState({ errorMessage: err.message });
      //   }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Loader message="Please accept location request" />;
  }

  // React says we have to define render!!
  render() {
    return <div className="border white">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

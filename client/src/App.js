import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./app/actions";
import Header from "./components/Header";
import Landing from "./components/Landing";

const Survey = () => {
  return <h1>Survey</h1>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(process.env.REACT_APP_STRIPE_KEY);
    console.log(process.env.NODE_ENV);
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route path="/" component={Landing} />
          <Route path="/survey" component={Survey} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);

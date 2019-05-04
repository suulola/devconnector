import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser } from "./actions/authAction";
import CreateProfile from "./components/create-profile/CreateProfile";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

if (localStorage.jwtToken) {
  //set authorization token header
  //decode token to get user info
  // dispatch to store to set user and isAuthenticated
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({
    type: "SET_CURRENT_USER",
    payload: decoded
  });
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user, clear current profile and redirect to login
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

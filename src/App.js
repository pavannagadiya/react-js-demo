import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/index";
import Home from "./components/home";
import DashBoard from "./components/dashboard";
import Login from "./components/login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/login" component={Login} />
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable={false}
            pauseOnHover
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

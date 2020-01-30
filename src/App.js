import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Helmet from "react-helmet";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import AddPage from "./AddPage";
import EditPage from "./EditPage";
import DetailPage from "./DetailPage";
import logo from "./resources/logo.png";


class App extends React.Component  {

  render() {
    return (
      <div className="App">

        <Router>
          <header>
            <img src={logo} style={{ width: "350px" }} />
            <Navigation />
          </header>
          <Route exact path="/" component={MainPage} />
          <Route path="/addpage" component={AddPage} />
          <Route path="/editpage/:id" component={EditPage} />
          <Route path="/detailpage/:id" component={DetailPage} />

        </Router>
      </div>
    );
  }
}

export default App;

import React from 'react';
import axios from "axios";
import { Route, BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import PopupFailed from "./PopupFailed";


class DetailPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {},
      popupDetailsFailed: false,
      redirect: false,
      movieFailed: "No Movie Yes" }

  }

  componentDidMount() {
    this.getDetails(this.props.match.params.id);
  }

  getDetails = (id) => {
    axios.get("http://3.120.96.16:3001/movies/" + id)
      .then((response) => {
          this.setState({ details: response.data });
    })
    .catch((error) => {
      this.detailsFailed();
    });

  }

  detailsFailed = () => {
    this.setState({ popupDetailsFailed: true });
  }

  backButton = () => {
    this.setState({ popupDetailsFailed: false, redirect: true });
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <>
        <Helmet>
          <title>{"MovieEC - " + this.state.details.title}</title>
        </Helmet>
        <div className="detailContainer">
          <h1>{this.state.details.title}</h1>
          <h3>Movie description</h3>
          <p>{this.state.details.description}</p>
          <h3>Director</h3>
          <p>{this.state.details.director}</p>
          <h3>Movie rating</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{this.state.details.rating}</p>
          <Link to={"/editpage/" + this.state.details.id}>Edit Movie</Link>
        </div>
        { this.state.popupDetailsFailed ? <PopupFailed detailsFailed={this.detailsFailed} backButton={this.backButton} movie={this.state.movieFailed} /> : null }
      </>
    );
  }
}

export default DetailPage;

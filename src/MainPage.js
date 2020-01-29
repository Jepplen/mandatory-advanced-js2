import React from 'react';
import Helmet from "react-helmet";
import axios from "axios";
import Popup from "./Popup";
import PopupFailed from "./PopupFailed";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";


class MainPage extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      movieID: "",
      search: "",
      popup: false,
      movie: {},
      popupDeleteFailed: false,
    };
    this.onChange = this.onChange.bind(this);
    this.deleteConfirmed = this.deleteConfirmed.bind(this);
    this.deleteCancelled = this.deleteCancelled.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  onChange(e) {
    this.setState({search: e.target.value });
  }

  getMovies = () => {
    axios.get("http://3.120.96.16:3001/movies")
      .then((response) => {
          this.setState({ list: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteMovie = (movie) => {
    this.setState({popup: true, movie: movie});
  }

  deleteConfirmed(movie){
    axios.delete("http://3.120.96.16:3001/movies/" + movie.id)
    .then(() => {
      this.setState({ popup: false, movie: {} });
      this.getMovies();
    })
    .catch((error) => {
      this.deleteFailed();
    });
  }

  deleteCancelled(movie){
    this.setState({ popup: false, movie: {} });
  }

  deleteFailed = (movie) => {
    this.setState({ popup: false, popupDeleteFailed: true });
  }

  backButton = () => {
    this.setState({ popupDeleteFailed: false });
    this.getMovies();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>MoviEC - It's easy!</title>
        </Helmet>
        <main>
          <input id="searchBox" type="text" placeholder="Search..." value={this.state.search} onChange={this.onChange}  />
          <div className="tableContent">
            <table className="mainTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Director</th>
                  <th>Rating</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { this.state.list.filter((movieToSearch) => {
                  let query = this.state.search.toLowerCase();
                  if (!query) {
                    return movieToSearch;
                  } else {
                    if (movieToSearch.title.toLowerCase().indexOf(query) === -1 && movieToSearch.director.toLowerCase().indexOf(query) === -1) {
                      return false;
                    } else {
                      return true;
                    }
                  }
                }).map(movie =>
                  <tr key={movie.id}>
                  {<td><Link to={"/detailpage/" + movie.id}>{ movie.title }</Link></td>}
                    <td>{ movie.director }</td>
                    <td>{ movie.rating }</td>
                    <td><Link to={"/editpage/" + movie.id}>Edit </Link></td>
                    <td><button onClick={() => this.deleteMovie(movie)}>Delete</button></td>
                  </tr>
                ) }
              </tbody>
            </table>
            { this.state.popup ?  <Popup deleteConfirmed={this.deleteConfirmed} deleteCancelled={this.deleteCancelled} movie={this.state.movie} /> : null }
            { this.state.popupDeleteFailed ? <PopupFailed deleteFailed={this.deleteFailed} backButton={this.backButton} movie={this.state.movie} /> : null }
          </div>
        </main>
      </>
    );
  }
}


export default MainPage;

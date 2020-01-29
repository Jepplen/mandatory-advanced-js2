import React from 'react';
import axios from "axios";
import Helmet from "react-helmet";
import { Route, BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import PopupFailed from "./PopupFailed";


class EditPage extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      director: "",
      rating: "",
      id: "",
      details: {},
      redirectEdit: 0,
      titleInvalid: false,
      descriptionInvalid: false,
      directorInvalid: false,
      ratingInvalid: false,
      invalidSubmit: false,
      submitFailed: false,
      popupEditFailed: false,
      redirect: false,
      movieFailed: "No Movie Yes",
     }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.titleInvalid = false;
    this.descriptionInvalid = false;
    this.directorInvalid = false;
    this.ratingInvalid = false;
    this.invalidSubmit = false;
    this.submitFailed = false;
    this.title = "";
    this.description = "";
    this.director = "";
    this.rating = "";

  }

  componentDidMount(props) {
    this.getDetailsToEdit(this.props.match.params.id);
  }

  onChange(e){
    let value = e.target.value;
    this.setState({ [e.target.name]: value });
    this.rating = this.state.rating.toString();

    if (e.target.name === "title") {this.title = e.target.value;}
    if (e.target.name === "description") {this.description = e.target.value;}
    if (e.target.name === "director") {this.director = e.target.value;}
    if (e.target.name === "rating") {
      this.rating = e.target.value.replace(",", ".");
      this.setState({rating: this.rating});
    }
    this.validation();
  }

  validation = () => {
    let regexTitle = this.title.match(/^.{0,40}$/);
    let regexDescription = this.description.match(/^.{0,300}$/);
    let regexDirector = this.director.match(/^.{0,40}$/);
    let regexRating = this.rating.match(/^([0-5]|[0-4][\.][0-9]|5\.0){0,3}$/);

    if (!regexTitle && !this.titleInvalid) {
      this.titleInvalid = true;
    } else if (regexTitle && this.titleInvalid){
      this.titleInvalid = false;
    }

    if (!regexDescription && !this.descriptionInvalid) {
      this.descriptionInvalid = true;
    } else if (regexDescription && this.descriptionInvalid) {
      this.descriptionInvalid = false;
    }

    if (!regexDirector && !this.directorInvalid) {
      this.directorInvalid = true;
    } else if (regexDirector && this.directorInvalid) {
      this.directorInvalid = false;
    }

    if (!regexRating && !this.ratingInvalid) {
      this.ratingInvalid = true;
    } else if (regexRating && this.ratingInvalid) {
      this.ratingInvalid = false;
    }

    if (this.titleInvalid || this.descriptionInvalid || this.directorInvalid || this.ratingInvalid) {
      this.invalidSubmit = true;
    } else {
      this.invalidSubmit = false;
      this.submitFailed = false;
    }

    if(!this.titleInvalid && !this.descriptionInvalid && !this.directorInvalid && !this.ratingInvalid) {
      if(this.state.submitFailed) {
        this.setState({submitFailed: false});
      }
    }
  }


  onSubmit(e) {
    e.preventDefault();
    if(this.invalidSubmit){
      this.setState({submitFailed: true});
    } else {
      let ratingParsed = parseFloat(this.state.rating);
      let movie = {
        title: this.state.title,
        description: this.state.description,
        director: this.state.director,
        rating: ratingParsed,
      }
      this.editMovie(movie);
    }
  }

  getDetailsToEdit = (id) => {
    axios.get("http://3.120.96.16:3001/movies/" + id)
      .then((response) => {
        let movie = response.data;
        this.setState({ id: id, title: movie.title, description: movie.description, director: movie.director, rating: movie.rating });
    })
    .catch((error) => {
      this.editFailed();
    });
  }



  delay = (seconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve();
      }, seconds * 1000);
    })
  }

  editMovie = (movie) => {
    axios.put("http://3.120.96.16:3001/movies/" + this.state.id, movie)
    .then(() => {
        this.setState({redirectEdit: 1})
        return this.delay(2);
    })
    .then(() => {
        this.setState({redirectEdit: 2})
          return this.delay(1);
    })
    .then(() => {
        this.setState({redirectEdit: 3})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  editFailed = () => {
    this.setState({ popupEditFailed: true });
  }

  backButton = () => {
    this.setState({ popupEditFailed: false, redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    if (this.state.redirectEdit === 1) {
      return <>
              <h1>Edit Movie</h1>
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              <h3 className="addingMovie">Processing...</h3>
            </>
    } else if (this.state.redirectEdit === 2) {
      return <>
              <h1>Edit Movie</h1>
              <h3>Movie successfully edited!</h3>
              <h5 className="redirecting">Redirecting...</h5>
            </>
    } else if (this.state.redirectEdit === 3) {
      return <Redirect to="/" />
    }


    return (
      <>
        <Helmet>
          <title>{"MoviEC - Edit Movie: " + this.state.title}</title>
        </Helmet>
        <h1>Edit Movie</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <p>Title: </p>
            <input id="editTitle" type="text" style={{ width: "325px", border: this.titleInvalid ? "1px solid red" : "1px solid grey", outline: "none" }} name="title" value={this.state.title} onChange={this.onChange} required />
            <div className="dummy" style={{ width: "325px", height: "25px"}}>
              {this.titleInvalid ? <p style={{color: "red", fontSize: "11px"}}>Maximum 40 characters exceeded</p> : null }
            </div>
          </div>
          <div>
            <p>Description:</p>
            <input id="editDescription" type="textarea" form="addForm" style={{ width: "325px", border: this.descriptionInvalid ? "1px solid red" : "1px solid grey", outline: "none" }} rows="5" cols="30" name="description" value={this.state.description} onChange={this.onChange} required />
            <div className="dummy" style={{ width: "325px", height: "25px"}}>
              {this.descriptionInvalid ? <p style={{color: "red", fontSize: "11px"}}>Maximum 200 characters exceeded</p> : null }
            </div>
          </div>
          <div>
            <p>Director:</p>
            <input id="editDirector" type="text" style={{ width: "325px", border: this.directorInvalid ? "1px solid red" : "1px solid grey", outline: "none" }} name="director" value={this.state.director} onChange={this.onChange} required />
            <div className="dummy" style={{ width: "325px", height: "25px"}}>
              {this.directorInvalid ? <p style={{color: "red", fontSize: "11px"}}>Maximum 40 characters exceeded</p> : null }
            </div>
          </div>
          <div>
            <p>Rating:</p>
            <input id="editRating" type="text" maxLength="3" style={{ width: "40px", border: this.ratingInvalid ? "1px solid red" : "1px solid grey", outline: "none" }} name="rating" value={this.state.rating} onChange={this.onChange} required />
            <div className="dummy" style={{ width: "325px", height: "25px"}}>
              {this.ratingInvalid ? <p style={{color: "red", fontSize: "11px"}}>Must be a number between 0.0 to 5.0</p> : null }
            </div>
          </div>
          <button type="submit">Edit Movie</button>
          {this.state.submitFailed ? <p style={{color: "red", fontSize: "15px"}}>One or more inputs are invalid</p> : null }
        </form>
        { this.state.popupEditFailed ? <PopupFailed editFailed={this.editFailed} backButton={this.backButton} movie={this.state.movieFailed} /> : null }
      </>
    );
  }
}


export default EditPage;

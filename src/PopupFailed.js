import React from 'react';
import Helmet from "react-helmet";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";



class PopupFailed extends React.Component  {

  constructor(props){
    super(props);
    this.state = {over25: false, movie: "" }
  }

  componentDidMount(props) {
    if(this.props.movie.title) {
      let movie = this.props.movie.title;
      if (movie.length > 25) {
        this.setState({over25: true, movie: movie});
      }
    } else {
      this.setState({movie: "No Movie"});
    }

  }

  render(props) {
    return (
      <>
        <div className="mask">
          <div className="popupFailedContainer" style={{ width: this.state.over25 ? "500px" : "425px" }}>
            <div className="popupFailedHeader"><h4>ERROR CODE: #286TURBO_KNAPP</h4></div>
            <p className="popupFailedTextMovie" style={{fontWeight: "bold"}}>{this.state.movie}</p>
            <p className="popupFailedText">#286TURBO_KNAPP: "This movie does not exist"</p>
            <div className="popupFailedButtonContainer">
              <button id="buttonBack" onClick={() => this.props.backButton()}>Ok</button>
            </div>
          </div>
        </div>
      </>

    );
  }
}


export default PopupFailed;

import React from 'react';
import Helmet from "react-helmet";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";



class Popup extends React.Component  {

  constructor(props){
    super(props);
    this.state = {over25: false}
  }

  componentDidMount() {
    let movie = this.props.movie.title;
    if (movie.length > 25) {
      this.setState({over25: true});
    }
  }

  render(props) {



    return (
      <>
        <div className="mask">
          <div className="popupContainer" style={{ width: this.state.over25 ? "500px" : "350px" }}>
            <div className="popupHeader"><h4>Warning!</h4></div>
            <p className="popupTextMovie" style={{fontWeight: "bold"}}>{this.props.movie.title}</p>
            <p className="popupText">Do you really want to delete this movie?</p>
            <div className="popupButtonContainer">
              <button onClick={() => this.props.deleteCancelled(this.props.movie)}>Cancel</button>
              <button onClick={() => this.props.deleteConfirmed(this.props.movie)}>Yes</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default Popup;

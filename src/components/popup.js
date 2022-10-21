import React, { Component } from "react";
import './style.css'

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>Pop up window example</h3>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

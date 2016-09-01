import React from 'react';
import Image from 'react-bootstrap';

export default React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    switch (this.props.direction) {
      case "up":
        var arrowImage = "./assets/UpArrow.png";
        break;
      case "down":
        var arrowImage = "./assets/DownArrow.png";
        break;
      case "left":
        var arrowImage = "./assets/LeftArrow.png";
        break;
      case "right":
        var arrowImage = "./assets/RightArrow.png";
        break;
      default:
        console.error("Invalid direction property in arrow")
        var arrowImage = "./assets/UpArrow.png";
      };
    return <img className='arrow' src={arrowImage} />
  }


});

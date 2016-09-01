import React from 'react';
//notice we use the relative path syntax when loading local files
import Square from './example-square'

export default React.createClass({
    getInitialState() {
        return {
          // checkerPosition is [x, y] position on board
          checkerPosition: [0, 0],
          squareDirections: []
        };
    },

    /**
    * Generates a random direction to associate with the square
    * @returns {string} "up", "down", "left", or "right"
    */
    generateRandomDirection() {
      var randomValue = Math.random() * 4;
      switch (Math.floor(randomValue)) {
        case 0:
          return "up";
        case 1:
          return "down";
        case 2:
          return "left";
        case 3:
        default:
          return "right";
      }
    },

    componentWillMount: function() {
      // Generate initial direction associated with each square
      for (let i = 0; i < this.props.size * this.props.size; i++) {
        this.state.squareDirections.push(this.generateRandomDirection());
      }
    },

    componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
    },

    /*
    * Advances the checker position based on the current square's direction
    */
    advanceChecker: function() {
      let iCheckerPositionIndex = this.state.checkerPosition[0] +
          this.state.checkerPosition[1] * this.props.size;
      switch (this.state.squareDirections[iCheckerPositionIndex]) {
        case 'up':
          this.state.checkerPosition[1]--;
          break;
        case 'down':
          this.state.checkerPosition[1]++;
          break;
        case 'left':
          this.state.checkerPosition[0]--;
          break;
        case 'right':
          this.state.checkerPosition[0]++;
          break;
        default:
          break;
      };
    },

    isCheckerOnBoard() {
      return this.state.checkerPosition[0] < this.props.size
        && this.state.checkerPosition[1] < this.props.size;
    },

    tick: function() {
      if (this.isCheckerOnBoard() && this.props.isPlaying()) {
        this.advanceChecker();
        this.setState(this.state);
      }
    },

    render() {
        //this example just creates a row of squares. Use CSS styling to
        //get the checkers into a mxm size board

        //create a new array of squares
        let squares = [];
        let key = 0;
        for(let i = 0; i < this.props.size; i++) {
            for(let j = 0; j < this.props.size; j++) {
                let color = key++ % 2 == 0 ? '#333333' : '#BBBBBB';
                if (j === this.state.checkerPosition[0] && i === this.state.checkerPosition[1]) {
                  color = '#8080ff';
                }
                let iDirection = i * this.props.size + j;
                squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={this.state.squareDirections[iDirection]} />)
            }
        }
        let size = (this.props.squareSize + 2) * this.props.size;
        let style = {
            width: size,
            height: size
        };
        return <div style={style}>
            {squares}
        </div>;
    }
});
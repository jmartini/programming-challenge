import React from 'react';
//notice we use the relative path syntax when loading local files
import Square from './example-square'
import isPositionInCycle from './cycleChecker'
import Checker from './checker';

export default React.createClass({
    getInitialState() {
        return {};
    },

    /*
    * Generates an array of squares. Properties are based on square position,
    * checker position, and square direction
    *
    * @returns {array} squares
    */
    generateSquares() {
      let squares = [];
      let key = 0;
      for(let i = 0; i < this.props.size; i++) {
          for(let j = 0; j < this.props.size; j++) {
              let color = key++ % 2 == 0 ? '#D9D9D9' : '#BFBFBF';
              if (j === this.props.checkerPosition[0]
                && i === this.props.checkerPosition[1]) {
                if (isPositionInCycle(this.props.checkerPosition[0],
                  this.props.checkerPosition[1], this.props.squareDirections)) {
                  color = '#FF462E';
                } else {
                  color = '#2DBCDD';
                }
              }
              let iDirection = i * this.props.size + j;
              squares.push(<Square key={key} size={this.props.squareSize}
                color={color} direction={this.props.squareDirections[iDirection]} />)
          }
      }
      return squares;
    },

    render() {

        let squares = this.generateSquares();
        let size = (this.props.squareSize + 2) * this.props.size;
        let style = {
            width: size,
            height: size,
            opacity: this.props.checkerOnBoard ? 1.0 : 0.3
        };
        return <div className="board" style={style}>
            {squares}
            <Checker boardSize={size} checkerTargetPosition={this.props.checkerPosition}
              squareSize={this.props.squareSize} playing={this.props.playing}
              snapPosition={this.props.snapPosition}/>
        </div>;
    }
});
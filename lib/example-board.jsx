import React from 'react';
//notice we use the relative path syntax when loading local files
import Square from './example-square'
import isPositionInCycle from './cycleChecker'

export default React.createClass({
    getInitialState() {
        return {};
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
                if (j === this.props.checkerPosition[0] && i === this.props.checkerPosition[1]) {
                  if (isPositionInCycle(this.props.checkerPosition[0], this.props.checkerPosition[1], this.props.squareDirections)) {
                    color = '#4dff88';
                  } else {
                    color = '#8080ff';
                  }
                }
                let iDirection = i * this.props.size + j;
                squares.push(<Square key={key} size={this.props.squareSize} color={color} direction={this.props.squareDirections[iDirection]} />)
            }
        }
        let size = (this.props.squareSize + 2) * this.props.size;
        let style = {
            width: size,
            height: size,
            opacity: this.props.checkerOnBoard ? 1.0 : 0.3
        };
        return <div className="board" style={style}>
            {squares}
        </div>;
    }
});
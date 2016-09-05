//all import statements must go at the top of the file.
import React from 'react';
import Board from './example-board';
import Controls from './example-controls';
import Sound from 'react-sound';

//get the content DOMElemet create in index.html
let content = document.getElementById('content');

//This is a React class. It's main methods are 'getInitialState', and 'render'.
let Main = React.createClass({

    getInitialState() {
        return {
            size: this.props.size,
            squareSize: this.props.squareSize,
            playing: false,
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

    generateSquareDirections: function(boardSize) {
      this.state.squareDirections.length = boardSize * boardSize;
      for (let i = 0; i < boardSize * boardSize; i++) {
        this.state.squareDirections[i] = this.generateRandomDirection();
      }
    },

    componentWillMount: function() {
      this.generateSquareDirections(this.props.size);
      this.reset();
    },

    componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
    },

    /*
    * Advances the checker position based on the current square's direction
    */
    advanceChecker: function() {
      let iCheckerPositionIndex = this.state.checkerPosition[0] +
          this.state.checkerPosition[1] * this.state.size;
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

    /*
    * Returns if the checker is curently on the board
    */
    isCheckerOnBoard() {
      return this.state.checkerPosition[0] < this.state.size
        && this.state.checkerPosition[1] < this.state.size
        && this.state.checkerPosition[0] >= 0
        && this.state.checkerPosition[1] >= 0;
    },

    tick: function() {
      if (this.isCheckerOnBoard() && this.state.playing) {
        this.advanceChecker();
        this.setState(this.state);
      } else if (this.state.playing){
        this.state.playing = false;
        this.setState(this.state);
      }
    },

    render() {
      let playStatusFall = !this.isCheckerOnBoard() && this.state.playing ?
        Sound.status.PLAYING :
        Sound.status.STOPPED;
      let playStatusMove = this.isCheckerOnBoard() && this.state.playing ?
        Sound.status.PLAYING :
        Sound.status.STOPPED;

        return <div>
            <Board size={this.state.size} squareSize={this.state.squareSize}
              checkerPosition={this.state.checkerPosition} squareDirections={this.state.squareDirections}
              checkerOnBoard={this.isCheckerOnBoard()} playing={this.state.playing}/>
            <Controls control={this} playing={this.state.playing}/>

            <Sound url='./assets/move.wav' playStatus={playStatusMove} />
            <Sound url='./assets/fall.wav' playStatus={playStatusFall} />
        </div>;
    },

    play() {
        this.state.playing = true;
        this.setState(this.state);
    },

    stop() {
        this.state.playing = false;
        this.setState(this.state);
    },

    reset() {
        let xPosition = Math.floor(Math.random() * this.state.size);
        let yPosition = Math.floor(Math.random() * this.state.size);
        this.state.checkerPosition[0] = xPosition;
        this.state.checkerPosition[1] = yPosition;
        this.setState(this.state);
    },

    setSize() {
        //we update our internal state.
        let largeSize = this.props.size * 2;
        this.state.size = this.state.size === this.props.size ?
          this.state.size = largeSize :
          this.state.size = this.props.size;
        this.generateSquareDirections(this.state.size);
        //setting our state forces a rerender, which in turn will call the render() method
        //of this class. This is how everything gets redrawn and how you 'react' to user input
        //to change the state of the DOM.
        this.setState(this.state);
    }
});

//this is the entry point into react. From here on out we deal almost exclusively with the
//virtual DOM. Here we tell React to attach everything to the content DOM element.
React.render(<Main squareSize={80} size={5}/>, content, () => {
    console.log("Rendered!");
});

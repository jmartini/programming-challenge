import React from 'react';
//this syntax is called obejct destructing.
import {Button, ButtonToolbar, Glyphicon, DropdownButton, MenuItem} from 'react-bootstrap'

export default React.createClass({
    getInitialState() {
        return {};
    },

    render() {
      let playColor = this.props.playing ? '#57EB7E' : '';
      let stopColor = this.props.playing ? '' : '#FF715E';

      let playStyle = {
        color: playColor
      };

      let stopStyle = {
        color: stopColor
      }

        return <div className='controls'>
          <ButtonToolbar>
            <Button bsSize="large" onClick={this.onPlay} style={playStyle}><Glyphicon glyph="play" /></Button>
            <Button bsSize="large" onClick={this.onStop} style={stopStyle}><Glyphicon glyph="pause" /></Button>
            <Button bsSize="large" onClick={this.onReset}><Glyphicon glyph="refresh" /></Button>
            <DropdownButton title="Options" id='1'>
              <MenuItem onSelect={this.onSetSize}>Toggle Size</MenuItem>
              <MenuItem onSelect={this.onShuffleArrows}>Shuffle Arrows</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
    },

    onPlay() {
        this.props.control.play();
    },


    onStop() {
        this.props.control.stop();
    },


    onReset() {
        this.props.control.reset();
    },

    onSetSize() {
        this.props.control.setSize();
    },

    onShuffleArrows() {
      this.props.control.generateSquareDirections(this.props.control.state.size)
      this.props.control.setState(this.props.control.state);
    }
});
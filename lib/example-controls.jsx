import React from 'react';
//this syntax is called obejct destructing.
import {Button, ButtonToolbar} from 'react-bootstrap'

export default React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        return <ButtonToolbar>
            <Button bsStyle="success" onClick={this.onPlay}>Play</Button>
            <Button bsStyle="danger" onClick={this.onStop}>Stop</Button>
            <Button bsStyle="primary" onClick={this.onReset}>Reset</Button>
            <Button onClick={this.onSetSize}>Toggle Size</Button>
            <Button onClick={this.onShuffleArrows}>Shuffle Arrows</Button>
        </ButtonToolbar>
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
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
    }
});
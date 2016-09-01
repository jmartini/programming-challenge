import React from 'react';
import Arrow from './arrow'

//this exports a reference to a React class as the default export
export default React.createClass({

    /**
     * In React state is maintained by the component itself.
     * @returns {{}} The initial state
     */
    getInitialState() {
        return {};
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

    /**
     * This must return a JSX element.
     * @returns {XML}
     */
    render() {
        //this will set the CSS style of the div we're returning.
        //this.props are injected by the entity that instantiated
        //this react class.
        let style = {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: this.props.color
        };
        let direction = this.generateRandomDirection();
        //To set a div's class in React you must use the 'className' attribute, instead of the
        //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.
        return <div className='square' ref='square' style={style}>
          <Arrow direction={direction} />
        </div>;
    },

    /**
     * After a component mounts (ie the component is added to the DOM), this
     * function is called. Here you can get a reference to the DOMElement by
     * using reacts ref mechanism.
     */
    componentDidMount() {
        //checker is a reference to a DOMElement.
        let checker = React.findDOMNode(this.refs.square);
    }
});
import React from 'react';
import PIXI from 'pixi.js';

export default React.createClass({

  getInitialState() {
    return {
      checkerSprite: {}
    };
  },

  componentDidMount() {
    // Create PIXI render. This is the display area, so match to the size of the board.
    this.renderer = PIXI.autoDetectRenderer(this.props.boardSize, this.props.boardSize, {transparent: true}, true);
    this.refs.gameCanvas.getDOMNode().appendChild(this.renderer.view);

    // Create Container where the checker sprite will live
    this.stage = new PIXI.Container();
    this.renderer.render(this.stage);
    this.stage.width = this.props.boardSize;
    this.stage.height = this.props.boardSize;

    PIXI.loader.add('assets/checker.png').load(this.checkerSpriteLoaded);
    this.animate();
  },

  /*
  * Called once checker sprite is loaded from PIXI loader.
  * Adds the sprite to the Container and sets initial position
  */
  checkerSpriteLoaded() {
    // Called once PIXI finishes loadint he checker sprite
    this.state.checkerSprite = new PIXI.Sprite(
      PIXI.loader.resources["assets/checker.png"].texture
    );
    this.state.checkerSprite.x = this.props.checkerTargetPosition[0] * this.props.squareSize;
    this.state.checkerSprite.y = this.props.checkerTargetPosition[1] * this.props.squareSize;
    this.stage.addChild(this.state.checkerSprite);
    this.renderer.render(this.stage);
  },

  /*
  * Moves sprite toward target position. Called 60 times per second
  */
  animate() {
    this.frame = requestAnimationFrame(this.animate);
    let squareSize = this.props.squareSize;
    let targetPosition = this.props.checkerTargetPosition;
    let currentPosition = [this.state.checkerSprite.x, this.state.checkerSprite.y]

    // Translate targetPosition, which is in square index, to pixels
    targetPosition = targetPosition.map(function(x) {return x * squareSize});

    let velocity = 2;

    if (currentPosition != targetPosition) {
      let xDirection = targetPosition[0] > currentPosition[0] ? 1 : -1;
      let yDirection = targetPosition[1] > currentPosition[1] ? 1 : -1;
      this.state.checkerSprite.x += velocity * xDirection;
      this.state.checkerSprite.y += velocity * yDirection;
    }

    this.renderer.render(this.stage);
  },

  render() {
    return <div className="checker" ref="gameCanvas"></div>
  }


});

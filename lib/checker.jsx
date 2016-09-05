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
    this.renderer = PIXI.autoDetectRenderer(this.props.boardSize,
      this.props.boardSize, {transparent: true}, true);
    this.renderer.autoResize = true;
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
  * Animation loop. Called 60 timers per second.
  */
  animate() {
    let boardSizePixels = this.props.boardSize;
    this.renderer.resize(boardSizePixels, boardSizePixels);

    requestAnimationFrame(this.animate);

    let squareSize = this.props.squareSize;
    let targetPosition = this.props.checkerTargetPosition;

    // Translate targetPosition, which is in square index, to pixels
    targetPosition = targetPosition.map(function(x) {return x * squareSize});

    if (this.props.snapPosition) {
      this.state.checkerSprite.x = targetPosition[0];
      this.state.checkerSprite.y = targetPosition[1];
    } else if (this.props.playing) {
      this.advanceChecker(targetPosition);
    }

    this.renderer.render(this.stage);
  },

  /*
  * Advances the checker sprite toward the target position
  *
  * @param {Array} currentPosition
  * @param {Array} targetPosition
  */
  advanceChecker (targetPosition) {
    let currentPosition = [this.state.checkerSprite.x, this.state.checkerSprite.y]
    let velocity = 2;

    if (currentPosition !== targetPosition) {
      let xVector = targetPosition[0] - currentPosition[0];
      let yVector = targetPosition[1] - currentPosition[1];

      if (Math.abs(xVector) < velocity) {
        this.state.checkerSprite.x = targetPosition[0];
      } else {
        this.state.checkerSprite.x += velocity * Math.sign(xVector);
      }

      if (Math.abs(yVector) < velocity) {
        this.state.checkerSprite.y = targetPosition[1];
      } else {
        this.state.checkerSprite.y += velocity * Math.sign(yVector);
      }
    }
  },

  render() {
    return <div className="checker" ref="gameCanvas"></div>
  }

});

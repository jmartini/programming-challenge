/**
* isPositionInCycle() tests if provided position is located in a cycle.
* Position is specified with xStartPosition and yStartPosition
* Movement direction for each square specified by "up", "down",
* "left", "right".
*
*
* @param {number} xStartPosition
* @param {number} yStartPosition
* @param {array} directions
* @return {boolean}
*/
function isPositionInCycle(xStartPosition, yStartPosition, directions) {
  const boardSize = Math.sqrt(directions.length);

  if (boardSize % 1 !== 0) {
    console.error("isPositionInCycle: Inavlid board size. Must be square.");
    return false;
  }

  var slowStepper = new PositionStepper(xStartPosition, yStartPosition);
  var fastStepper = new PositionStepper(xStartPosition, yStartPosition);

  // Validate starting position
  if (!slowStepper.isOnBoard(boardSize)) {
    console.error("isPositionInCycle: Invalid starting position");
    return false;
  }


  // First use Floyd's cycle finding algorithm to detect if a cycle exists
  var bCylceFound = false;
  while (slowStepper.isOnBoard(boardSize) && fastStepper.isOnBoard(boardSize) && !bCylceFound) {
    var iSlowArrayPosition = slowStepper.getArrayIndex(boardSize);
    var iFastArrayPosition = fastStepper.getArrayIndex(boardSize);
    slowStepper.step(directions[iSlowArrayPosition]);
    fastStepper.step(directions[iFastArrayPosition]);
    if (fastStepper.isOnBoard(boardSize)) {
      iFastArrayPosition = fastStepper.getArrayIndex(boardSize);
      fastStepper.step(directions[iFastArrayPosition]);
    } else {
      // fastStepper has fallen off the board so there is no cycle
      return false;
    }

    if (slowStepper.xPos === fastStepper.xPos && slowStepper.yPos === fastStepper.yPos) {
      bCylceFound = true;
    }
  }

  if (!bCylceFound) {
    return false;
  }

  /*
  * The second half of Floyd's cycle finding algorithm finds the start of the
  * the cycle. Iff the "lap point" of the algorithm is at our original position,
  * it is contained in the cycle.
  */
  return slowStepper.xPos === xStartPosition && slowStepper.yPos === yStartPosition;
}


/*
* Keeps track of a position as it moves positions
*/
function PositionStepper(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;

  /*
  * Advances the position a single step, "up", "down", "left", "right"
  *
  * @param {string} direction
  */
  this.step = function(direction) {
    switch (direction.toLowerCase()) {
      case "up":
        this.yPos--;
        break;
      case "down":
        this.yPos++;
        break;
      case "left":
        this.xPos--;
        break;
      case "right":
          this.xPos++;
          break;
      default:
        console.error("Position Stepper: Unexpected step direction");
        break;
    };
  }

  /*
  * Returns if the current position is on a board with size boardSize
  *
  * @param {number} boardSize
  * @param {boolean}
  */
  this.isOnBoard = function(boardSize) {
    var bPositionIsPositive = this.yPos >= 0 && this.xPos >=0;
    var bPositionLessThenMax = this.yPos < boardSize && this.xPos < boardSize;
    return bPositionIsPositive && bPositionLessThenMax;
  }

  /*
  * Returns the index of this position in an array of size boardSize^2
  *
  * @param {number} boardSize
  * @param {number} index
  */
  this.getArrayIndex = function (boardSize) {
     return this.yPos * boardSize + this.xPos;
  }

}


module.exports = isPositionInCycle;

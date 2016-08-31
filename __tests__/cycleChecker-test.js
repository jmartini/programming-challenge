jest.unmock('../lib/cycleChecker')

const isPositionInCycle = require('../lib/cycleChecker');

describe('Simple Cycle', () => {
  it('Tests a simple cycle', () => {
    // 2x2 board making a circle
    var directions = []
    directions.push("right");
    directions.push("down");
    directions.push("up");
    directions.push("left");

    expect(isPositionInCycle(0, 0, directions)).toBe(true);
  });
});


describe('Go off board', () => {
  it('Tests that if we go off the board we dont detect a cycle', () => {
    // 2x2 board with no cycles
    var directions = [];
    directions.push("right");
    directions.push("down");
    directions.push("left");
    directions.push("left");

    expect(isPositionInCycle(0, 0, directions)).toBe(false);
  });
});


describe('Dont start in cycle', () => {
  it('Path has cycle but current position not in cylce', () => {
    // 2x2 board has cylce but doesnt contain point (0, 0)
    var directions = [];
    directions.push("right");
    directions.push("down");
    directions.push("up");
    directions.push("up");

    expect(isPositionInCycle(0, 0, directions)).toBe(false);
  });
});


describe('Inavlid position', () => {
  it('Tests an invalid starting position', () => {
    // 2x2 board making a circle
    var directions = []
    directions.push("right");
    directions.push("down");
    directions.push("up");
    directions.push("left");

    expect(isPositionInCycle(-1, 0, directions)).toBe(false);
  });
});


describe('invalid board size', () => {
  it('Tests invald (non-square) board', () => {
    var directions = []
    directions.push("right");
    directions.push("down");
    directions.push("up");

    expect(isPositionInCycle(0, 0, directions)).toBe(false);
  });
});


describe('Direction case insensitive', () => {
  it('Directions specified should be case insensitive', () => {
    // 2x2 board making a circle
    var directions = []
    directions.push("Right");
    directions.push("Down");
    directions.push("DOWN");
    directions.push("lEft");

    expect(isPositionInCycle(0, 0, directions)).toBe(false);
  });
});

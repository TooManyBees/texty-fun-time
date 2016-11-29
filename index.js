var Canvas = require('canvas');
var findEmptySpot = require('./find_empty_spot.js');

function draw(w, h, options) {
  var canvas = new Canvas(w, h);
  drawToCanvas(canvas, options);
  return canvas;
}

function drawToCanvas(canvas, _options) {
  var options = Object.extend({ w: canvas.width, h: canvas.height, shortDimension: Math.min(canvas.height, canvas.width) }, _options);
  var ctx = canvas.getContext('2d');
  // Is this required now that we're passing a whole canvas in instead of a context?
  var _textAlign = ctx.textAlign;
  var _textBaseline = ctx.textBaseline;
  var _fillStyle = ctx.fillStyle;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = 'rgb(253, 120, 168)';

  for (var i = 0; i < options.max; i++) {
    drawCharacter(ctx, i, options);
  }

  ctx.textAlign = _textAlign;
  ctx.textBaseline = _textBaseline;
  ctx.fillStyle = _fillStyle;
}

function sizeFn0(i, options) {
  return Math.random() < 0.5 ? sizeFn1(i, options) : sizeFn2(i, options);
}
function sizeFn1(i, options) {
  return (1.5 * options.shortDimension / (i + 1)) + 10;
}
function sizeFn2(i, options) {
  return (options.shortDimension / 3 * (1 - Math.log(i+1) / Math.log(options.max))) + 10;
}
var sizeFns = [sizeFn0, sizeFn1, sizeFn2];

// original draw function
function drawCharacter(ctx, i, options) {
  var fontSize = sizeFn0(i, options);
  ctx.save();
  ctx.font = "" + fontSize + "px courier";
  var emptySpot;
  if (options.startCentered && i === 0) {
    emptySpot = { x: options.w/2, y: options.h/2, opacity: 0 };
  } else {
    emptySpot = findEmptySpot(ctx, fontSize, options.w, options.h);
  }
  ctx.translate(emptySpot.x, emptySpot.y);
  ctx.rotate(Math.random() * Math.PI * 2);
  ctx.fillText("W", 0, 0);
  ctx.restore();
}

module.exports = {
  draw: draw,
  drawToCanvas: drawToCanvas,
};

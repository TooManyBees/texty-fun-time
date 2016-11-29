var findEmptySpot = require('./find_empty_spot.js');

var UNDEFINED = "undefined";
function defaultOptions(_options) {
  var text = _options.text;
  if (typeof _options.text === UNDEFINED) {
    text = ['W'];
  }
  if (typeof text === "string") {
    text = text.replace(/[\W_]/g, '');
    text = text.split('');
  }
  if (!Array.isArray(text) || text.length === 0) {
    throw "Invalid text "+_options.text;
  }

  var count = text.length;
  if (typeof _options.density === "number") {
    count = Math.pow(count, _options.density);
  }

  var sizing = 'random';
  if (['random', 'linear', 'logarithmic'].indexOf(_options.sizing) >= 0) {
    sizing = _options.sizing;
  }

  return Object.assign({ color: 'rgb(253, 120, 168)', startCentered: true, count: count }, _options, { text: text, sizing: sizing });
}

function draw(canvas, _options) {
  var options = defaultOptions(_options);
  options = Object.assign({ w: canvas.width, h: canvas.height, shortDimension: Math.min(canvas.height, canvas.width) }, options);
  var ctx = canvas.getContext('2d');
  // Is this required now that we're passing a whole canvas in instead of a context?
  var _textAlign = ctx.textAlign;
  var _textBaseline = ctx.textBaseline;
  var _fillStyle = ctx.fillStyle;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = options.color;

  for (var i = 0; i < options.count; i++) {
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
  return (options.shortDimension / 3 * (1 - Math.log(i+1) / Math.log(options.count))) + 10;
}
var sizeFns = {
  random: sizeFn0,
  linear: sizeFn1,
  logarithmic: sizeFn2,
};

// original draw function
function drawCharacter(ctx, i, options) {
  var fontSize = sizeFns[options.sizing](i, options);
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
  ctx.fillText(sample(options.text), 0, 0);
  ctx.restore();
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  draw: draw,
};

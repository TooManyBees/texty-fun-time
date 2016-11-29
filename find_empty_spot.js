var WORST_CANDIDATE = { opacity: Infinity };
function findEmptySpot(ctx, size, w, h) {
  var bestCandidate = WORST_CANDIDATE;
  for (var i = 0; i < 10; i++) {
    var x = Math.round(Math.random() * w);
    var y = Math.round(Math.random() * h);
    var sample = opacity(ctx, x, y, size);
    if (sample.opacity < bestCandidate.opacity) {
      bestCandidate = sample;
      if (bestCandidate.opacity === 0) {
        // Can't get better than an open area, so take the first perfect spot we find.
        break;
      }
    }
  }
  return bestCandidate;
}

function opacity(ctx, x, y, size) {
  var sum = 0;
  var data = ctx.getImageData(x - size/2, y - size/2, size, size).data;
  var len = data.length;
  for (var i = 3; i < len; i += 4) { // start at 4th idx, the alpha
    sum += data[i];
  }
  return { x: x, y: y, opacity: sum };
}

module.exports = findEmptySpot;

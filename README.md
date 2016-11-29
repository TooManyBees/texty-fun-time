# Mosaic

Do you like words? No, scratch that. Not words, letters. Do you like letters, (characters, graphemes, _motherfucking sigils_, et goddamn cetera) but wish they weren't so unfairly constrained into words? Those fucking oppressive prison cells of grammar, that's what I think of words. Who needs em! Not me.

So why bother making word art. Boring 1997 Microsoft Word plugin word art. Lame "256-color, curved across the arc of a circle, then shat upon by a dithered drop shadow" word art. When you could make a text mosaic.

(Obv I spent most of my youth playing with MS Word word art, because who wouldn't have given the opportunity.)

# HOW DOES?

```javascript
var Canvas = require('canvas'); // if running in Node
var MAGNIFICENT_ARTWORKS = require('texty-fun-time');

var canvas = new Canvas(512, 512);
MAGNIFICENT_ARTWORKS.draw(canvas, {
  text: "ooh mickey you're so pretty can't you understand",
  density: 2,
  startCentered: false,
});
```

![My karaoke playlist was on when I wrote this](itsguyslikeyoumickey.png)

# Terms of Use

This software is offered under the BITE-ME license, wherein you can do whatever the fuck you want with it, but if you @ me I will drive to your home and say mean words to you as I flick you in the eye.

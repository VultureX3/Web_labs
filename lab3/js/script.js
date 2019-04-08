var canvas = document.createElement('canvas');

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var IMAGE_WIDTH = 400;
var IMAGE_HEIGHT = 300;

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

setAttributes(canvas, {
    'id': 'canvas',
    'width': CANVAS_WIDTH,
    'height': CANVAS_HEIGHT,
    'style': 'border: 2px solid'
})

var body = document.body;
body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var url1 = "https://source.unsplash.com/collection/1147624/400x300";
var url2 = "https://source.unsplash.com/collection/1147628/400x300";
var url3 = "https://source.unsplash.com/collection/1127163/400x300";
var url4 = "https://source.unsplash.com/collection/1127173/400x300";

var imageSources = [url1, url2, url3, url4];
var images = [];
var areImagesDrawed = false;
var isTextFetched = false;
var textToDraw = null;
var resultImage = null;

function drawImages() {
  var dx = (CANVAS_WIDTH - 2 * IMAGE_WIDTH) * Math.random();
  var dy = (CANVAS_HEIGHT - 2 * IMAGE_HEIGHT) * Math.random();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 4; i++) {
    ctx.drawImage(
      images[i],
      (i % 2 && IMAGE_WIDTH) + dx,
      (Math.floor(i / 2) && IMAGE_HEIGHT) + dy
    );
  }
  areImagesDrawed = true;
}

var responseCount = 0;

function fetchImage(suitableImages) {
  responseCount++;
  var image = new Image();

  image.onerror = function(error) {
    tryToFetchNext(suitableImages);
  }.bind(this);

  image.onload = function() {
    suitableImages.push(image);
    if (suitableImages.length < 4) {
      fetchImage(suitableImages);
    } else {
      images = suitableImages;
      drawImages();
    }
  }.bind(this);

  image.setAttribute("crossOrigin", "Anonymous");
  image.src = imageSources[suitableImages.length];
}

function collectFourImages() {
  var suitableImages = [];
  responseCount = 0;
  fetchImage(suitableImages);

  return suitableImages;
}

function generatePost() {
  textToDraw = null;
  isTextFetched = false;
  areImagesDrawed = false;

  collectFourImages();
}

generatePost();


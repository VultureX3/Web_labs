// https://jsfiddle.net/user2314737/28wqq1gu/
// Thanks to this example for downloading

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var IMAGE_WIDTH = 400;
var IMAGE_HEIGHT = 300;

var canvas = document.createElement("canvas");
canvas.setAttribute("width", CANVAS_WIDTH);
canvas.setAttribute("height", CANVAS_HEIGHT);

var br = document.createElement("br");



var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
body.appendChild(br);
body.appendChild(generateButton);
body.appendChild(saveButtonLinkWrapper);

var ctx = canvas.getContext("2d");

var url1 = "https://source.unsplash.com/collection/1147624/400x300";
var url2 = "https://source.unsplash.com/collection/1147628/400x300";
var url3 = "https://source.unsplash.com/collection/1127163/400x300";
var url4 = "https://source.unsplash.com/collection/1127173/400x300";

var imageSources = [url1, url2, url3, url4];
var images = [];

var imagesDrawn = false;
var textFetched = false;
var textToDraw = null;

var resultImage = null;

function asyncGetRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) cb(xhr.responseText);
      else throw new Error("Request failed");
    }
  };
  xhr.open("GET", url, true);
  xhr.send(null);
}

function clearText(textWithTags) {
  var htmlElement = document.createElement("div");
  htmlElement.innerHTML = textWithTags;
  var textWithoutTags = htmlElement.textContent || htmlElement.innerText || "";
  return textWithoutTags.trim();
}

function separateTextByLines(text) {
  var charWidth = 20;
  var canvasPadding = 20;
  if (text.length * charWidth < CANVAS_WIDTH - canvasPadding) {
    return [text];
  } else {
    var words = text.split(" ");
    var result = [];
    var currentLine = " ";
    for (var i = 0; i < words.length; i++) {
      if (
        currentLine.length * charWidth + words[i].length * charWidth <
        CANVAS_WIDTH - canvasPadding
      ) {
        currentLine += words[i] + " ";
      } else {
        if (result.length === 4) {
          currentLine += "...";
          result.push(currentLine);
          result.push(currentLine);
          return result;
        }
        result.push(currentLine);
        currentLine = " " + words[i] + " ";
      }
    }
    return result;
  }
}

function printText() {
  if (textFetched && imagesDrawn) {
    ctx.textAlign = "center";
    ctx.font = "30px Helvetica";
    ctx.fillStyle = "white";

    var lineHeight = 36;

    var lines = separateTextByLines(textToDraw);
    var startY = CANVAS_HEIGHT / 2 - (lines.length / 2) * lineHeight;

    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 320, startY + i * lineHeight);
    }

    saveButtonLinkWrapper.href = resultImage;
  }
}

function onTextFetched(result) {
  var textWithTags = JSON.parse(result)[0].content;
  textToDraw = clearText(textWithTags);
  textFetched = true;
  printText();
}

function fetchText() {
  asyncGetRequest(
    "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&generation=" +
      Math.random(),
    onTextFetched
  );
}

function onAllImagesLoaded() {
  var dx = (CANVAS_WIDTH - 2 * IMAGE_WIDTH) * Math.random();
  var dy = (CANVAS_HEIGHT - 2 * IMAGE_HEIGHT) * Math.random();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 4; i++) {
    ctx.drawImage(
      images[i],
      (i % 2 && IMAGE_WIDTH) + dx,
      (Math.floor(i / 2) && IMAGE_HEIGHT) + dy
    );
    ctx.globalAlpha = 0.5;
  }

  imagesDrawn = true;
  printText();
}

var responseCount = 0;

function fetchNext(suitableImages) {
  responseCount++;
  var image = new Image();

  image.onerror = function(error) {
    console.log("Catched CORS error");
    fetchNext(suitableImages);
  }.bind(this);

  image.onload = function() {
    console.log("Successfully requested");
    suitableImages.push(image);
    if (suitableImages.length < 4) {
      fetchNext(suitableImages);
    } else {
      images = suitableImages;
      onAllImagesLoaded();
    }
  }.bind(this);

  image.setAttribute("crossOrigin", "Anonymous");
  image.src = imageSources[suitableImages.length] + "?random=" + Math.random();
}

function collectFourImages() {
  var suitableImages = [];
  responseCount = 0;
  fetchNext(suitableImages);

  return suitableImages;
}

function generatePost() {
  textToDraw = null;
  textFetched = false;
  imagesDone = false;

  collectFourImages();
  fetchText();
}

generatePost();

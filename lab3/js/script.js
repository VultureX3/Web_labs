var canvas = document.createElement('canvas');

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

setAttributes(canvas, {
    'id': 'canvas',
    'width': '600px',
    'height': '600px',
    'style': 'border: 2px solid'
})

var body = document.body;
body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var image1 = new Image();
image1.src = 'https://unsplash.com/collections/2203755/300x300';
image1.setAttribute("crossOrigin", "Anonymous");
ctx.drawImage(image1, 0, 0, canvas.width / 2, canvas.height / 2);
var image2 = new Image();
image2.src = '../lab2/img/2.jpg';
ctx.drawImage(image2, canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
var image3 = new Image();
image3.src = '../lab2/img/3.jpg';
ctx.drawImage(image3, 0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
var image4 = new Image();
image4.src = '../lab2/img/logo.jpg';
ctx.drawImage(image4, canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
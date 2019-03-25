var canvas = document.createElement('canvas');

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

setAttributes(canvas, {
    'id': 'canvas',
    'width': '600px',
    'height': '300px',
    'style': 'border: 2px solid'
})

var body = document.body;
body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var image = new Image();
image.src = '../lab2/img/1.jpg';
ctx.drawImage(image, 0, 0)
var pixelUtil = require('pixel-util');
var Canvas = require('canvas')
  , canvas = new Canvas(300, 300)
  , ctx = canvas.getContext('2d')
  , fs = require('fs');
var image = new Canvas.Image;
var canvas;

ctx.font = 'normal 40px Helvetica'; // Choix de la police
ctx.fillText("Alerian#8058", 30, 255);; // Remplissage de texte

pixelUtil.createBuffer("a.png").then(buffer => {
    image.src = buffer;
	ctx.drawImage(image, 0, 0, 300, 300);


var out = fs.createWriteStream(__dirname + '/dégradés.png')
  , stream = canvas.createPNGStream();

stream.on('data', function(chunk){
  out.write(chunk);
});
});
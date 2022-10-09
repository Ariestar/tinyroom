var img;
function preload() {
	img = loadImage('image.jpg')
}
function setup() {
	console.log(img);
	noStroke()
	createCanvas(img.width, img.height);
	// image(img, 0, 0)
}
function draw() {
	background(255)
	var w = img.width,
		h = img.height;
	var centerX = w/2,
		centerY = h/3,
		distance = Math.abs(mouseX - centerX) + Math.abs(mouseY - centerY),
		goldenRatioAngle  = (Math.sqrt(5) - 1),
		id = 1,
		radius = 1,
		radiusStep = map(distance, 0 ,w+h, 2, 5),
		maxDiameter = 7
		initialAngle = Math.atan((mouseY - centerY)/(mouseX - centerX))
	while(radius <= w/2) {
		angle = initialAngle+  goldenRatioAngle*id*Math.PI
		radiusStep = radiusStep * 20001 / 20000
		radius = sqrt(id) * radiusStep
		x = centerX + radius*Math.cos(angle)
		y = centerY + radius*Math.sin(angle)
		color = img.get(Math.round(x), Math.round(y))
		fill(color)
		bright = brightness(color)
		diameter = map(bright, 150, 0, 0.5, maxDiameter)
		circle(x, y, diameter)
		id++;
	}
}
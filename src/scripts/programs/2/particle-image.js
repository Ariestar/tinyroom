/** @type {HTMLCanvasElement} */
import { getPixelRatio } from "../../../JS/tools.js";
const canvas = document.querySelector("#canvas");
const values = {
	maxSpeed: 10,
	particleNumber: 5000,
	size: Math.random() * 3,
};
const ctx = canvas.getContext("2d");
const img = new Image();
const maxSpeed = 10;
const particleNumber = 5000;
img.src = "spider-man.jpg";
img.crossOrigin = "anonymous";

document.querySelectorAll("input[type='range']").forEach(i => {
	console.log(i);
});
console.log(values);

class Particle {
	constructor(size) {
		this.x = this.#updateX();
		this.y = this.#updateY();
		this.speed = this.#updateSpeed();
		this.acc = Math.random() / 10000 + 0.001;
		this.size = size;
		this.maxSpeed = maxSpeed;
		this.angle = 0;
		this.brightness;
	}
	#updateSpeed() {
		return Math.random() + 3;
	}
	#updateX() {
		return Math.floor(Math.random() * canvas.width + 1);
	}
	#updateY() {
		return Math.floor(Math.random() * canvas.height + 1);
	}
	update(brightnessArray) {
		if (
			brightnessArray[Math.floor(this.y)] &&
			brightnessArray[Math.floor(this.y)][Math.floor(this.x)]
		) {
			this.brightness = brightnessArray[Math.floor(this.y)][Math.floor(this.x)].brightness;

			this.speed = this.maxSpeed * (1.5 - this.brightness / 255) + this.acc;

			if (this.speed >= this.maxSpeed) {
				this.speed = this.#updateSpeed();
			}

			this.angle += this.speed;

			this.y += this.speed;
			this.x -= Math.cos(this.angle) * Math.random() * 10;

			if (this.y >= canvas.height || this.y <= 0) {
				this.y = 0;
			}
			if (this.x >= canvas.width || this.x <= 0) {
				this.x = 0;
			}
		}
	}
	draw(brightnessArray) {
		ctx.beginPath();
		if (
			brightnessArray[Math.floor(this.y)] &&
			brightnessArray[Math.floor(this.y)][Math.floor(this.x)]
		) {
			ctx.fillStyle = brightnessArray[Math.floor(this.y)][Math.floor(this.x)].color;
			// ctx.fillStyle = 'white';
		}
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

img.onload = () => {
	const ratio = getPixelRatio(ctx);
	const width = img.width;
	const height = img.height;

	canvas.style.width = width / ratio + "px";
	canvas.style.height = height / ratio + "px";
	canvas.width = width;
	canvas.height = height;
	ctx.scale(ratio, ratio);

	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	let averageSpeed = 0.01;
	const particleArray = [];
	let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let brightnessArray = [];

	(function init() {
		for (let i = 0; i < particleNumber; i++) {
			particleArray.push(new Particle(values.size));
		}

		(() => {
			for (let y = 0; y < canvas.height; y++) {
				let row = [];
				for (let x = 0; x < canvas.width; x++) {
					const red = pixels.data[y * 4 * pixels.width + x * 4];
					const green = pixels.data[y * 4 * pixels.width + x * 4 + 1];
					const blue = pixels.data[y * 4 * pixels.width + x * 4 + 2];
					const brightness = (() => {
						return Math.sqrt(
							red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
						);
					})();
					row.push({
						brightness: brightness,
						color: "rgb(" + red + "," + green + "," + blue + ")",
					});
				}
				brightnessArray.push(row);
			}
		})();
	})();

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	function animation(e) {
		ctx.fillStyle = "#000";
		// ctx.globalAlpha = averageSpeed / maxSpeed / 10;
		ctx.globalAlpha = 0.07;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 0.9;
		for (let i = 0; i < particleNumber; i++) {
			particleArray[i].update(brightnessArray, e);
			particleArray[i].draw(brightnessArray);
			averageSpeed += particleArray[i].speed;
		}
		averageSpeed /= particleNumber;
		requestAnimationFrame(animation);
	}
	animation();
};

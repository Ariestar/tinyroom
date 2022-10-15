import { title } from "./data.js";
import { fonts } from "./data.js";

var font = fonts[Math.floor(Math.random() * fonts.length)];
console.log(font);
let $title = document.querySelector("#title"),
	$char;
const $shadow = document.querySelector("#pages .main .title-shadow");
$title.style.fontFamily = font;
$title.innerHTML = title;
$shadow.style.fontFamily = font;
$shadow.innerHTML = title;

// (function () {
// 	let res = Splitting({ target: $title, by: "chars" });

// 	const length = title.split(" ").join("").length;
// 	let targetNum = length / (4 + Math.floor(Math.random() * 2));
// 	for (; targetNum >= 0; targetNum--) {
// 		var index = Math.ceil(Math.random() * length) - 1;
// 		res[0].chars[index].style.color = randomColor();
// 	}
// })();
document.addEventListener("mousemove", e => {
	var e = e || window.event;
	let left = e.clientX;
	let top = e.clientY;
	let oldLeft = parseInt(getComputedStyle($title, null).left);
	let oldTop = parseInt(getComputedStyle($title, null).top);
	// console.log(oldLeft + Math.abs(left - oldLeft));
	$shadow.style.left = oldLeft + (left - oldLeft) / 10 + 'px'
	$shadow.style.top = oldTop + (top - oldTop) / 10 + 'px'
});

// $char = document.querySelectorAll("#title .char");
// $char.forEach(e => {
// 	e.addEventListener("mouseenter", function() {
// 		gsap.to(this, {
// 			keyframes: [
// 				{ duration: 0.4, scale: 1.2, ease: "sine.out" },
// 				{ duration: 0.4, scale: 1, ease: "power1.in" },
// 			],
// 		});
// 	});
// 	e.addEventListener("mousedown", function () {
// 		var t = new Date().getTime(),
// 			longPress = 1500;
// 		var time = setInterval(function () {
// 			console.log(new Date().getTime() - t);
// 			if (new Date().getTime() - t > longPress) {
// 				//longpress
// 				clearInterval(time);
// 				$title.classList.add("rainbow");
// 			}
// 		}, 100);
// 		e.addEventListener("mouseup", function () {
// 			if (new Date().getTime() - t <= longPress) {
// 				//click
// 				clearInterval(time);
// 				$title.classList.remove("rainbow");
// 				e.style.transition = "color ease 200ms";
// 				e.style.color = randomColor();
// 				console.log("cleared");
// 			}
// 		});
// 	});
// });

// function randomColor() {
// 	var c1 = Math.floor(Math.random() * 256);
// 	var c2 = Math.floor(Math.random() * 256);
// 	var c3 = Math.floor(Math.random() * 256);
// 	return "rgb(" + c1 + "," + c2 + "," + c3 + ")";
// }

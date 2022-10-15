import { page } from "./data.js";
import { throttle } from "./tools.js";

let current = page.default;
const n = page.count;

const pages = document.querySelector("#pages");
changePage();
pages.addEventListener(
	"wheel",
	e => {
		e.preventDefault();
	},
	{ passive: false }
);
pages.addEventListener(
	"wheel",
	throttle(
		event => {
			let delta = event.deltaY;

			if (current && typeof current === "number") {
				if (delta < 0 && current > 1) {
					// left
					changePage("pre");
				} else if (delta > 0 && current < n) {
					// right
					changePage("fol");
				} else if (delta > 0 && current === n) {
					// showFooter();
				}
			}
		},
		500,
		{ trailing: false }
	)
);

function changePage(direction) {
	const width = document.body.clientWidth;

	if (direction && (direction === "pre" || direction === "fol")) {
		if (direction === "pre") {
			current -= 1;
		} else if (direction === "fol") {
			current += 1;
		}

		console.log(current);
		pages.scroll({
			left: (current - 1) * width,
			behavior: "smooth",
		});
	} else {
		pages.scroll({
			left: (current - 1) * width,
			behavior: "smooth",
		});
	}

	// set scroll animation
	// if ("project" === page.pageNames[current - 1]) {
	// 	const items = document.querySelectorAll("#pages .project .item");
	// 	ScrollReveal().reveal(items, {
	// 		duration: 1300,
	// 		origin: "left",
	// 		distance: "0.7em",
	// 		opacity: 1,
	// 		reset: true,
	// 	});
	// }
}

export { changePage };

// function showFooter() {
// 	const body = document.querySelector("body");
// 	const footer = document.querySelector("footer");
// 	const h = footer.style.height;
// 	const windowHeight = document.body.clientHeight;
// 	//show footer
// 	window.scroll({
// 		top: windowHeight + h,
// 		behavior: "smooth",
// 	});
// 	body.addEventListener("wheel", e => {
// 		e.stopPropagation()
// 		e.stopImmediatePropagation()
// 		if (e.deltaY < 0) {
// 			console.log("up");
// 			window.scroll({
// 				top: windowHeight,
// 				behavior: "smooth",
// 			});
// 		}
// 	});
// }

import { loading } from "./loading.js";

loading.then(() => {
	ScrollReveal().reveal("#time", { duration: 1300, origin: "right", distance: "0.7em" });
	ScrollReveal().reveal("#logo", {
		duration: 1300,
		origin: "left",
		distance: "0.7em",
		interval: 500,
	});
	ScrollReveal().reveal("#music-box", {
		delay: 100,
		duration: 1300,
		origin: "bottom",
		distance: "0.7em",
		interval: 500,
	});
});

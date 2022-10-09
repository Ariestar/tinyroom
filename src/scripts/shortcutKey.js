import { playOrPause, changeSong } from "./music.js";
import {changePage} from "./scroll.js";

window.onkeydown = e => {
	e = e || window.event;
	// console.log(e)
	switch (e.key) {
		case "m":
			playOrPause();
			break;
		case "ArrowDown":
			changePage("pre");
			break;
		case "ArrowUp":
			changePage('fol')
			break;
		case "[":
			changeSong(0);
			break;
		case "]":
			changeSong(1);
			break;
	}
};

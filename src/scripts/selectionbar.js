import { nightMode, dayMode } from "./background.js";

// music-autoplay
$("#ma").change(function () {
	let newStatus = $(this).is(":checked");
	Cookies.set("musicAutoplay", newStatus);
});

// day or night mode
$("#dn").change(function () {
	let newStatus = $(this).is(":checked");
	if (newStatus) {
		nightMode();
	} else {
		dayMode();
	}
});

// ink-mode
$("#bw").change(function () {});

let lock = false,
	$selbar = $("#selectionbar");
$selbar.hover(
	function () {
		if (!lock) {
			lock = true; // set a lock
			$selbar.removeClass("hide");
			$selbar.addClass("show");
		}
	},
	function () {
		if (lock) {
			setTimeout(() => {
				$selbar.addClass("hide");
				$selbar.removeClass("show");
				lock = false;
			}, 1000);
		}
	}
);

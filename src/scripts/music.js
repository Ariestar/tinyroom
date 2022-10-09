import { music } from "./data.js";
import { getCookie, setCookie, clearCookie } from "./tools.js";

// play&pause
let $music = $("audio#music")[0],
	$ma = $("#ma"),
	$icon = $("#music-icon"),
	// timeline = gsap.timeline({
	// 	defaults: {
	// 		duration: 1,
	// 		autoAlpha: 0,
	// 		scale: 2,
	// 		ease: "power1.out",
	// 		rotate: Math.random() + "turn",
	// 		translate: "50%",
	// 	},
	// 	repeat: -1,
	// 	repeatRefresh: true,
	// }),
	list = [],
	index = 0;

(function init() {
	for (let i = 0; i < music.musicCount; i++) {
		list[i] = i;
	}
	list.sort(function () {
		return 0.5 - Math.random();
	});
	changeSong(1);

	//autoplay
	let isAutoplay = getCookie("musicAutoplay") === "true";
	if (isAutoplay) {
		$ma.prop("checked", true);
		$icon.addClass("running");
		$music.play();
		musicNotes(1);
	} else {
		$icon.addClass("paused");
	}
})();

$($music).on("ended", function () {
	changeSong(1);
	$music.play();
});
$icon.click(playOrPause);

function playOrPause() {
	$music = $("audio#music")[0];
	$icon = $("#music-icon");
	$icon.hasClass("running") ? stop() : start();

	function start() {
		$icon.removeClass("paused");
		$icon.addClass("running");
		$music.play();
		musicNotes(true);
		console.log("music played");
	}
	function stop() {
		$icon.removeClass("running");
		$icon.addClass("paused");
		$music.pause();
		musicNotes(false);
		console.log("music paused");
	}
}

// function musicNotes(flag) {
// 	if (flag) {
// 		timeline.staggerFromTo(
// 			[".icon-yinfu", ".icon-yinfu1", ".icon-yinfu2"],
// 			1.5,
// 			{
// 				autoAlpha: 1,
// 				scale: 0,
// 				x: 0,
// 				y: 0,
// 			},
// 			{},
// 			0.7
// 		);
// 		timeline.restart(0);
// 	} else {
// 		timeline.seek(0);
// 		timeline.pause();
// 	}
// }

function changeSong(operation = 1) {
	operation ? nextSong() : prevSong();
	async function nextSong() {
		index = index >= music.musicCount ? (index = 0) : ++index;
		$music.src = await getMusic(music.musicId[list[index]]);
	}
	async function prevSong() {
		index = index >= musicmusicCount ? (index = musicmusicCount) : --index;
		$music.src = await getMusic(musicmusicId[list[index]]);
	}
}

async function getMusic(id) {
	let res = await $.getJSON("https://api.muxiaoguo.cn/api/163music?id=" + id);
	console.log(res);
	return res.mp3url;
}

export { playOrPause, changeSong };

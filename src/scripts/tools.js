function sleep(millisecond) {
	var startTime = new Date().getTime();
	while (new Date().getTime() - startTime <= millisecond) {}
}

function addWheel(window, document) {
	var prefix = "",
		_addEventListener,
		onwheel,
		support;
	// detect event model
	if (window.addEventListener) {
		_addEventListener = "addEventListener";
	} else {
		_addEventListener = "attachEvent";
		prefix = "on";
	}

	// detect available wheel event
	support =
		"onwheel" in document.createElement("div")
			? "wheel" // 各个厂商的高版本浏览器都支持"wheel"
			: document.onmousewheel !== undefined
			? "mousewheel" // Webkit 和 IE一定支持"mousewheel"
			: "DOMMouseScroll"; // 低版本firefox

	window.addWheelListener = function (elem, callback, useCapture) {
		_addWheelListener(elem, support, callback, useCapture);

		// handle MozMousePixelScroll in older Firefox
		if (support == "DOMMouseScroll") {
			_addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
		}
	};

	function _addWheelListener(elem, eventName, callback, useCapture) {
		elem[_addEventListener](
			prefix + eventName,
			support == "wheel"
				? callback
				: function (originalEvent) {
						!originalEvent && (originalEvent = window.event);

						// create a normalized event object
						var event = {
							// keep a ref to the original event object
							originalEvent: originalEvent,
							target: originalEvent.target || originalEvent.srcElement,
							type: "wheel",
							deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
							deltaX: 0,
							deltaZ: 0,
							preventDefault: function () {
								originalEvent.preventDefault
									? originalEvent.preventDefault()
									: (originalEvent.returnValue = false);
							},
						};

						// calculate deltaY (and deltaX) according to the event
						if (support == "mousewheel") {
							event.deltaY = (-1 / 40) * originalEvent.wheelDelta;
							// Webkit also support wheelDeltaX
							originalEvent.wheelDeltaX &&
								(event.deltaX = (-1 / 40) * originalEvent.wheelDeltaX);
						} else {
							event.deltaY = originalEvent.detail;
						}
						// it's time to fire the callback
						return callback(event);
				  },
			useCapture || false
		);
	}
}

function stopDefault(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}

export function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if (script.readyState) {
		script.onreadstatechange = function () {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				callback();
			}
		};
	} else {
		script.onload = function () {
			callback();
		};
	}
	script.src = url; // load javascript
	document.head.appendChild(script);
}

let saveFile = function (data, filename) {
	let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a"); //img表示生成img元素或a元素或则可以放图片地址的元素

	save_link.href = data; //img  元素中图片引入用src，a元素中图片的引入用href等等
	save_link.download = filename; // 下载的名称
	var event = document.createEvent("MouseEvents"); //创建event事件
	console.log(event);
	//initMouseEvent 方法用于初始化通过 DocumentEvent 接口创建的 MouseEvent 的值, 详见下文：
	event.initMouseEvent(
		"click",
		true,
		false,
		window,
		0,
		0,
		0,
		0,
		0,
		false,
		false,
		false,
		false,
		0,
		null
	);
	save_link.dispatchEvent(event);

	console.log(save_link); // <a href=data:image/jpeg:base64.....></a>
};

function random() {
	return arguments[Math.floor(Math.random() * arguments.length)];
}

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
// MIT license
if (!Date.now)
	Date.now = function () {
		return new Date().getTime();
	};
(function () {
	"use strict";
	var vendors = ["webkit", "moz"];
	for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
		var vp = vendors[i];
		window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
		window.cancelAnimationFrame =
			window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
	}
	if (
		/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
		!window.requestAnimationFrame ||
		!window.cancelAnimationFrame
	) {
		var lastTime = 0;
		window.requestAnimationFrame = function (callback) {
			var now = Date.now();
			var nextTime = Math.max(lastTime + 16, now);
			return setTimeout(function () {
				callback((lastTime = nextTime));
			}, nextTime - now);
		};
		window.cancelAnimationFrame = clearTimeout;
	}
})();

function getPixelRatio(context) {
	var backingStore =
		context.backingStorePixelRatio ||
		context.webkitBackingStorePixelRatio ||
		context.mozBackingStorePixelRatio ||
		context.msBackingStorePixelRatio ||
		context.oBackingStorePixelRatio ||
		context.backingStorePixelRatio ||
		1;
	return (window.devicePixelRatio || 1) / backingStore;
}

export { addWheel, getPixelRatio };

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";"); // 把cookie分割成组
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i]; // 取得字符串
		while (c.charAt(0) == " ") {
			// 判断一下字符串有没有前导空格
			c = c.substring(1, c.length); // 有的话，从第二位开始取
		}
		if (c.indexOf(nameEQ) == 0) {
			// 如果含有我们要的name
			return unescape(c.substring(nameEQ.length, c.length)); // 解码并截取我们要值
		}
	}
	return false;
}

// 清除cookie
function clearCookie(name) {
	setCookie(name, "", -1);
}

// 设置cookie
function setCookie(name, value, seconds) {
	seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
	var expires = "";
	if (seconds != 0) {
		//设置cookie生存时间
		var date = new Date();
		date.setTime(date.getTime() + seconds * 1000);
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值
}

export { getCookie, setCookie, clearCookie };

/**
 * @desc 函数防抖
 * @param func (function) 函数
 * @param wait (number) 延迟执行毫秒数
 * @param immediate (boolean) true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this;
		var args = arguments;
		if (timeout) clearTimeout(timeout);
		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(function () {
				timeout = null;
			}, wait);
			if (callNow) func.apply(context, args);
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args);
			}, wait);
		}
	};
}

export function throttle(func, wait, options) {
	var timeout, context, args, result;
	var previous = 0;
	if (!options) options = {};

	var later = function () {
		previous = options.leading === false ? 0 : _.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null; //显示地释放内存，防止内存泄漏
	};

	var throttled = function () {
		var now = _.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};

	throttled.cancel = function () {
		clearTimeout(timeout);
		previous = 0;
		timeout = context = args = null;
	};

	return throttled;
}

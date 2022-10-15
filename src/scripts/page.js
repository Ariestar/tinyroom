// porject page
import { project } from "./data.js";
const page = document.querySelector("#pages .project .wrapper");
const names = project.name;
const projectNum = project.count;
const itemList = [];
let pageIndex = 1;
const itemsNumInEveryPage = 4;
for (let i = 1; i <= 4; i++) {
	const readMore = document.createElement("div");
	readMore.classList.add("readmore");
	readMore.textContent = "read more";

	let item = document.createElement("a");
	const title = document.createElement("span");
	item.appendChild(title);

	itemList.push(item);
	setInfo(item, i);
	item.classList.add("item");
	page.appendChild(item);
	console.log(item.childNodes);
	item.append(readMore);
	item.addEventListener("click", e => {
		e.preventDefault();
		e.stopPropagation();
		window.open(item.href, "_blank", "location=no");
	});
}

const nextPage = document.querySelector("#pages .project .next-page");
const prevPage = document.querySelector("#pages .project .prev-page");
nextPage.addEventListener("click", e => {
	if (pageIndex * itemsNumInEveryPage <= projectNum) {
		pageIndex++;
		handle();
	}
});
prevPage.addEventListener("click", () => {
	if (pageIndex > 1) {
		pageIndex--;
		handle();
	}
});
function handle() {
	itemList.forEach((item, i) => {
		let item_index = (pageIndex - 1) * itemsNumInEveryPage + i + 1;
		if (item_index <= projectNum) {
			setInfo(item, item_index);
			item.style.visibility === "hidden" ? (item.style.visibility = "visible") : item;
		} else {
			item.href = "";
			item.children[0].textContent = "";
			item.style.visibility = "hidden";
			// const blank = document.createTextNode("");
			// item.replaceChild(blank, item.childNodes[0]);
		}
	});
}
document.addEventListener("keydown", e => {
	if (e.key === "ArrowRight") {
		if (pageIndex * itemsNumInEveryPage <= projectNum) {
			pageIndex++;
			handle();
		}
	} else if (e.key === "ArrowLeft") {
		if (pageIndex > 1) {
			pageIndex--;
			handle();
		}
	}
});

function setInfo(item, index) {
	item.href = `src/scripts/programs/${index}/${names[index - 1]}.html`;
	item.children[0].textContent = names[index - 1];
	console.log(item.childNodes[0]);
}
// gallery

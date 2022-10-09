/** @type {HTMLCanvasElement} */
import {getPixelRatio} from '../../tools.js'
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const $control = document.getElementById("control");
const image = new Image();
image.src = "image.png";

window.requestAnimationFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

class Cell {
    constructor(x, y, symbal, color) {
        this.x = x;
        this.y = y;
        this.symbal = symbal;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbal, this.x, this.y, 10);
    }
}

class AsciiEffect {
    #imageCellArray = [];
    #pixels = [];
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(image, 0, 0);
        this.#pixels = this.#ctx.getImageData(
            0,
            0,
            this.#width,
            this.#height
        ).data;
    }
    #convertToSymbal(c) {
        var symbal = "";

        if (c > 250) symbal = ".";
        else if (c > 235) symbal = "~";
        else if (c > 220) symbal = "=";
        else if (c > 205) symbal = "-";
        else if (c > 190) symbal = "+";
        else if (c > 175) symbal = "^";
        else if (c > 160) symbal = "`";
        else if (c > 145) symbal = "*";
        else if (c > 130) symbal = "S";
        else if (c > 115) symbal = "G";
        else if (c > 100) symbal = "O";
        else if (c > 85) symbal = "%";
        else if (c > 70) symbal = "$";
        else if (c > 55) symbal = "A";
        else if (c > 40) symbal = "R";
        else if (c > 25) symbal = "#";
        else if (c > 10) symbal = "@";
        else symbal = "W";

        return symbal;
    }
    #scanImage(cellSize) {
        this.#imageCellArray = [];
        for (let y = 0; y < this.#height; y += cellSize) {
            for (let x = 0; x < this.#width; x += cellSize) {
                const posX = x * 4;
                const posY = y * 4;
                const pos = posY * this.#width + posX;

                if (this.#pixels[pos + 3] > 128) {
                    const r = this.#pixels[pos];
                    const g = this.#pixels[pos + 1];
                    const b = this.#pixels[pos + 2];
                    const average = (r + g + b) / 3;
                    const color = "rgb(" + r + "," + g + "," + b + ")";
                    const symbal = this.#convertToSymbal(average);
                    if (r + g + b < 400) {
                        this.#imageCellArray.push(
                            new Cell(x, y, symbal, color)
                        );
                    }
                }
            }
        }
    }
    #drawAscii() {
        this.#ctx.fillStyle = 'white'
        this.#ctx.fillRect(0, 0, this.#width, this.#height);
        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx);
        }
    }
    draw(cellSize) {
        this.#scanImage(cellSize);
        this.#drawAscii();
    }
}

image.onload = function initialize() {
    const ratio = getPixelRatio(ctx);
    const width = image.width * 4
    const height = image.height * 4 

    canvas.style.width = width /ratio + "px";
    canvas.style.height = height/ratio+ "px";
    canvas.width = width
    canvas.height = height
    ctx.scale(ratio, ratio);
    ctx.imageSmoothingEnabled = true;
    var effect = new AsciiEffect(ctx, width, height);
    var cellSize = 5;

    ctx.font = cellSize + "px Cascadia";
    effect.draw(cellSize);
};

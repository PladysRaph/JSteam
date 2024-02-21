import PlayerView from "./view/PlayerView";

const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

let playerView = new PlayerView();
playerView.render();

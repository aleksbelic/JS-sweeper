var board = {
	size : {
		width: 10,
		height: 10
	}
};

function generateBoard(width = board.size.width, height = board.size.height) {
	let boardContainer = document.getElementById("js-sweeper");
	for (i = 0; i < height; i++) {
		let boardRow = document.createElement('div');
		boardRow.className = "row";
		boardContainer.appendChild(boardRow);
		for (j = 0; j < width; j++) {
			let cell = document.createElement('div');
			cell.className = "cell";
			let cellText = document.createTextNode("X");
			cell.appendChild(cellText);
			boardRow.appendChild(cell);
		}
	}
}

// default board
var board = {
	size : {
		width: 10,
		height: 10
	},
	mineCount: 10,
};

function generateBoard(boardWidth = board.size.width, boardHeight = board.size.height, mineCount = board.mineCount) {

	// validate params
	let params = [boardWidth, boardHeight, mineCount]; 
	for (i = 0; i < params.length; i++) {
		if (!Number.isInteger(params[i])) {
			throw 'ERROR: Parameter "' + params[i] + '\" in function "generateBoard" needs to be an integer.';
		}
	}

	if (mineCount > boardHeight * boardWidth) {
		console.log('Too many mines for such a small board (max is ' + (boardWidth * boardHeight) + ').');
		return false;
	}

	board.size.width = boardWidth;
	board.size.height = boardHeight;
	board.mineCount = mineCount;

	let boardContainer = document.getElementById('js-sweeper');
	for (i = 0; i < boardHeight; i++) {
		let boardRow = document.createElement('div');
		boardRow.className = 'row';
		boardContainer.appendChild(boardRow);
		for (j = 0; j < boardWidth; j++) {
			let cell = document.createElement('div');
			cell.className = 'cell';
			let cellText = document.createTextNode('X');
			cell.appendChild(cellText);
			boardRow.appendChild(cell);
		}
	}
}

function randomizeMines() {
	for (i = 0; i < board.mineCount; i++) {
		// Math.floor(Math.random() * Math.floor(max));
	}
	
}

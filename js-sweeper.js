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
	for (let i = 0; i < params.length; i++) {
		if (!Number.isInteger(params[i])) {
			throw 'ERROR: Parameter "' + params[i] + '\" in function "generateBoard" needs to be an integer.';
		}
	}

	if (mineCount > boardHeight * boardWidth) {
		throw 'ERROR: Can\'t place ' + mineCount + ' mines on board with ' + (boardWidth * boardHeight) + ' fields (use less mines or make your board bigger).';
	}

	board.size.width = boardWidth;
	board.size.height = boardHeight;
	board.mineCount = mineCount;

	let boardContainer = document.getElementById('js-sweeper');
	for (let i = 0; i < boardHeight; i++) {
		let boardRow = document.createElement('div');
		boardRow.className = 'row';
		boardContainer.appendChild(boardRow);
		for (let j = 0; j < boardWidth; j++) {
			let cell = document.createElement('div');
			cell.className = 'cell';
			boardRow.appendChild(cell);
		}
	}

	randomizeMines();
}

function randomizeMines() {
	let mineFieldsIndexes = getNUniqueRandomNumbers(0, (board.size.width * board.size.height - 1), board.mineCount);
	// console.log(mineFieldsIndexes);
	for (let i = 0; i < mineFieldsIndexes.length; i++) {
		let mineField = document.getElementsByClassName('cell')[mineFieldsIndexes[i]];
		mineField.setAttribute('data-mine', 'true');
		mineField.innerHTML = 'O';
	}
}

function getNUniqueRandomNumbers(min, max, n) {
	let uniqueNumbers = [];
	for (let i = min; i <= max; i++) { 
		uniqueNumbers.push(i);
	}
	let nUniqueRandomNumbers = [];
	for (let i = 0; i < n; i++) {
		let randomIndex = Math.floor((Math.random() * uniqueNumbers.length));
		nUniqueRandomNumbers.push(uniqueNumbers[randomIndex]);
		uniqueNumbers.splice(randomIndex, 1);
	}
	return nUniqueRandomNumbers;
}

/**
 * Board class.
 * @param {number} width        Board width.
 * @param {number} height       Board height.
 * @param {number} mineCount    Mine count on board.
 */
class Board {
    width: number = 10;
    height: number = 10;
    mineCount: number = 10;
    cells: Cell[] = [];

    constructor(width: number, height: number, mineCount: number ) {
        // TODO: validate params
        /*
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
        */

        this.width = width;
        this.height = height;
        this.mineCount = mineCount;
    }

    randomizeMines(): void {
        let mineFieldsIndexes = Helper.getNUniqueRandomNumbers(0, (this.width * this.height - 1), this.mineCount);
        for (let mineFieldIndex of mineFieldsIndexes) {
            this.cells[mineFieldIndex].mine = true;
        }

        // console.log(mineFieldsIndexes);
        /*
        for (let i = 0; i < mineFieldsIndexes.length; i++) {
            let mineField = document.getElementsByClassName('cell')[mineFieldsIndexes[i]];
            mineField.setAttribute('data-mine', 'true');
            mineField.innerHTML = 'O';
        }*/
    }
}

class Row {
    constructor() {
        // ---
    }
}

class Cell {
    mine: boolean;
    constructor() {
        // ---
    }
}

function generateBoard(width: number, height: number, mineCount: number) {
    let boardContainer = document.getElementById('js-sweeper');
    let board = new Board(width, height, mineCount);

	for (let i = 0; i < board.height; i++) {
        //let row = new Row();
		//let boardRow = document.createElement('div');
		//boardRow.className = 'row';
		//boardContainer.appendChild(boardRow);
		for (let j = 0; j < board.width; j++) {
            let cell = new Cell();
            board.cells.push(cell);
			//let boardCell = document.createElement('div');
			//boardCell.className = 'cell';
			//boardRow.appendChild(boardCell);
		}
	}
    board.randomizeMines();
    console.log(board);
}

class Helper {
    static getNUniqueRandomNumbers(min: number, max: number, n: number): number[] {
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
}

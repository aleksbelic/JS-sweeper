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
    cells: Cell[][] = [];

    /**
     * Board constructor.
     * @param width 
     * @param height 
     * @param mineCount 
     */
    constructor(width: number, height: number, mineCount: number) {
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

    /**
     * Randomizes positions of mines.
     */
    plantMines(): void {
        let mineFieldsIndexes = Helper.getNUniqueRandomNumbers(0, (this.width * this.height - 1), this.mineCount);
        // remove current mines
        this.removeMines();
        // plant new mines
        for (let mineFieldIndex of mineFieldsIndexes) {
            let boardRow:number = Math.floor(mineFieldIndex / this.width);
            let boardColumn:number = mineFieldIndex % this.width;
            this.cells[boardRow][boardColumn].mine = true;
        }
    }

    /**
     * Cleans the board of all mines.
     */
    removeMines(): void {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                this.cells[row][column].mine = false;
            }
        }
    }

    /**
     * Calculates hint for every cell without mine.
     */
    calculateHints(): void {
        // loop through all rows and columns
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {

                let currentCell: Cell = this.cells[i][j];
                if (!currentCell.mine) {
                    // loop through previous, current & next row relative to current cell
                    for (let rowChange of [-1, 0, 1]) {
                        // loop through previous, current & next cell relative to current cell
                        for (let columnChange of [-1, 0, 1]) {
                            if (this.cells[i + rowChange] != undefined &&
                                this.cells[i + rowChange][j + columnChange] != undefined &&
                                this.cells[i + rowChange][j + columnChange].mine) {
                                    currentCell.hint++;
                            }
                        }
                    }
                }  
            }
        }

    }

    /**
     * Deploys board to frontend by converting board object to HTML elements.
     */
    deploy(): void {
        let boardContainer = document.getElementById('js-sweeper');
        for (let i = 0; i < this.height; i++) {
            let boardRow = document.createElement('div');
            boardRow.className = 'row';
            boardContainer.appendChild(boardRow);
            for (let j = 0; j < this.width; j++) {
                let boardCell = document.createElement('div');
                boardCell.classList.add('cell');
                /*
                // use for hint testing
                if (this.cells[i][j].mine) {
                    boardCell.classList.add('mine');
                } else if (this.cells[i][j].hint) {
                    boardCell.innerHTML = '' + this.cells[i][j].hint;
                }
                */
                boardRow.appendChild(boardCell);

                // right click event listener
                boardCell.addEventListener('contextmenu', e => {
                    e.preventDefault();
                    if (!boardCell.classList.contains('flag')) {
                        boardCell.classList.add('flag');
                    } else {
                        boardCell.classList.remove('flag');
                    }
                });

            }
        }
    }
}

/**
 * Cell class.
 */
class Cell {
    mine: boolean = false;
    hint: number = 0;
}

/**
 * 
 */
function generateBoard(width: number, height: number, mineCount: number) {
    let board = new Board(width, height, mineCount);

    // adding rows, columns & cells
	for (let i = 0; i < board.height; i++) {
        board.cells.push([]);
		for (let j = 0; j < board.width; j++)
            board.cells[i].push(new Cell());
    }
    
    board.plantMines();     // randomize mines
    board.calculateHints(); // calculate hints
    board.deploy();
    console.log(board);
}

/**
 * Helper class.
 * Adding additional functionalities.
 */
class Helper {

    /**
     * Returns an array of n unique, random integers from range of numbers defined with upper and lower limit.
     * 
     * @param min   range lower limit
     * @param max   range upper limit
     * @param n     array count
     * @returns     array of n unique, random integers from range of numbers defined with upper and lower limit (max & min)
     * 
     * @example     getNUniqueRandomNumbers(1, 10, 2) returns [7, 4]
     * @example     getNUniqueRandomNumbers(-1, 1, 2) returns [0, -1]
     */
    static getNUniqueRandomNumbers(min: number, max: number, n: number): number[] {
        // param validation
        if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(n)) {
            throw new Error('Parameters "min", "max" and "n" must be integers.');
        } else if (min > max) {
            throw new Error('Parameter "min" can\'t be bigger than parameter "max".');
        } else if (n < 0) {
            throw new Error('Parameter "n" can\'t be negative number.');
        } else if (n > (Math.abs(max - min) + 1)) {
            throw new Error('You\'re requesting too many unique numbers: n mustn\'t be bigger than given range.');
        }

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

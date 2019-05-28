/**
 * Board class.
 * @param {number} width        Board width.
 * @param {number} height       Board height.
 * @param {number} mineCount    Mine count on board.
 */
var Board = /** @class */ (function () {
    function Board(width, height, mineCount) {
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
        this.width = 10;
        this.height = 10;
        this.mineCount = 10;
        this.cells = [];
        this.width = width;
        this.height = height;
        this.mineCount = mineCount;
    }
    Board.prototype.randomizeMines = function () {
        var mineFieldsIndexes = Helper.getNUniqueRandomNumbers(0, (this.width * this.height - 1), this.mineCount);
        for (var _i = 0, mineFieldsIndexes_1 = mineFieldsIndexes; _i < mineFieldsIndexes_1.length; _i++) {
            var mineFieldIndex = mineFieldsIndexes_1[_i];
            this.cells[mineFieldIndex].mine = true;
        }
        // console.log(mineFieldsIndexes);
        /*
        for (let i = 0; i < mineFieldsIndexes.length; i++) {
            let mineField = document.getElementsByClassName('cell')[mineFieldsIndexes[i]];
            mineField.setAttribute('data-mine', 'true');
            mineField.innerHTML = 'O';
        }*/
    };
    return Board;
}());
var Row = /** @class */ (function () {
    function Row() {
        // ---
    }
    return Row;
}());
var Cell = /** @class */ (function () {
    function Cell() {
        // ---
    }
    return Cell;
}());
function generateBoard(width, height, mineCount) {
    var boardContainer = document.getElementById('js-sweeper');
    var board = new Board(width, height, mineCount);
    for (var i = 0; i < board.height; i++) {
        //let row = new Row();
        //let boardRow = document.createElement('div');
        //boardRow.className = 'row';
        //boardContainer.appendChild(boardRow);
        for (var j = 0; j < board.width; j++) {
            var cell = new Cell();
            board.cells.push(cell);
            //let boardCell = document.createElement('div');
            //boardCell.className = 'cell';
            //boardRow.appendChild(boardCell);
        }
    }
    board.randomizeMines();
    console.log(board);
}
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.getNUniqueRandomNumbers = function (min, max, n) {
        var uniqueNumbers = [];
        for (var i = min; i <= max; i++) {
            uniqueNumbers.push(i);
        }
        var nUniqueRandomNumbers = [];
        for (var i = 0; i < n; i++) {
            var randomIndex = Math.floor((Math.random() * uniqueNumbers.length));
            nUniqueRandomNumbers.push(uniqueNumbers[randomIndex]);
            uniqueNumbers.splice(randomIndex, 1);
        }
        return nUniqueRandomNumbers;
    };
    return Helper;
}());

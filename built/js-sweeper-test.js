/**
 * Board class.
 * @param {number} width        Board width.
 * @param {number} height       Board height.
 * @param {number} mineCount    Mine count on board.
 */
var Board = /** @class */ (function () {
    function Board(width, height, mineCount) {
    }
    return Board;
}());
var Row = /** @class */ (function () {
    function Row() {
        // ---
    }
    Row.prototype.getTemplate = function () {
        return "";
    };
    return Row;
}());
var Cell = /** @class */ (function () {
    function Cell() {
        // ---
    }
    Cell.prototype.getTemplate = function () {
        return "";
    };
    return Cell;
}());

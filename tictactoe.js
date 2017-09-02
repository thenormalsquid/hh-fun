var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d');

function Board(ctx, rows, cols) {
    var board = [];
    this.draw = function (rows, cols) {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {

            }
        }
    }
}


// @param rows <number> rows of board
// @param cols <number> columns of board 
function initializeGame(rows, cols) {

}

function startGame(w, h) {
    var pieces = {
        'X': 0,
        'Y': 0
    };
    var currentPlayer = 1;
}
var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d');

function Board(ctx, rows, cols) {
    var board = [];
    this.draw = function () {
        for (var i = 0; i < rows; i++) {
            board[i] = [];
            for (var j = 0; j < cols; j++) {
                board[i].push('');
            }
        }
    }

    this.move = function () {

    }

    this.getBoardState = function () {
        return board;
    }
}

function play(ctx, row, col) {
    var currentPlayer = 1;
    var pieces = {
        'X': 0,
        'Y': 0
    };
    var board = new Board(ctx, row, col);
    board.draw();
}

function calculateTerminatingCondition(boardState) {
    // calculates the terminating condition based on the board state
    //  
    return {

    }
}

function swapPlayer(currentPlayer) {
    if (currentPlayer === 1) {
        return 2;
    }
    return 1;
}

startGame(ctx, 3, 3);
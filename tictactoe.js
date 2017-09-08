'use strict';
(function(){
    var canvas = document.getElementById('playArea'),
        ctx = canvas.getContext('2d'),
        size = 600; // set the canvas size

    canvas.height = size;
    canvas.width = size;

    function Cell(x, y) {

    }

    function Board(rows, cols) {
        this.board = [];
        this.rows = rows;
        this.cols = cols;
        // integer -1 represents empty space
        // 1, 2 represents occupied space by player 1 and 2
        // we'll use the sum of these to determine winning condition
        for(var i = 0; i < rows; i++) {
            this.board[i] = [];
            for(var j = 0; j < cols; j++) {
                this.board[i].push(-1);
            }
        }
    }

    Board.prototype.draw = function() {
        // draw the grid
        var length = size - 10;
        var lineWidth = 1;
        var horizontalLineSpace = Math.floor(size / this.rows); 
        var verticalLineSpace = Math.floor(size / this.cols);
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        // horizontal lines
        // TODO: map section bounds to the 2d array so we can play user piece in game board on click
        for(var i = 1; i < this.rows; i++) {
            // as we iterate through each line drawn, move y by lineSpace
            ctx.moveTo(10, i * horizontalLineSpace);
            ctx.lineTo(length, i * horizontalLineSpace);
        }

        // vertical lines
        for(var j = 1; j < this.cols; j++) {
            // as we iterate, space each line by x
            ctx.moveTo(j * verticalLineSpace, 10);
            ctx.lineTo(j * verticalLineSpace, length);
        }
        ctx.stroke();
    }

    Board.prototype.clear = function() {
    }

    Board.prototype.addPiece = function(player, point) {
        // refreshes the board and adds a player piece, using the player
        // instance  and x, y point object
    }

    Board.prototype.checkPlayerWin = function(sum) {
        // returns current player that won or null if no players won
        if(sum === 3) {
            // player 1 wins
            return 1;
        }

        if(sum === 6) {
            // player 2 wins
            return 2;
        }

        // nobody wins
        return 0;
    }

    Board.prototype.calculateEndCondition = function () {
        // returns object containing winning condition, winning player, or null if end condition not met
        // check rows
        var sumRow = 0,
            sumCol = 0,
            sumLeftDiag = 0,
            sumRightDiag = 0,
            emptySpaceCount = 0,
            playerWon;
        //  use the empty space count to determine if a draw occurs
        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                sum += this.board[i][j];
                if(this.board[i][j] === -1) {
                    emptySpaceCount += 1;
                }
                // compute diag sum
                if(i === j) {
                    sumRightDiag += this.board[i][j];
                }
            }
        }

        playerWon = this.checkPlayerWin(sum) || this.checkPlayerWin(sumRightDiag);
        if(playerWon !== 0) {
            // short circuit further checks
            // TODO: find a DRY-er way of doing this
            return { win: true, player: playerWon };
        }

        sum = 0;
        // check columns
        for(var i = 0; i < this.cols; i++) {
            for(var j = 0; j < this.rows; j++) {
                sum += this.board[row][col];
            }
        }

        playerWon = this.checkPlayerWin(sum);
        if(playerWon !== 0) {
            return {win: true, player: playerWon};
        }

        // check invert diagonal
        sum = 0;
        for(var i = 0; i < this.row; i++) { 
            for(var j = this.cols - 1; j >= 0; j--) {
                sum += this.board[i][j];
            }
        }
       
        playerWon = this.checkPlayerWin(sum);
        if(playerWon !== 0) {
            return {win: true, player: playerWon};
        }
    }

    function Player(name) {
        // name is either 'X' or 'O'
        this.name = name;
    }

    Player.prototype.drawX = function(coord) {
        // takes coord object and draw x,y at that position
        ctx.beginPath();
    }

    Player.prototype.drawO = function (x, y) {
        ctx.beginPath();
    }

    Player.prototype.draw = function(x, y) {
       // draw appropriate piece
       if(this.name === 'X') {
           this.drawX();
       }

       if(this.name === 'O') {
           this.drawO();
       }
    }

    function Game(row, cols) {
        this.state = {
            players: {
                1: new Player('X'),
                2: new Player('O')
            },
            currentPlayer: 1
        };
        this.board = new Board(row, cols);
    }

    Game.prototype.initialize = function() {
        // draw the board, set current player
        this.board.draw();
    }

    Game.prototype.swapPlayer = function() {
        var currPlayer = this.state.currentPlayer;
        if(currPlayer === 1) {
            this.state.currentPlayer = 2;
        } else {
            this.state.currentPlayer = 1;
        }
    }

    function normalizePosition(event) {
        // returns object containing coord of mouseclick 
        // {x: <Number>, y: <Number>}
    }

    var game = new Game(3, 3);
    game.initialize();
    canvas.addEventListener('mouseup', function(){

    });
})();
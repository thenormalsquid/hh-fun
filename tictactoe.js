'use strict';
(function(){
    var canvas = document.getElementById('playArea'),
        ctx = canvas.getContext('2d'),
        size = 600; // set the canvas size

    canvas.height = size;
    canvas.width = size;

    function Board(rows, cols) {
        this.board = [];
        this.rows = rows;
        tis.cols = cols;
        // integer 0 represents empty space
        // 1, 2 represents occupied space by player 1 and 2
        for(var i = 0; i < rows; i++) {
            this.board[i] = [];
            for(var j = 0; j < cols; j++) {
                this.board[i].push(0);
            }
        }
    }

    Board.prototype.draw = function() {
        // draw the grid

    }

    Board.prototype.clear = function() {
    }

    Board.prototype.addPiece = function(player) {
        // refreshes the board and adds a player piece, using the player
        // instance
    }

    Board.prototype.calculateEndCondition = function () {

    }

    function Player(name) {
        // name is either 'X' or 'O'
        this.name = name;
    }

    Player.prototype.drawX = function(x, y) {
        ctx.beginPath();
    }

    Player.prototype.drawO = function (x, y) {
        ctx.beginPath();
    }

    Player.ptototype.draw = function(x, y) {
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
                2: new Player('Y')
            },
            currentPlayer: 1
        };
        this.board = new Board(row, cols)
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
    canvas.addEventListener('mouseup', function(){

    });
})();
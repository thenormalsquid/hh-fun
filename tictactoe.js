'use strict';
(function () {
    var canvas = document.getElementById('playArea'),
        ctx = canvas.getContext('2d'),
        size = 600; // set the canvas size

    canvas.height = size;
    canvas.width = size;

    function Cell(x0, y0, x1, y1, i, j) {
        // used to determine which space a player piece should be added to
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;

        this.i = i;
        this.j = j;
    }

    Cell.prototype.clickInBounds = function (point) {
        // get current board space based on location of player piece
        return (
            point.x >= this.x0 && point.x <= this.x1 &&
            point.y >= this.y0 && point.y <= this.y1
        );
    }

    Cell.prototype.getIndices = function () {
        return [this.i, this.j];
    }

    function Board(n) {
        this.board = [];
        this.rows = n;
        this.cols = n;
        this.cells = [];

        this.validateMove = function (player, point) {
            // predicate function to determine if legal move (ie; in an empty spot)
            if (this.cells.length) {
                var cell = this.cells.find(function (c) {
                    return c.clickInBounds(point)
                });
                var indices = cell.getIndices();
                var isSpotOpen = this.board[indices[0]][indices[1]] === '';
                if (isSpotOpen) {
                    this.board[indices[0]][indices[1]] = player.name;
                    return true;
                }
            }
            return false;
        }
    }

    Board.prototype.draw = function () {
        // draw the grid
        var length = size - 10;
        var lineWidth = 1;
        var horizontalLineSpace = Math.floor(size / this.rows);
        var verticalLineSpace = Math.floor(size / this.cols);
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        // integer -1 represents empty space
        // 1, 5 represents occupied space by player 1 and 2
        // we'll use the sum of these to determine winning condition
        for (var i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.board[i].push('');
                // j for x, i for y
                var x0 = j * verticalLineSpace,
                    y0 = i * horizontalLineSpace,
                    x1 = x0 + verticalLineSpace,
                    y1 = y0 + verticalLineSpace;

                this.cells.push(new Cell(x0, y0, x1, y1, i, j));
            }
        }

        // horizontal lines
        for (var i = 1; i < this.rows; i++) {
            // as we iterate through each line drawn, move y by lineSpace
            ctx.moveTo(10, i * horizontalLineSpace);
            ctx.lineTo(length, i * horizontalLineSpace);
        }

        // vertical lines
        for (var j = 1; j < this.cols; j++) {
            // as we iterate, space each line by x
            ctx.moveTo(j * verticalLineSpace, 10);
            ctx.lineTo(j * verticalLineSpace, length);
        }
        ctx.stroke();
    }

    Board.prototype.clear = function () {}

    Board.prototype.addPiece = function (player, point) {
        // refreshes the board and adds a player piece, using the player
        // instance  and x, y point object
        // returns a bool to let the game function know to swap the player or not (true for yes, false for no) 
        var validMove = this.validateMove(player, point);
        if (validMove) {
            player.draw(point);
        }
        return validMove;
    }

    Board.prototype.checkPlayerWin = function (player, config) {
        // returns current player that won or null if no players won
        // assuming rows and cols always equal, so we'll just use rows.
        var winningConfig = player.name.repeat(this.rows);
        if (winningConfig === config) {
            return player.num;
        }

        // nobody wins
        return 0;
    }

    Board.prototype.calculateEndCondition = function (player) {
        // returns object containing winning condition, winning player, or null if end condition not met
        // check rows
        var sum = '',
            sumColumn = '',
            sumRightDiag = '',
            emptySpaceCount = 0,
            playerWon;
        //  use the empty space count to determine if a draw occurs
        for (var i = 0; i < this.rows; i++) {
            sum = '';
            sumColumn = '';
            for (var j = 0; j < this.cols; j++) {
                // sum rows
                sum += this.board[i][j];
                if (this.board[i][j] === '') {
                    emptySpaceCount += 1;
                }
                // compute diag sum
                if (i === j) {
                    sumRightDiag += this.board[i][j];
                }

                // sum cols
                sumColumn += this.board[j][i];
            }
            playerWon = this.checkPlayerWin(player, sum) || this.checkPlayerWin(player, sumRightDiag) || this.checkPlayerWin(player, sumColumn);

            if (playerWon !== 0) {
                // short circuit further checks
                // TODO: find a DRY-er way of doing this because this gets repeated
                return {
                    win: true,
                    player: playerWon
                };
            }
        }

        // check invert diagonal
        sum = '';
        var j = this.cols - 1;
        for (var i = 0; i < this.rows; i++) {
            sum += this.board[i][j];
            j -= 1;
        }
        playerWon = this.checkPlayerWin(player, sum);
        if (playerWon !== 0) {
            return {
                win: true,
                player: playerWon
            };
        }

        if (playerWon === 0 && emptySpaceCount === 0) {
            return {
                win: false,
                type: 'Draw'
            }
        }
        return null;
    }

    function Player(name, num) {
        // name is either 'X' or 'O'
        this.name = name;
        this.num = num;
        // private methods, use player.draw
        this.drawX = function (point) {
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            var offset = 60; //TODO: calculate actual offset and only allow in center

            ctx.moveTo(point.x - offset, point.y - offset);
            ctx.lineTo(point.x + offset, point.y + offset);
            ctx.stroke();

            ctx.moveTo(point.x + offset, point.y - offset);
            ctx.lineTo(point.x - offset, point.y + offset);
            ctx.stroke();
        }

        this.drawO = function (point) {
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            var offset = 60;
            ctx.arc(point.x, point.y, offset, 0, Math.PI * 2, true);
            ctx.stroke();
        }
    }


    Player.prototype.draw = function (point) {
        // draw appropriate piece
        if (this.name === 'X') {
            this.drawX(point);
        }

        if (this.name === 'O') {
            this.drawO(point);
        }
    }

    function Game(n) {
        this.state = {
            players: {
                1: new Player('X', 1),
                2: new Player('O', 2)
            },
            currentPlayer: 1
        };
        this.board = new Board(n);
    }

    Game.prototype.initialize = function () {
        // clear the board, draw the board, set current player
        this.board.draw();
        this.state.currentPlayer = 1;
    }

    Game.prototype.swapPlayer = function () {
        var currPlayer = this.state.currentPlayer;
        if (currPlayer === 1) {
            this.state.currentPlayer = 2;
        } else {
            this.state.currentPlayer = 1;
        }
    }

    Game.prototype.makeMove = function (point) {
        // add player to the board, calculate end condition
        var playerIndex = this.state.currentPlayer,
            currPlayer = this.state.players[playerIndex];
        var shouldSwapPlayer = this.board.addPiece(currPlayer, point);
        // calculate ending condition
        var endingCondition = this.board.calculateEndCondition(currPlayer);
        if (!endingCondition && shouldSwapPlayer) {
            this.swapPlayer();
        }

        if (endingCondition) {
            // end the game
        }
    }

    var game = new Game(3);
    game.initialize();

    canvas.addEventListener('mouseup', function (e) {
        var point = {
            x: event.clientX,
            y: event.clientY
        };
        game.makeMove(point);
    });
})();
// Object literal constructor

// Player name and scoreboard
const scoreBoard = (function () {
  const scoreBoard = {
    player: 'Chris',
    playerShape: 'O',
    computer: 'Computer',
    computerShape: 'X',
    wins: 0,
    losses: 0,
    ties: 0,
    turn: "Player's Turn",
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],

    init: function () {
      this.cacheDom()
      this.render()
      this.setUpEventListeners()
    },

    cacheDom: function () {
      this.scoreModule = document.getElementById('score-tracker-module')
      this.template = document.getElementById('scoreboard-template').innerHTML
      this.playerName = document.getElementById('player-name')
      this.computerName = document.getElementById('computer-name')
      this.score = document.getElementById('score-body')
      this.winPercent = document.getElementById('score-win-percent')
      this.turnOrder = document.getElementById('turn')
    },

    setUpEventListeners: function () {
      this.changeNameButton = document.getElementById('change-name')
      // console.log('Change Name Button:', this.changeNameButton)

      this.changeNameButton.addEventListener(
        'click',
        this.changeName.bind(this)
      )

      this.newGameButton = document.getElementById('new-game')

      this.newGameButton.addEventListener('click', this.resetBoard.bind(this))

      this.boardPieces = []
      this.clickHandler = this.handlePieceClick.bind(this)

      document
        .querySelectorAll('.board-piece')
        .forEach(function (piece, index) {
          this.boardPieces[index] = piece

          // Attach a click event listener to each board piece
          piece.addEventListener('click', this.clickHandler)
        }, this)
    },

    resetEventListeners: function () {
      // Remove existing event listeners
      this.changeNameButton.removeEventListener(
        'click',
        this.changeName.bind(this)
      )
      this.newGameButton.removeEventListener(
        'click',
        this.resetBoard.bind(this)
      )

      // Set up new event listeners

      this.changeNameButton = document.getElementById('change-name')

      this.changeNameButton.addEventListener(
        'click',
        this.changeName.bind(this)
      )

      this.newGameButton = document.getElementById('new-game')

      this.newGameButton.addEventListener('click', this.resetBoard.bind(this))
    },

    changeName: function () {
      const newName = prompt('What is your name?') || 'Anonymous'
      this.player = newName
      this.render()
      this.resetEventListeners()
    },

    playerChoice: function (index) {
      // console.log('Player chose piece', index)

      // Get the index of the piece
      const chosenPiece = this.boardPieces[index]

      // Make a new picture element
      const redCircle = document.createElement('img')
      redCircle.setAttribute('width', '150px')
      redCircle.setAttribute('height', '150px')
      redCircle.setAttribute('src', './images/red-circle.svg')
      redCircle.setAttribute('alt', 'Red Circle')
      redCircle.setAttribute('role', 'presentation')
      redCircle.setAttribute('aria-hidden', 'true')

      // Append to the board piece
      chosenPiece.appendChild(redCircle)

      // Remove the click event listener from the chosen board piece
      chosenPiece.removeEventListener('click', this.clickHandler)

      // Add a class to the chosen board piece to disable hover
      chosenPiece.classList.add('disable-hover')

      // Update the board
      this.updateBoard(index, this.playerShape)

      // Check for winner
      this.checkWinner()
    },

    updateBoard: function (index, shape) {
      // Update the internal board representation
      const row = Math.floor(index / 3)
      const col = index % 3
      this.board[row][col] = shape
      // console.log(this.board)
    },

    checkWinner: function (board) {
      for (let i = 0; i < 3; i++) {
        // Check rows
        if (
          this.board[i][0] === 'O' &&
          this.board[i][0] === this.board[i][1] &&
          this.board[i][1] === this.board[i][2]
        ) {
          console.log(`${this.player} wins in row ${i}.`)
          this.wins++
          this.freezeBoard()
          this.playerWinMessage(`${this.player} wins!`)
          this.render()
          return this.resetEventListeners()
        }

        // Check columns
        if (
          this.board[0][i] === 'O' &&
          this.board[0][i] === this.board[1][i] &&
          this.board[1][i] === this.board[2][i]
        ) {
          console.log(`${this.player} wins in column ${i}.`)
          this.wins++
          this.freezeBoard()
          this.playerWinMessage(`${this.player} wins!`)
          this.render()
          return this.resetEventListeners()
        }

        // Check diagonals
        if (
          this.board[0][0] === 'O' &&
          this.board[0][0] === this.board[1][1] &&
          this.board[1][1] === this.board[2][2]
        ) {
          console.log(`${this.player} wins with the main diagonal!`)
          this.wins++
          this.freezeBoard()
          this.playerWinMessage(`${this.player} wins!`)
          this.render()
          return this.resetEventListeners()
        }

        if (
          this.board[0][2] === 'O' &&
          this.board[0][2] === this.board[1][1] &&
          this.board[1][1] === this.board[2][0]
        ) {
          console.log(`${this.player} wins with the reverse diagonal!`)
          this.wins++
          this.freezeBoard()
          this.playerWinMessage(`${this.player} wins!`)
          this.render()
          return this.resetEventListeners()
        }
      }

      // Check for a Tie
      if (this.isBoardFull()) {
        console.log(`Tie, all pieces filled.`)
        this.ties++
        this.freezeBoard()
        this.tieMessage("It's a tie!")
        this.render()
        return this.resetEventListeners()
      }

      // No winner yet, proceed with computer's turn
      this.computerChoice()
    },

    computerCheckWinner: function (board) {
      for (let i = 0; i < 3; i++) {
        // Check rows
        if (
          this.board[i][0] === 'X' &&
          this.board[i][0] === this.board[i][1] &&
          this.board[i][1] === this.board[i][2]
        ) {
          console.log(`Computer wins in row ${i}.`)
          this.losses++
          this.freezeBoard()
          this.computerWinsMessage('The computer wins!')
          this.render()
          return this.resetEventListeners()
        }

        // Check columns
        if (
          this.board[0][i] === 'X' &&
          this.board[0][i] === this.board[1][i] &&
          this.board[1][i] === this.board[2][i]
        ) {
          console.log(`Computer wins in column ${i}.`)
          this.losses++
          this.freezeBoard()
          this.computerWinsMessage('The computer wins!')
          this.render()
          return this.resetEventListeners()
        }

        // Check diagonals
        if (
          this.board[0][0] === 'X' &&
          this.board[0][0] === this.board[1][1] &&
          this.board[1][1] === this.board[2][2]
        ) {
          console.log(`Computer wins with the main diagonal.`)
          this.losses++
          this.freezeBoard()
          this.computerWinsMessage('The computer wins!')
          this.render()
          return this.resetEventListeners()
        }

        if (
          this.board[0][2] === 'X' &&
          this.board[0][2] === this.board[1][1] &&
          this.board[1][1] === this.board[2][0]
        ) {
          console.log(`Computer wins with the anti-diagonal.`)
          this.losses++
          this.freezeBoard()
          this.computerWinsMessage('The computer wins!')
          this.render()
          return this.resetEventListeners()
        }
      }
      return null
    },

    playerWinMessage: function (message) {
      this.turn = message
    },

    tieMessage: function (message) {
      this.turn = message
    },

    computerWinsMessage: function (message) {
      this.turn = message
    },

    isBoardFull: function (board) {
      // Check if the board is full
      for (let row of this.board) {
        for (let cell of row) {
          if (cell === '') {
            return false // There is an empty cell, so the board is not full
          }
        }
      }
      return true // All cells are filled, indicating a tie
    },

    freezeBoard: function () {
      const clickHandlerBound = this.clickHandler.bind(this)

      this.boardPieces.forEach(function (piece) {
        piece.removeEventListener('click', this.clickHandlerBound)
        piece.classList.add('disable-hover')
      }, this)
    },

    computerChoice: function () {
      // Get the index of the piece
      const chosenPieceIndices = this.randomSelector()

      // Make a new picture element
      const blueX = document.createElement('img')
      blueX.setAttribute('width', '150px')
      blueX.setAttribute('height', '150px')
      blueX.setAttribute('src', './images/blue-x.svg')
      blueX.setAttribute('alt', 'Blue X')
      blueX.setAttribute('role', 'presentation')
      blueX.setAttribute('aria-hidden', 'true')

      // Append to the board piece
      const chosenPiece =
        this.boardPieces[chosenPieceIndices.row * 3 + chosenPieceIndices.col]
      chosenPiece.appendChild(blueX)

      // console.log(
      //   `Computer chose row ${chosenPieceIndices.row} and column ${chosenPieceIndices.col}.`
      // )

      // Remove the click event listener from the chosen board piece
      chosenPiece.removeEventListener('click', this.clickHandler)

      // Add a class to the chosen board piece to disable hover
      chosenPiece.classList.add('disable-hover')

      // Update the board
      this.updateBoard(
        chosenPieceIndices.row * 3 + chosenPieceIndices.col,
        this.computerShape
      )

      // Check for winner
      this.computerCheckWinner()
    },

    randomSelector: function () {
      const emptyCells = []

      // Find all empty cells on the board
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === '') {
            emptyCells.push({ row: i, col: j })
          }
        }
      }

      // Check if there are any empty cells
      if (emptyCells.length === 0) {
        return null // No empty cells, the board is full
      }

      // Randomly select an empty cell
      const randomIndex = Math.floor(Math.random() * emptyCells.length)
      return emptyCells[randomIndex]

      // Randomly select a board piece
    },

    handlePieceClick: function (event) {
      // This function handles the click event and finds the index
      // of the clicked piece, then calls playerChoice
      const index = this.boardPieces.indexOf(event.currentTarget)
      this.playerChoice(index)
    },

    getBoardPieces: function () {
      return null
      // return console.log(this.boardPieces)
    },

    resetBoard: function () {
      // Clear the board array
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]

      // Remove images from board pieces
      this.boardPieces.forEach(function (piece) {
        piece.innerHTML = ''
        piece.classList.remove('disable-hover')
        piece.addEventListener('click', this.clickHandler)
      }, this)

      // Reset turn message
      this.turn = "Player's Turn"

      // Render the updated board
      this.render()
      this.resetEventListeners()
    },

    render: function () {
      const totalGames = this.wins + this.losses + this.ties

      const winPercent =
        totalGames === 0
          ? '0%'
          : ((this.wins / totalGames) * 100).toFixed(2) + '%'

      const data = {
        player: this.player,
        computer: this.computer,
        wins: this.wins,
        losses: this.losses,
        ties: this.ties,
        winPercent: winPercent,
        turn: this.turn
      }

      // console.log('Rendering...')
      // console.log('Template:', this.template)
      // console.log('Data:', data)

      this.scoreModule.innerHTML = Mustache.render(this.template, data)
    }
  }

  scoreBoard.init()

  return {
    changeName: function () {
      scoreBoard.changeName()
    },
    playerChoice: function (index) {
      scoreBoard.playerChoice(index)
    },
    resetBoard: function () {
      scoreBoard.resetBoard()
    }
  }
})()

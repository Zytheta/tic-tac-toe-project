// Object literal constructor

// Player name and scoreboard
;(function () {
  const scoreBoard = {
    player: 'Chris',
    playerShape: 'X',
    computerName: 'Computer',
    computerShape: 'O',
    wins: 0,
    losses: 0,
    winPercent: 0,

    init: function () {
      this.cacheDom()
      this.render()
      this.setUpEventListeners()
    },

    cacheDom: function () {
      this.scoreModule = document.getElementById('score-tracker-module')
      this.template = document.getElementById('scoreboard-template').innerHTML
      this.playerName = document.getElementById('player-name')
      this.score = document.getElementById('score-body')
      this.winPercent = document.getElementById('score-win-percent')
    },

    setUpEventListeners: function () {
      // console.log('Setting up event listeners...')

      this.changeNameButton = document.getElementById('change-name')
      // console.log('Change Name Button:', this.changeNameButton)

      this.changeNameButton.addEventListener(
        'click',
        this.changeName.bind(this)
      )

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

    changeName: function () {
      const newName = prompt('What is your name?') || 'Anonymous'
      this.player = newName
      this.render()
      this.setUpEventListeners()
    },

    playerChoice: function (index) {
      console.log('Player chose piece', index)

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

      // Remove board piece from being picked again
      this.boardPieces.splice(index, 1)

      // Check
      this.getBoardPieces()
    },

    handlePieceClick: function (event) {
      // This function handles the click event and finds the index
      // of the clicked piece, then calls playerChoice
      const index = this.boardPieces.indexOf(event.currentTarget)
      this.playerChoice(index)
    },

    getBoardPieces: function () {
      return console.log(this.boardPieces)
    },

    render: function () {
      const data = {
        player: this.player,
        wins: this.wins,
        losses: this.losses,
        winPercent: this.winPercent
      }

      // console.log('Rendering...')
      // console.log('Template:', this.template)
      // console.log('Data:', data)

      this.scoreModule.innerHTML = Mustache.render(this.template, data)
    }
  }

  scoreBoard.init()
})()

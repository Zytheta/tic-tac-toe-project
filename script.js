// Object literal constructor

;(function () {
  const ticTacToe = {
    player: 'Chris',
    playershape: 'X',
    computerName: 'Computer',
    computerShape: 'O',

    init: function () {
      this.cacheDom()
      this.setUpEventListeners()
      this.getName()
    },

    cacheDom: function () {
      this.playerName = document.getElementById('player-name')
      this.newGameButton = document.getElementById('new-game')
      this.changeNameButton = document.getElementById('change-name')
    },

    setUpEventListeners: function () {
      // this.newGameButton.addEventListener('click', this.newGame.bind(this))
      this.changeNameButton.addEventListener(
        'click',
        this.changeName.bind(this)
      )
    },

    getName: function () {
      this.playerName.textContent = `Player: ${this.player}`
    },

    changeName: function () {
      const newName = prompt('What is your name?') || 'Anonymous'
      this.player = newName
      this.getName()
    }

    // render: function () {
    // },
  }

  ticTacToe.init()
})()

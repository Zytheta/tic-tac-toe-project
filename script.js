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
      console.log('Setting up event listeners...')

      this.changeNameButton = document.getElementById('change-name')
      console.log('Change Name Button:', this.changeNameButton)

      this.changeNameButton.addEventListener(
        'click',
        this.changeName.bind(this)
      )
    },

    changeName: function () {
      const newName = prompt('What is your name?') || 'Anonymous'
      this.player = newName
      this.render()
      this.setUpEventListeners()
    },

    render: function () {
      const data = {
        player: this.player,
        wins: this.wins,
        losses: this.losses,
        winPercent: this.winPercent
      }

      console.log('Rendering...')
      console.log('Template:', this.template)
      console.log('Data:', data)

      this.scoreModule.innerHTML = Mustache.render(this.template, data)
    }
  }

  scoreBoard.init()
})()

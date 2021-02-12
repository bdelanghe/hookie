const { Server, FlatFile } = require('boardgame.io/server')
const { Hookie } = require('./Game')
const fs = require('fs')

const lobbyConfig = {
  apiPort: 8080,
  apiCallback: () => console.log('Running Lobby API on port 8080...')
}

const server = Server({
  games: [Hookie],

  // https: {
  //     cert: fs.readFileSync('/path/to/cert'),
  //     key: fs.readFileSync('/path/to/key'),
  // },

  db: new FlatFile({
    dir: './storage',
    logging: true
  })
})

server.run({ port: 8000, lobbyConfig })

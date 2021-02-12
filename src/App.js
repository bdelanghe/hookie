import { Client } from 'boardgame.io/react'
import { Local, SocketIO } from 'boardgame.io/multiplayer'

import { Hookie } from './Game'
import { HookieBoard } from './Board'

require('dotenv').config()

const HookieClient = Client({
  game: Hookie,
  numPlayers: 1,
  multiplayer: Local({
    persist: true,
    storageKey: 'bgio'
  }),
  board: HookieBoard
})

const App = () => (
  <div>
    <HookieClient playerID='0' />
  </div>
)

export default App

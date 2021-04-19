import { Client } from 'boardgame.io/react';
import { Hookie } from './Game';
import { HookieBoard } from './Board';

const HookieClient = Client({
  game: Hookie,
  numPlayers: 1,
  board: HookieBoard,
  debug: false
})

const App = () => (
  <div>
    <HookieClient playerID='0' />
  </div>
)

export default App
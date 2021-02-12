import { Lobby } from 'boardgame.io/react'
import { Hookie } from './Game'
import { HookieBoard } from './Board';
import { LobbyClient } from 'boardgame.io/dist/types/src/lobby/client'

<Lobby
  gameServer={`https://${window.location.hostname}:8000`}
  lobbyServer={`https://${window.location.hostname}:8000`}
  gameComponents={[
      { game: Hookie, board: HookieBoard }
    ]}
/>

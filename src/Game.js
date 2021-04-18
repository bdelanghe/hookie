import { INVALID_MOVE } from 'boardgame.io/core'

const wordList = require('./words.json')

export const letterValues = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
  BLANK: 0
}

export const letterCount = {
  a: 9,
  b: 2,
  c: 2,
  d: 4,
  e: 12,
  f: 2,
  g: 3,
  h: 2,
  i: 9,
  j: 1,
  k: 1,
  l: 4,
  m: 2,
  n: 6,
  o: 8,
  p: 2,
  q: 1,
  r: 6,
  s: 4,
  t: 6,
  u: 4,
  v: 2,
  w: 2,
  x: 1,
  y: 2,
  z: 1,
  BLANK: 2,
}

const valueName = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  8: 'eight',
  10: 'ten',
  0: 'zero'
}

function wordValue (word) {
  return word.split('').map(c => letterValues[c]).reduce((a, b) => a + b, 0)
}

const isWord = (str) => wordList.includes(str)

function subStrings (word) {
  const substrings = []
  for (let len = 2; len < word.length; len++) {
    for (let srt = 0; srt <= word.length - len; srt++) {
      substrings.push(word.substring(srt, srt + len))
    }
  }
  return substrings
}

function findWord (G, ctx, start, end) {
  const word = G.word.string.substring(start, end + 1)
  if (word.length >= 2 && word !== G.word.string && G.word.string.includes(word) && wordList.includes(word)) {
    G.word = getWord(word, G.word.starredPos)
    G.subs = subStrings(word)
    G.lastAdded = wordValue(word)
    G.phaseScore += G.lastAdded
    G.score += G.lastAdded
  } else {
    return INVALID_MOVE
  }
}

function newWord (G, ctx) {
  const n = ctx.random.Die(wordList.length)
  G.phaseScore = 0
  G.start = wordList[n - 1]
  const starredPos = ctx.random.Die(G.start.length) - 1
  G.word = getWord(G.start, starredPos)
  G.subs = subStrings(G.start)
}

function getLetter(char, isStarred) {
  return {
    value: letterValues[char],
    valueName: valueName[letterValues[char]],
    char,
    isStarred,
  }
}

function getWord(word, starredPos) {
  return {
    string: word,
    starredPos,
    letters: word.split('').map((char, index) => getLetter(char, index === starredPos)),
  }
}

export const Hookie = {
  seed: 2,
  minPlayers: 1,
  maxPlayers: 1,

  setup: (ctx, setupData) => ({
    word: getWord('hookie', 1),
    score: 0,
    phaseScore: 0,
    lastAdded: 0,
    start: 'hookie',
    subs: subStrings('hookie'),
    bag: letterCount,
    starPos: 0
  }),

  // validateSetupData: (setupData, numPlayers) =>
  //     (true ? null : 'setupData is not valid!'),

  phases: {
    search: {
      moves: { findWord },
      endIf: (G) => (!G.subs.some(isWord)),
      next: 'next',
      start: true
    },

    next: {
      onBegin: (G, ctx) => newWord(G, ctx),
      endIf: (G) => (G.start === G.word),
      next: 'search',
      client: false
    }
  },

//  playerView: PlayerView.STRIP_SECRETS,

//   endIf: (G, ctx) => {
//    if (G.score >= 100) {
//      return { winner: ctx.currentPlayer }
//    }
//   },

  onEnd: (G, ctx) => {
    newWord(G, ctx)
  },

  ai: {
    enumerate: (G, ctx) => {
      const moves = []
      const words = G.subs.filter(isWord)
      for (const i in words) {
        moves.push({ move: 'findWord', args: [words[i]] })
      }
      return moves
    }
  },

  events: {
    endGame: false,
    endPhase: false,
    endTurn: false
  }

}

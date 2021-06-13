import { INVALID_MOVE } from 'boardgame.io/core'
import { wordsList } from './words'

const dictionary = require('./words.json')

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
 // BLANK: 0
}

const letterCount = {
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
 // BLANK: 2,
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

const isWord = (str) => dictionary.includes(str)

function subStrings(word, starredPos) {
  const substrings = []
    for (let start = 0; start <= starredPos; start++) {
        for (let len = Math.max(starredPos - start + 1, 2); len <= word.length - start; len++) {
          if (len - start !== word.length) {
            substrings.push(word.substring(start, start + len))
          }
        }
    }
  return substrings
}

function joinTiles(spaces, start, end) {
  const selected = spaces.slice(start, end + 1)
  let word = ''
  let includesStar = false
  let score = 0
  let incluesTWS = false
  // let doubleLetterBonus = 0
  selected.forEach((space) => {
    word += space.letter.char
    score += space.letter.value
    switch (space.multiplier) {
      case 'star':
        includesStar = true
        break;
      case 'tws':
        incluesTWS = true
        break;
      case 'dls':
        // doubleLetterBonus += space.letter.value
        score += space.letter.value
        break;
      default:
    }
  })
  if (incluesTWS) {
    score *= 3
  }
  return { word, includesStar, score }
}

function findWord(G, ctx, start, end) {
  if(typeof G.spaces[start] === "undefined" || typeof G.spaces[start].letter === "undefined" || typeof G.spaces[end] ===  "undefined" || typeof G.spaces[end].letter ===  "undefined" ) {
    return INVALID_MOVE
  }
  const { word, includesStar, score } = joinTiles(G.spaces, start, end)
  if (word.length >= 2 && word !== G.word && G.word.includes(word) && includesStar && dictionary.includes(word) ) {
    const newStarredPos = 7 - start
    G.word = word
    G.subs = subStrings(word, newStarredPos)
    G.lastAdded = score
    G.spaces = getSpaces(word, newStarredPos)
    G.phaseScore += G.lastAdded
    G.score += G.lastAdded
  } else {
    return INVALID_MOVE
  }
}
function removeLetters(bag, word) {
  word.split('').forEach(letter => {
    if (letter in bag) {
      bag[letter] =  bag[letter] - 1
      if (bag[letter] === 0) {
        delete(bag[letter])
      }
  }
  })
  return bag
}

function newWord (G, ctx) {
  
  // remove the last word from the bag
  console.time('wordList')
  const wordList = wordsList(G.bag)

  const n = ctx.random.Die(wordList.length)
  G.phaseScore = 0;
  G.start = wordList[n - 1]
  const rand = ctx.random.Die(G.start.length)
  const righ_shift = (G.start.length - (rand % 9) > 8) ? (G.start.length - (rand % 9)) - 7 : 0;
  G.rand = rand
  G.starredPos = ((rand % 9) + righ_shift) - 1
  G.word = G.start
  
  G.spaces = getSpaces(G.start, G.starredPos)
  G.subs = subStrings(G.start, G.starredPos)
  G.bag = removeLetters(G.bag, G.start)
  const nextList = wordsList(G.bag)
  G.wordsLeft = nextList.length
}

function getLetter(char) {
  return {
    value: letterValues[char],
    valueName: valueName[letterValues[char]],
    char,
  }
}

function getSpaces(word, starredPos) {
  const line = ['tws', null, null, 'dls', null, null, null, 'star', null, null, null, 'dls', null, null, 'tws']
  const letters = word.split('')
  const spaces = []
  line.forEach((multiplier, index) => {
    const letter_i = index - (7 - starredPos) // 7 is the index for the star
    if (letter_i >= 0 && letter_i < letters.length) {
      spaces.push({multiplier: multiplier, letter: getLetter(letters[letter_i])});
    } else {
      spaces.push({multiplier: multiplier, letter: null});
    }
  })
  return spaces
}

export const Hookie = {
  seed: 1,
  minPlayers: 1,
  maxPlayers: 1,

  setup: (ctx, setupData) => ({
    word: 'hookie',
    spaces: getSpaces('hookie', 1),
    endT: false,
    score: 0,
    wordsLeft: dictionary.length,
    phaseScore: 0,
    lastAdded: 0,
    start: 'hookie',
    subs: subStrings('hookie', 1),
    bag: Object.assign({}, letterCount),
    starredPos: 1,
    over: false,
  }),

  // validateSetupData: (setupData, numPlayers) =>
  //     (true ? null : 'setupData is not valid!'),

  phases: {
    search: {
      moves: { findWord, newWord },
      endIf: (G) => (!G.subs.some(isWord) && G.start.length !== 2),
      next: 'new',
      start: true
    },

    new: {
      onBegin: (G, ctx) => newWord(G, ctx),
      endIf: (G) => (G.start === G.word),
      next: 'search'
    }
  },

  endIf: (G, ctx) => {
    if (G.wordsLeft === 0) {
      return { winner: ctx.currentPlayer };
    }
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
    endGame: true,
    endPhase: true,
    endTurn: false
  },

  onEnd: (G, ctx) => {
    G.over = true
    return G
  },

}

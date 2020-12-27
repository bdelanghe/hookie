import { INVALID_MOVE, PlayerView } from 'boardgame.io/core';
// import { defineWord } from './owl.js'

const wordList = require('./words.json')

export const letterValues = {
    'a': 1 , 'b': 3 ,
    'c': 3 , 'd': 2 ,
    'e': 1 , 'f': 4 ,
    'g': 2 , 'h': 4 ,
    'i': 1 , 'j': 8 ,
    'k': 5 , 'l': 1 ,
    'm': 3 , 'n': 1 ,
    'o': 1 , 'p': 3 ,
    'q': 10, 'r': 1 ,
    's': 1 , 't': 1 ,
    'u': 1 , 'v': 4 ,
    'w': 4 , 'x': 8 ,
    'y': 4 , 'z': 10
}

function wordValue(word) {
    return word.split('').map(c => letterValues[c]).reduce((a, b) => a + b, 0)
}

const isWord = (str) => wordList.includes(str)

function subStrings(word) {
    let substrings = []
    for (let wlen = 2; wlen < word.length; wlen++) {
        for (let srt = 0; srt <= word.length - wlen; srt++) {
            substrings.push(word.substring(srt, srt + wlen))
        }
    }
    return substrings
}

function findWord(G, ctx, word) {
    if (word.length >= 2 && word !== G.word && G.word.includes(word) && wordList.includes(word) ) {
        G.word = word
        G.subs = subStrings(word)
        G.lastAdded = wordValue(word)
        G.phaseScore += G.lastAdded
        G.score += G.lastAdded
    } else {
        return INVALID_MOVE;
    }
}

function newWord(G, ctx){
    const n = ctx.random.Die(wordList.length);
    G.phaseScore = 0
    G.fullword = G.word = wordList[n - 1]
    G.subs = subStrings(G.word)
}

export const Hookie = {   
    seed: 2,
    minPlayers: 1,
    maxPlayers: 1,

    setup: (ctx, setupData) => ({
        word: 'hookie',
        score: 0,
        phaseScore: 0,
        lastAdded: 0,
        fullword: 'hookie',
        subs: subStrings('hookie')
    }),

    // validateSetupData: (setupData, numPlayers) => 
    //     (true ? null : 'setupData is not valid!'),

    phases: {
        search: {
            moves: { findWord },
            endIf: (G) => (!G.subs.some(isWord)),
            next: 'next',
            start: true,
        },

        next: {
            onBegin: (G, ctx) => newWord(G, ctx),
            endIf: (G) => (G.fullword === G.word),
            next: 'search',
            client: false
        }
    },

    playerView: PlayerView.STRIP_SECRETS,

    endIf: (G, ctx) => {
        if (G.score >= 100) {
            return { winner: ctx.currentPlayer };
        }
    },

    onEnd: (G, ctx) => {
        newWord(G, ctx)
    },

    ai: {
        enumerate: (G, ctx) => {
            let moves = [];
            const words = G.subs.filter(isWord)
            for (let i in words) {
                moves.push({ move: 'findWord', args: [words[i]]});
            }
            return moves;
        }
    },

    events: {
        endGame: false,
        endPhase: false,
        endTurn: false
    }
        

   
}

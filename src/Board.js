import './Board.css';
import { letterValues } from './Game.js'
import React, { Component } from 'react';

export class HookieBoard extends Component {
  onSelect () {
    const word = window.getSelection().toString()
    this.props.moves.findWord(word)
  }

  render () {
    return (
      <>
        <h1 className='word' onPointerUp={() => this.onSelect()}>
          {splitWord(this.props.G.word)}
        </h1>
        <p className='score'>Score: {this.props.G.score}</p>
      </>
    )
  }
};

const numName = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  8: 'eight',
  10: 'ten'
}

function splitWord (word) {
  return word.split('').map((char, index) => {
    return <span key={index} className={numName[letterValues[char]]}>{char}</span>
  })
}

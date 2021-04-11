import './Board.css';
import React, { Component } from 'react';
import classNames from 'classnames';

export class HookieBoard extends Component {
  onSelect () {
    const sel = window.getSelection()
    const range = sel.getRangeAt(0)
    this.props.moves.findWord(selectionIndex(range.startContainer), selectionIndex(range.endContainer))
    sel.removeAllRanges()
  }

  render () {
    return (
      <>
        <h1 className='word' onPointerUp={() => this.onSelect()}>
          {formatWord(this.props.G.word)}
        </h1>
        <p className='score'>Score: {this.props.G.score}</p>
      </>
    )
  }
};


function formatWord (word) {
  return word.letters.map((letter, index) => {
    const clsn = classNames('letter', { star: letter.isStarred }, letter.numberName)
    return <span key={index} data-idx={index} className={clsn}>{letter.char}</span>
  })
}

function selectionIndex(container) {
  return parseInt(container.parentElement.dataset.idx, 10)
}
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
          {formatSpaces(this.props.G.spaces)}
        </h1>
        <p className='score'>Score: {this.props.G.score}</p>
      </>
    )
  }
};

function formatSpaces(spaces) {
  return spaces.map((space, index) => {
    if (space.letter){
      const clsn = classNames('letter', space.letter.valueName)
      return <div className='tile filled' key={index} data-idx={index}><span  data-value={space.letter.value} className={clsn}>{space.letter.char}</span><span className='sub'>{space.letter.value}</span></div>
    } else {
      return <div className='tile empty' key={index} data-idx={index}></div>
    }
  })
}

function formatWord(word) {
  return word.letters.map((letter, index) => {
    const clsn = classNames('letter', { star: letter.isStarred }, letter.valueName )
    return <div className='tile'><span key={index} data-idx={index} data-value={letter.value} className={clsn}>{letter.char}</span><span className='sub'>{letter.value}</span></div>
  })
}

function selectionIndex(container) {
  return parseInt(container.parentElement.dataset.idx, 10)
}
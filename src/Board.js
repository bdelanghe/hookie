import './Board.css';
import React, { Component } from 'react';
import classNames from 'classnames';

export class HookieBoard extends Component {
  onSelect () {
    const sel = window.getSelection()
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0)
      const start = selectionIndex(range.startContainer)
      const end = selectionIndex(range.endContainer)
      if(typeof start === "number" && typeof end === "number" ) {
        this.props.moves.findWord(selectionIndex(range.startContainer), selectionIndex(range.endContainer))
      }
    }
    sel.removeAllRanges()
  }

  render () {
    return (
      <>
        <span classNames='wordsLeft'><b>{this.props.G.wordsLeft}</b> words pausible in bag</span>
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
      const clsnl = classNames('letter', space.letter.valueName)
      const clsns = classNames('tile', space.multiplier, 'filled',)
      return <div className={clsns} key={index}><div><span data-idx={index} className={clsnl}>{space.letter.char}</span><span className='sub' data-idx={index}>{space.letter.value}</span></div></div>
    } else {
      const long_name = {tws: 'triple word score', dls: 'double letter score'}
      const clsns = classNames('tile', space.multiplier, 'empty',)
      return <div className={clsns} key={index}><span className='multiplier'>{long_name[space.multiplier]}</span></div>
    }
  })
}

function selectionIndex(container) {
  return parseInt(container.parentElement.dataset.idx, 10)
}
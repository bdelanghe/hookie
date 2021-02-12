<<<<<<< HEAD
import './Board.css';
import { letterValues } from './Game.js'
import React, { Component } from 'react';
=======
import './Board.css'
import { letterValues } from './Game'
import React, { Component } from 'react'
import Contacts from './components/contacts'
>>>>>>> master

export class HookieBoard extends Component {
  onSelect () {
    console.log('watup')
    const word = window.getSelection().toString()
    this.props.moves.findWord(word)
  }

<<<<<<< HEAD
    render () {
        return (
            <>
                <h1 className="word" onMouseUp={() => this.onSelect()}>
                    {splitWord(this.props.G.word)}
                </h1>
                <p className="score">Score: {this.props.G.score}</p>
                {/* <Contacts contacts={this.state.contacts} /> */}
            </>
        )
    }
=======
  // componentDidMount() {
  //     const apiUrl =
  //     fetch('http://jsonplaceholder.typicode.com/users')
  //     .then(res => res.json())
  //     .then((data) => {
  //       this.setState({ contacts: data })
  //     })
  //     .catch(console.log)
  // }
  render () {
    return (
      <>
        <h1 className='word' onMouseUp={() => this.onSelect()}>
          {splitWord(this.props.G.word)}
        </h1>
        <p className='score'>Score: {this.props.G.score}</p>
        {/* <Contacts contacts={this.state.contacts} /> */}
      </>
    )
  }
>>>>>>> master
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

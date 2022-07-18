import React, {useState} from 'react'
import { Word } from './Word'
import { WORDS } from './words'

export const App = () => {

  const [randomWord, setRandomWord] = useState(Math.floor(Math.random()*WORDS.length+1))
  const [randomCase, setRandomCase] = useState(Math.floor(Math.random()*7))
  
  console.log(randomWord, randomCase)
  
  const newWord = () => {
    try {
      setRandomWord(Math.floor(Math.random()*WORDS.length+1))
      setRandomCase(Math.floor(Math.random()*7))
    } catch {
      console.log('error...')
    }
  }
  
  return (
    <div>Polish Noun Decliner


      <Word randomWord={randomWord} randomCase={randomCase} />


    <br />
    <br />
    <button onClick={() => newWord()}>new word</button>
    </div>
  )
}

import React from 'react'
import { Word } from './Word'
import { WORDS } from './words'

export const App = () => {

  const randomWord = Math.floor(Math.random()*WORDS.length+1)
  const randomCase = Math.floor(Math.random()*7+1)
  return (
    <div>Polish Noun Decliner


      <Word randomWord={randomWord} randomCase={randomCase} />
    </div>
  )
}

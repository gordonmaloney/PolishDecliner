import React, {useEffect, useState} from 'react'
import { Word } from './Word'
import { WORDS } from './words'

export const App = () => {

  const [randomWord, setRandomWord] = useState(Math.floor(Math.random()*WORDS.length+1))
  const [randomCase, setRandomCase] = useState(Math.floor(Math.random()*7))
  
  

  const [single, setSingle] = useState(true)
  const [plural, setPlural] = useState(true)
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random()*2)+1)

  

  useEffect(() => {
  single && !plural && setRandomNum(1)
  plural && !single && setRandomNum(2)
  single && plural && setRandomNum(Math.floor(Math.random()*2)+1)
  }, [single, plural])

  console.log(randomNum)

  console.log(randomWord, randomCase)
  
  const newWord = () => {
    try {
      setRandomWord(Math.floor(Math.random()*WORDS.length+1))
      setRandomCase(Math.floor(Math.random()*7))
      single && plural && setRandomNum(Math.floor(Math.random()*2)+1)
    } catch {
      console.log('error...')
    }
  }
  
  
console.log('XXX', randomNum)
  return (
    <div>Deklinacja


      <Word randomWord={randomWord} randomCase={randomCase} randomNum={randomNum} />


    <br />
    <br />
    <button onClick={() => newWord()}>new word</button>


    <br />
    <input checked={single} onClick={() => setSingle(!single)} type="checkbox" />single
    <input checked={plural} onClick={() => setPlural(!plural)} type="checkbox" />plural
    <br />

</div>
  )
}

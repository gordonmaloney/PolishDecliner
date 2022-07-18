import React, {useState} from 'react'
import { WORDS } from './words'

export const Word = ({randomWord, randomCase}) => {

    const [input, setInput] = useState('')
console.log(input) 
  return (
    <div>Word
        <br/>
        <br/> 
    
    <br /> <br />
    {WORDS[randomWord-1].word} - {" "}

    {randomWord && WORDS[randomWord-1].cases[randomCase].case}<br />
    
    <input onChange={(e) => setInput(e.target.value)}/>


    {input == WORDS[randomWord-1].cases[randomCase].declensions[0].singular &&
     <h1>You win!</h1>
    }
    
    </div>
  )
}

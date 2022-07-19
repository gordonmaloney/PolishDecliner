import React, {useState, useMemo, useEffect} from 'react'
import { WORDS } from './words'



export const Word = ({randomWord, randomCase, randomNum}) => {

    console.log(randomCase)

    const [input, setInput] = useState('')

    useEffect(() => {
        setInput('')
    }, [randomWord, randomCase])

    const [random1, setRandom1] = useState(Math.floor(Math.random()*7))
    const [random2, setRandom2] = useState(Math.floor(Math.random()*7))

    const [number, setNumber] = useState('singular')

    useEffect(() => {
        randomNum == 1 && setNumber('singular')
        randomNum == 2 && setNumber('plural')
    }, [randomNum])

    const [multipleChoice, setMultipleChoice] = useState(false)

    const [MCoptions, setMCoptions] = useState([])



        let answer = WORDS[randomWord-1].cases.find(x => x.case == randomCase).declensions[0][number]
        console.log(answer)

        //check for duplicates
        if (WORDS[randomWord-1].cases[random1].declensions[0][number] == answer) {
            setRandom1(Math.floor(Math.random()*7))
        }

        if (WORDS[randomWord-1].cases[random2].declensions[0][number] == answer) {
            setRandom2(Math.floor(Math.random()*7))
        }

        if (WORDS[randomWord-1].cases[random2].declensions[0][number] == WORDS[randomWord-1].cases[random1].declensions[0][number]) {
            setRandom2(Math.floor(Math.random()*7))
        }

        //will need to check if it's there *is* a different one

        let options = [
            answer,
            WORDS[randomWord-1].cases[random1].declensions[0][number],
            WORDS[randomWord-1].cases[random2].declensions[0][number]
        ]

useEffect(() => {
    setMCoptions(options)
}, options)

const checkMC = option => {
    setInput(option)
    option == answer && console.log('correct')
    option != answer && console.log('try again...')
}

  return (
    <div>
        <br/>
        <br/> 

    <h2>{WORDS[randomWord-1].word}</h2>

    <h4>
    {randomWord && WORDS[randomWord-1].cases.find(x => x.case == randomCase).case}{" - "}
    {number}
    </h4>

    



    <input value={input} onChange={(e) => setInput(e.target.value)}/>
<br / >
    <br/>
    <input onClick={()=> setMultipleChoice(!multipleChoice)} type="checkbox" />multiple choice <br/>
    {multipleChoice && MCoptions.map((option, index) => {
        return (
            <div key={index}>
            <span onClick={option => checkMC(option.target.textContent)}>{option}</span>
            <br />
            </div>
        )
    }
    )}



    {input == WORDS[randomWord-1].cases.find(x => x.case == randomCase).declensions[0][number] &&
     <h1>Correct!</h1>
    }
    
    </div>
  )
}

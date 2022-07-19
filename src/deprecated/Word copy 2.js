import React, {useState, useEffect} from 'react'
import { WORDS } from '../words'



export const Word = ({randomWord, randomCase, randomNum}) => {


    const [input, setInput] = useState('')

    useEffect(() => {
        setInput('')
    }, [randomWord, randomCase, randomNum])

    const [number, setNumber] = useState('singular')

    useEffect(() => {
        randomNum == 1 && setNumber('singular')
        randomNum == 2 && setNumber('plural')
    }, [randomNum])



    //multiple choice
    const [multipleChoice, setMultipleChoice] = useState(false)


    //check if there are enough multiple choices to make unique
        const [answer, setAnswer] = useState(WORDS[randomWord-1].cases.find(x => x.case == randomCase).declensions[0][number])
        
        useEffect(() => {
            setAnswer(WORDS[randomWord-1].cases.find(x => x.case == randomCase).declensions[0][number])
        }, [randomWord])


        //all possible answers
        const [possibleSingularAnswers, setPossibleSingularAnswers] = useState(WORDS[randomWord-1].cases.map(x => 
            x.declensions[0].singular))
        const [possiblePluralAnswers, setPossiblePluralAnswers] = useState(WORDS[randomWord-1].cases.map(x => 
            x.declensions[0].plural))
        const [possibleAnswers, setPossibleAnswers] = useState([...possibleSingularAnswers, ...possiblePluralAnswers])
        
        const [uniqAnswers, setUniqAnswers] = useState([...new Set(possibleAnswers)].filter(ans => ans != answer))


        useEffect(() => {

            console.log('resetting unique answers...')

            setPossibleSingularAnswers(WORDS[randomWord-1].cases.map(x => 
                x.declensions[0].singular))
            setPossiblePluralAnswers(WORDS[randomWord-1].cases.map(x => 
                x.declensions[0].plural))
            setPossibleAnswers([...possibleSingularAnswers, ...possiblePluralAnswers])

            setUniqAnswers([...new Set(possibleAnswers)].filter(ans => ans != answer))
        }, [randomCase, randomNum, randomWord])


        console.log(uniqAnswers)

            //shuffle array function
            function shuffle(array) {
                let currentIndex = array.length,  randomIndex;
              
                // While there remain elements to shuffle.
                while (currentIndex != 0) {
              
                  // Pick a remaining element.
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
              
                  // And swap it with the current element.
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
              
                return array;
              }

              const [shuffledAnswers, setShuffledAnswers] = useState(shuffle(uniqAnswers))

              const [options, setOptions] = useState([
                answer,
                shuffledAnswers[0],
                shuffledAnswers[1]
                ])


              useEffect(() => {

                console.log('reshuffling...')

                setShuffledAnswers(shuffle(uniqAnswers))

                setOptions([
                    answer,
                    shuffledAnswers[0],
                    shuffledAnswers[1]
                    ])

              }, [uniqAnswers])









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
    {multipleChoice && options.map((option, index) => {
        return (
            <div key={index}>
            <span onClick={option => setInput(option.target.textContent)}>{option}</span>
            <br />
            </div>
        )
    }
    )}

{console.log("answer: ", answer)}

    {input == answer &&
     <h1>Correct!</h1>
    }
    
    </div>
  )
}

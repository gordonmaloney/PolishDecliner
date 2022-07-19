import React, {useEffect, useState} from 'react'
import { Word } from './Word'
import { WORDS } from './words'

export const App = () => {

  //pick word
  const [randomWord, setRandomWord] = useState(Math.floor(Math.random()*WORDS.length+1))
  
  //pick case
  const cases = WORDS[0].cases.map(x => x.case)
  const [selectedCases, setSelectedCases] = useState(cases)
  const [randomCase, setRandomCase] = useState(Math.floor(Math.random()*selectedCases.length))


  console.log("XXX", randomCase)

  const handleCaseChange = wordCase => {
    setRandomCase(0)
    if (selectedCases.includes(wordCase)) {
      setSelectedCases(prev =>
      prev.filter(x => x != wordCase));
    }
    else {
    setSelectedCases(prev => [...prev, wordCase])
    }
  }

  useEffect(() => {
    setRandomCase(Math.floor(Math.random()*selectedCases.length))
  }, selectedCases)

  //pick number
  const [singular, setsingular] = useState(true)
  const [plural, setPlural] = useState(true)
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random()*2)+1)

  useEffect(() => {
  singular && !plural && setRandomNum(1)
  plural && !singular && setRandomNum(2)
  singular && plural && setRandomNum(Math.floor(Math.random()*2)+1)
  }, [singular, plural])
  
  //new word
  const newWord = () => {
    try {
      setRandomWord(Math.floor(Math.random()*WORDS.length+1))
      setRandomCase(Math.floor(Math.random()*selectedCases.length))
      singular && plural && setRandomNum(Math.floor(Math.random()*2)+1)
    } catch {
      console.log('error...')
    }
  }

  
  
  return (
    <div>
      <h1>Deklinacja</h1>



    {(plural || singular) && selectedCases.length > 0 ? 
      <Word randomWord={randomWord} randomCase={selectedCases[randomCase]} randomNum={randomNum} />
      :
      (!plural && !singular) &&
      <>you need to select at least either singular or plural! <br /></>
    }
    {selectedCases.length == 0 && 
    <>you need to select at least one case!</>
    }

    <br />
    <br />
    <button onClick={() => newWord()}>new word</button>


    <br /><br/>
    <h4>Number:</h4>
    <input checked={singular} onChange={() => setsingular(!singular)} type="checkbox" />singular
    <br />
    <input checked={plural} onChange={() => setPlural(!plural)} type="checkbox" />plural
    <br />
    <h4>Cases:</h4>

    {cases.map(wordCase => { return (
      <>
      <input 
        checked={selectedCases.includes(wordCase)}
        onChange={() => {
          handleCaseChange(wordCase)
        }}
        type="checkbox" /> {wordCase}
      <br />
      </>
    )})}


            <input 
              checked={selectedCases.length == 0}
              onChange={() => {
                setSelectedCases([])
              }}
              type="checkbox" /> unselect all
<br />
      <input 
        checked={selectedCases.length == cases.length}
        onChange={() => {
          setSelectedCases(cases)
        }}
        type="checkbox" /> select all

    

</div>
  )
}

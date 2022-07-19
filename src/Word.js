import React, { useState, useEffect } from "react";
import { WORDS } from "./words";
import {
  Button,
  Checkbox,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

export const Word = ({ randomWord, randomCase, randomNum }) => {
  const [input, setInput] = useState("");

  const [answer, setAnswer] = useState(
    WORDS[randomWord - 1].cases.find((x) => x.case == randomCase)
      .declensions[0][randomNum == 1 ? "singular" : "plural"]
  );

  const [multipleChoice, setMultipleChoice] = useState(false);

  useEffect(() => {
    setAnswer(
      WORDS[randomWord - 1].cases.find((x) => x.case == randomCase)
        .declensions[0][randomNum == 1 ? "singular" : "plural"]
    );
  }, []);

  let possibleAnswers = [
    ...WORDS[randomWord - 1].cases.map((x) => x.declensions[0].singular),
    ...WORDS[randomWord - 1].cases.map((x) => x.declensions[0].plural),
  ];

  let uniqAnswers = [...new Set(possibleAnswers)].filter(
    (ans) => ans != answer
  );

  //shuffle array function
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  let shuffledAnswers = shuffle(uniqAnswers);

  const [options, setOptions] = useState([
    answer,
    shuffledAnswers[0],
    shuffledAnswers[1],
  ]);

  useEffect(() => {
    setAnswer(
      WORDS[randomWord - 1].cases.find((x) => x.case == randomCase)
        .declensions[0][randomNum == 1 ? "singular" : "plural"]
    );

    let answer2 = WORDS[randomWord - 1].cases.find((x) => x.case == randomCase)
      .declensions[0][randomNum == 1 ? "singular" : "plural"];

    let possibleAnswers2 = [
      ...WORDS[randomWord - 1].cases.map((x) => x.declensions[0].singular),
      ...WORDS[randomWord - 1].cases.map((x) => x.declensions[0].plural),
    ];

    let uniqAnswers2 = [...new Set(possibleAnswers2)].filter(
      (ans) => ans != answer2
    );

    let shuffledAnswers2 = shuffle(uniqAnswers2);

    setOptions(shuffle([answer2, shuffledAnswers2[0], shuffledAnswers2[1]]));

    setInput("");
  }, [randomCase, randomNum, randomWord]);

  return (
    <div>

      <span className="polishText"
        style={{backgroundColor: "lightblue", padding: "10px 20px", fontSize: '40px'}}
        >{WORDS[randomWord - 1].word}</span>

      <h3>
        {randomWord &&
          WORDS[randomWord - 1].cases.find((x) => x.case == randomCase).case}
        {" - "}
        {randomNum == 1 ? "singular" : "plural"}
      </h3>

      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ backgroundColor: input == answer && "lightgreen" }}
      />

      <br />
      <br />

      <Accordion sx={{ width: "60%", minWidth: "300px" }}>
        <AccordionSummary expandIcon={<h3>v</h3>}>
          <h3 style={{margin: '0px', padding: '0px'}}>multiple choice</h3>
        </AccordionSummary>
        <AccordionDetails>
          {options.map((option, index) => {
            return (
              <span key={index}>
                <Button
                sx={{fontFamily: "Roboto", m: 1}} 
                  variant="contained"
                  size="medium"
                  onClick={(option) => setInput(option.target.textContent)}
                >
                  {option}
                </Button>
              </span>
            );
          })}
        </AccordionDetails>
      </Accordion>


    </div>
  );
};

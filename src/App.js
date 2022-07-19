import React, { useEffect, useState } from "react";
import { Word } from "./Word";
import { WORDS } from "./words";

import { Grid, Button, Checkbox } from "@mui/material";

export const App = () => {
  //pick word
  const [randomWord, setRandomWord] = useState(
    Math.floor(Math.random() * WORDS.length + 1)
  );

  //pick case
  const cases = WORDS[0].cases.map((x) => x.case);
  const [selectedCases, setSelectedCases] = useState(cases);
  const [randomCase, setRandomCase] = useState(
    Math.floor(Math.random() * selectedCases.length)
  );

  const handleCaseChange = (wordCase) => {
    setRandomCase(0);
    if (selectedCases.includes(wordCase)) {
      setSelectedCases((prev) => prev.filter((x) => x != wordCase));
    } else {
      setSelectedCases((prev) => [...prev, wordCase]);
    }
  };

  useEffect(() => {
    setRandomCase(Math.floor(Math.random() * selectedCases.length));
  }, selectedCases);

  //pick number
  const [singular, setsingular] = useState(true);
  const [plural, setPlural] = useState(true);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 2) + 1);

  useEffect(() => {
    singular && !plural && setRandomNum(1);
    plural && !singular && setRandomNum(2);
    singular && plural && setRandomNum(Math.floor(Math.random() * 2) + 1);
  }, [singular, plural]);

  //new word
  const newWord = () => {
    try {
      setRandomWord(Math.floor(Math.random() * WORDS.length + 1));
      setRandomCase(Math.floor(Math.random() * selectedCases.length));
      singular && plural && setRandomNum(Math.floor(Math.random() * 2) + 1);
    } catch {
      console.log("error...");
    }
  };

  return (
    <div>
      <h1 style={{fontSize: "60px", margin: 0}}>Deklinacja</h1>
<hr style={{marginBottom: "50px"}} />

      <Grid container direction="row-reverse">
        <Grid item xs={12} sm={8}>
          {(plural || singular) && selectedCases.length > 0 ? (
            <Word
              randomWord={randomWord}
              randomCase={selectedCases[randomCase]}
              randomNum={randomNum}
            />
          ) : (
            !plural &&
            !singular && (
              <h3>
                You need to select at least either singular or plural! <br />
              </h3>
            )
          )}
          {selectedCases.length == 0 && (
            <h3>You need to select at least one case!</h3>
          )}

          <br />
          <Button sx={{fontFamily: "Roboto"}} size="large" variant="outlined" onClick={() => newWord()}>
            new word
          </Button>
        </Grid>

        <Grid item xs={12} sm={4}>
          <h2 style={{marginTop: '0px'}}>Number:</h2>
          <Checkbox
            sx={{ m: -1 }}
            checked={singular}
            onChange={() => setsingular(!singular)}
          />
          <span className="checkbox-labels">singular</span>
          <br />
          <Checkbox
            sx={{ m: -1 }}
            checked={plural}
            onChange={() => setPlural(!plural)}
          />
          <span className="checkbox-labels">plural</span>
          <br />
          <h2>Cases:</h2>
          {cases.map((wordCase) => {
            return (
              <>
                <Checkbox
                  sx={{ m: -1 }}
                  checked={selectedCases.includes(wordCase)}
                  onChange={() => {
                    handleCaseChange(wordCase);
                  }}
                />{" "}
                <span className="checkbox-labels">{wordCase}</span>
                <br />
              </>
            );
          })}
          <Checkbox
            sx={{ m: -1 }}
            checked={selectedCases.length == 0}
            onChange={() => {
              setSelectedCases([]);
            }}
          />{" "}
          <span className="checkbox-labels">unselect all</span>
          <br />
          <Checkbox
            sx={{ m: -1 }}
            checked={selectedCases.length == cases.length}
            onChange={() => {
              setSelectedCases(cases);
            }}
          />{" "}
          <span className="checkbox-labels">select all</span>
        </Grid>
      </Grid>
    </div>
  );
};

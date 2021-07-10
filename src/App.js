import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./Item";
const initializeArr = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [gameArr, setGameArr] = useState(initializeArr);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [showalert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [firstMount, setFirstMount] = useState();
  const [winline, setWinline] = useState([-1, -1, -1]);
  const [newGameBtn, setNewGameBtn] = useState(false);
  const [isclickable, setIsclickable] = useState(true);

  //reset the game
  function resetGame() {
    setWinline([-1, -1, -1]);
    setIsclickable(true);
    setNewGameBtn(false);
    setShowAlert(false);
    setMsg("");
    setIsPlayer1(true);
    setGameArr(initializeArr);
  }

  // update the game board when user clicks a div
  function updateGame(index) {
    setFirstMount(false);

    let newArr = Array.from(gameArr);

    if (newArr[index] === "") {
      newArr[index] = isPlayer1 ? "X" : "0";
      setGameArr(newArr);
      setIsPlayer1(!isPlayer1);
    } else {
      alert("choose different box");
    }
  }

  useEffect(() => {
    setFirstMount(true);
  }, []);

  useEffect(() => {
    if (!firstMount) {
      let winner = calculateWinner();
      if (winner) {
        setShowAlert(true);
        winner === "X"
          ? setMsg("winner is player1 (X)")
          : setMsg("winner is player 2 (O)");
        setNewGameBtn(true);
        setIsclickable(false);
      } else {
        let count = 0;
        for (let i = 0; i < gameArr.length; i++) {
          if (gameArr[i] !== "") {
            count += 1;
          }
        }

        if (count === 9) {
          setShowAlert(true);
          setMsg("the match is drawn");
          setNewGameBtn(true);
          setIsclickable(false);
        }
      }
    }
  }, [gameArr]);

  //checkWinner, will return x,0 or null(checks current board ans return the winner of the board)
  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameArr[a] &&
        gameArr[a] === gameArr[b] &&
        gameArr[a] === gameArr[c]
      ) {
        console.log(a, b, c);
        setWinline([a, b, c]);
        return gameArr[a];
      }
    }
    return null;
  }

  return (
    <>
      <h1 className="title">Tic-Tac-Toe</h1>
      <h1 className="game-info">
        {showalert ? (
          <span className="alert-msg">{msg}</span>
        ) : isPlayer1 ? (
          "player1(X)"
        ) : (
          "player2(O)"
        )}{" "}
      </h1>
      <div className="game-container">
        {gameArr.map((state, index) => {
          return (
            <Item
              key={index}
              winelineArr={winline}
              index={index}
              isclickable={isclickable}
              state={state}
              onClick={() => updateGame(index)}
            />
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={resetGame}>Reset Game</button>
        <button
          style={{ display: newGameBtn ? "block" : "none" }}
          onClick={resetGame}
        >
          New Game
        </button>
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import rockImage from './assets/rock.png';
import paperImage from './assets/paper.png';
import scissorsImage from './assets/scissors.png';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import buzzerSound from './assets/buzzer.mp3';
import winSound from './assets/win.mp3';

const playWin = () => {
  const audio = new Audio(winSound);
  audio.play();
};

const playBuzzer = () => {
  const audio = new Audio(buzzerSound);
  audio.play();
};
function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [opponentText, setOpponentText] = useState("Opponent: Make your choice");
  const [showConfetti, setShowConfetti] = useState(false);
  const [opponentScore, setOpponentScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [opponentWins, setOpponentWins] = useState(0);
  const [timer, setTimer] = useState(null);
  const choices = [
    {
      name: 'Rock',
      image: rockImage,
      beats: 'Scissors'
    },
    {
      name: 'Paper',
      image: paperImage,
      beats: 'Rock'
    },
    {
      name: 'Scissors',
      image: scissorsImage,
      beats: 'Paper'
    }
  ];


  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    setOpponentText("Opponent: I'm choosing...");
    setTimeout(() => {
      const newOpponentChoice = choices[Math.floor(Math.random() * 3)];
      setOpponentChoice(newOpponentChoice);
      setTimeout(() => {
        if (opponentWins < 2 && playerScore < 2) {
          if (choice && choice.beats === newOpponentChoice.name) {
            setOpponentText("Opponent: You won this round");
            setShowConfetti(true);
            setPlayerScore(playerScore + 1);
            playWin();
          } else if (newOpponentChoice.beats === choice.name) {
            setOpponentText("Opponent: You lost this round");
            setOpponentWins(opponentWins + 1);
            setTimer(3);
            playBuzzer();
            setTimeout(() => {
              setOpponentText("Opponent: Make your choice");
              setPlayerChoice(null);
              setOpponentChoice(null);
              setTimer(null);
            }, 3000);
          } else if (newOpponentChoice.name === choice.name) {
            setOpponentText("Opponent: It's a tie this round");
          }
          setPlayerChoice(null);
          setOpponentChoice(null);
        } else if (opponentWins === 2) {
          setOpponentText("Opponent: I won!");
          setOpponentWins(0);
          setPlayerScore(0);
          setPlayerChoice(null);
          setOpponentChoice(null);
        } else if (playerScore === 2) {
          setOpponentText("Opponent: You won the game!");
          setOpponentWins(0);
          setPlayerScore(0);
          setPlayerChoice(null);
          setOpponentChoice(null);
        }
      }, 1500);
    }, 1000);
  };

  return (
    <div className="App d-flex flex-column align-items-center">
      <br></br>
      <h2 className="mb-3">Choose:</h2>
      <div className="d-flex justify-content-center">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className={`btn btn-secondary mx-1 ${playerChoice && playerChoice.name === choice.name ? 'active' : ''
              }`}
            onClick={() => handlePlayerChoice(choice)}
            disabled={playerChoice !== null}
          >
            <img src={choice.image} alt={choice.name} className="img-fluid" />
            <div className="mt-2">{choice.name}</div>
          </button>
        ))}
      </div>
      {opponentChoice && (
        <div className="mt-3">{`Opponent chose: ${opponentChoice.name}`}</div>
      )}
      <div className="mt-3">{opponentText}</div>
      {round === 4 && (
        <div className="fixed-bottom text-center">
          <p className='red'>Game Over!</p>
        </div>
      )}
      {opponentWins === 2 && (
        <div className="red mt-3">{`Opponent has won ${opponentWins} rounds`}</div>
      )}
      {playerScore === 2 && (
        <div className="red mt-3">{`You have won ${playerScore} rounds`}</div>
      )}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <div className='footer'>
        <p>&copy; 2023 Rock Paper Scissors | Owen Stringer</p>
      </div>
    </div>
  );
}

export default App;
import React, { useEffect } from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rock from "./assets/rock-main.PNG";
import paper from "./assets/paper-main.PNG";
import scissors from "./assets/scissors-main.PNG";
import robot from "./assets/robot.png";
import mainLogo from "./assets/main-logo.png";
import vs from "./assets/vs.png";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "./store/gameSlice";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state) => state.isGameStarted);
  const oppPickPic = useSelector((state) => state.oppPickPic);
  // const userPick = useSelector((state) => state.userPick);
  const userPickPic = useSelector((state) => state.userPickPic);
  const isOppReady = useSelector((state) => state.isOppReady);
  const isUserReady = useSelector((state) => state.isUserReady);
  const isGameReady = useSelector((state) => state.isGameReady);
  const isDisplayedPicks = useSelector((state) => state.isDisplayedPicks);
  const resultText = useSelector((state) => state.resultText);
  const winOrlost = useSelector((state) => state.winOrlost);
  const won = useSelector((state) => state.won);
  const lost = useSelector((state) => state.lost);
  // const winScores = useSelector((state) => state.winScores);
  // const loseScores = useSelector((state) => state.loseScores);

  const startNewGame = () => {
    dispatch(gameActions.startGame());
    setTimeout(() => {
      dispatch(gameActions.getOppReady());
    }, 700);
    
  };
  const userReady = (pick) => {
    dispatch(gameActions.getUserReady(pick));
    setTimeout(() => {
      dispatch(gameActions.getGameReady());
      setTimeout(() => {
        dispatch(gameActions.displayPicks());
        dispatch(gameActions.showResult());
      }, 1500);
    }, 1500);
  };
  const picks = [
    {
      id: 1,
      img: rock,
      title: "rock",
    },
    {
      id: 2,
      img: paper,
      title: "paper",
    },
    {
      id: 3,
      img: scissors,
      title: "scissors",
    },
  ];
  const newGame = () => {
    dispatch(gameActions.sendScores());
  };
  useEffect(() => {
    dispatch(gameActions.getScores());
  },);
  const resetGame = () => {
    dispatch(gameActions.resetScores());
  };
  return (
    <div className="main-container">
      <img src={mainLogo} alt="mainLogo" className="mainLogo" />
      <div className="game-container">
        {isDisplayedPicks ? (
          <div>
            <div className="results">
              <h2>{winOrlost}</h2>
              <h3>{resultText}</h3>
              <button onClick={newGame}>New Game</button>
            </div>
            <img src={userPickPic} alt="userPick" className="yourPick" />
          </div>
        ) : isGameReady ? (
          <div className="your-container">
            <div className="scores-info">
              {/* <h3 className="title-scores">Your score</h3>
              <div className="scores">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <FontAwesomeIcon icon={faStar} className="star-icon" />
              </div> */}
              <div className="loader"></div>
            </div>
          </div>
        ) : isUserReady ? (
          <div className="ready-game">
            <h3 className="made-pick">You made a pick</h3>
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: "#46be54" }}
              className="readyOpp"
            />
          </div>
        ) : isGameStarted ? (
          <div className="your-container">
            {/* <div className="scores-info">
              <h3 className="title-scores">Your score</h3>
              <div className="scores">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <FontAwesomeIcon icon={faStar} className="star-icon" />
              </div>
            </div> */}
            <h1 className="title-pick">Take your pick</h1>
            <div className="picks">
              {picks.map((pick) => (
                <img
                  key={pick.id}
                  src={pick.img}
                  alt={pick.title}
                  onClick={() => userReady(`${pick.title}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="your-container">
            <h1 className="title-pick">Take your pick</h1>
            <div className="picks">
              {picks.map((pick) => (
                <img key={pick.id} src={pick.img} alt={pick.title} />
              ))}
            </div>
          </div>
        )}

        {isGameStarted ? (
          <img src={vs} alt="vs" className="vs" />
        ) : (
          <div className="btns">
            <button onClick={startNewGame}>Start Game</button>
            <button onClick={resetGame}>Reset Total Scores</button>
            <div className="details">
              <p>Won: {won}</p>
              <p>Lost: {lost}</p>
            </div>
          </div>
        )}
        <div className="opp-container">
          {isDisplayedPicks ? (
            <img src={oppPickPic} alt="userPick" className="oppPick" />
          ) : isGameReady ? (
            <div className="scores-info">
              {/* <h3 className="title-scores-opp">Opponent's score</h3>
              <div className="scores">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <FontAwesomeIcon icon={faStar} className="star-icon" />
              </div> */}
              <div className="loader"></div>
            </div>
          ) : isOppReady ? (
            <div>
              <h1 className="title-opponent">Opponent made a pick</h1>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#46be54" }}
                className="readyOpp"
              />
            </div>
          ) : isGameStarted ? (
            <div>
              <h1 className="title-opponent">Opponent is making a pick</h1>
              <div className="loader"></div>
            </div>
          ) : (
            // <img src={oppPick} alt="oppPick" />
            <div>
              <h1 className="main-title-opponent">Opponent </h1>
              <img src={robot} alt="robot" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

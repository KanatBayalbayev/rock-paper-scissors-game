import { createSlice } from "@reduxjs/toolkit";
import rockOpp from "../assets/opp-rock.PNG";
import paperOpp from "../assets/opp-paper.PNG";
import scissorsOpp from "../assets/opp-scissors.PNG";
import yourRock from "../assets/my-rock.PNG";
import yourPaper from "../assets/my-paper.PNG";
import yourScissors from "../assets/my-scissors.PNG";

const initialGame = {
  isGameStarted: false,
  oppPicks: [
    {
      title: "rock",
      img: rockOpp,
    },
    {
      title: "paper",
      img: paperOpp,
    },
    {
      title: "scissors",
      img: scissorsOpp,
    },
  ],
  oppPickPic: "",
  oppPick: "",
  isOppReady: false,
  isUserReady: false,
  userPick: "",
  userPickPic: "",
  isGameReady: false,
  isDisplayedPicks: false,
  winOrlost: "",
  resultText: "",
  won: 0,
  lost: 0,
  winScores: 0,
  loseScores: 0,
};

const gameSlice = createSlice({
  name: "rock-paper-scissors",
  initialState: initialGame,

  reducers: {
    startGame(state) {
      state.isGameStarted = true;
      let randomNum = Math.floor(Math.random() * 3);
      let randomPickPic = state.oppPicks[randomNum].img;
      let randomPick = state.oppPicks[randomNum].title;
      state.oppPickPic = randomPickPic;
      state.oppPick = randomPick;
      // setTimeout(() => {
      //   state.isOppReady = true;
      // }, 3000);
    },
    getOppReady(state) {
      state.isOppReady = true;
    },
    getUserReady(state, action) {
      state.isUserReady = true;
      state.userPick = action.payload;
      state.won = +localStorage.getItem("win");
      state.lost = +localStorage.getItem("loses");
    },
    getGameReady(state) {
      if (state.isOppReady && state.isUserReady) {
        state.isGameReady = true;
      }
    },
    displayPicks(state) {
      state.isDisplayedPicks = true;
      if (state.userPick === "rock") {
        state.userPickPic = yourRock;
      } else if (state.userPick === "paper") {
        state.userPickPic = yourPaper;
      } else {
        state.userPickPic = yourScissors;
      }
    },
    showResult(state) {
      if (state.userPick === "rock" && state.oppPick === "scissors") {
        state.resultText = "Rock beats Scissors";
        state.winOrlost = "You won";
        state.won = state.won + 1;
        localStorage.setItem("win", state.won);
      } else if (state.userPick === "scissors" && state.oppPick === "paper") {
        state.resultText = "Scissors beats Paper";
        state.winOrlost = "You won";
        state.won = state.won + 1;
        localStorage.setItem("win", state.won);
      } else if (state.userPick === "paper" && state.oppPick === "rock") {
        state.resultText = "Paper beats Rock";
        state.winOrlost = "You won";
        state.won = state.won + 1;
        localStorage.setItem("win", state.won);
      } else if (state.userPick === "scissors" && state.oppPick === "rock") {
        state.resultText = "Rock beats Scissors";
        state.winOrlost = "You lost";
        state.lost += 1;
        localStorage.setItem("loses", state.lost);
      } else if (state.userPick === "paper" && state.oppPick === "scissors") {
        state.resultText = "Scissors beats Paper";
        state.winOrlost = "You lost";
        state.lost += 1;
        localStorage.setItem("loses", state.lost);
      } else if (state.userPick === "rock" && state.oppPick === "paper") {
        state.resultText = "Paper beats Rock";
        state.winOrlost = "You lost";
        state.lost += 1;
        localStorage.setItem("loses", state.lost);
      } else if (state.userPick === "rock" && state.oppPick === "rock") {
        state.resultText = "Draw";
        state.winOrlost = "Nobody wins";
      } else if (state.userPick === "paper" && state.oppPick === "paper") {
        state.resultText = "Draw";
        state.winOrlost = "Nobody wins";
      } else if (
        state.userPick === "scissors" &&
        state.oppPick === "scissors"
      ) {
        state.resultText = "Draw";
        state.winOrlost = "Nobody wins";
      }
      if(state.winOrlost.includes('won')){

      }
    },
    sendScores() {
      window.location.reload();
    },
    getScores(state) {
      state.won = +localStorage.getItem("win");
      state.lost = +localStorage.getItem("loses");
    },
    resetScores(state) {
      localStorage.clear();
      state.won = 0;
      state.lost = 0;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;

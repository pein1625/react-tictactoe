import React from "react";
import GameBoard from "./GameBoard";

const calculateWinner = squareList => {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (
      squareList[a] &&
      squareList[a] === squareList[b] &&
      squareList[a] === squareList[c]
    ) {
      return [a, b, c];
    }
  }
  return null;
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squareList: Array(9).fill(null),
          location: 0,
          highLight: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      movesIsAsd: true
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squareList = current.squareList.slice();
    if (squareList[i] || calculateWinner(squareList)) {
      return;
    }
    squareList[i] = this.state.xIsNext ? "X" : "O";
    let nextStep;
    if (calculateWinner(squareList)) {
      nextStep = {
        squareList,
        location: i + 1,
        highLight: calculateWinner(squareList)
      };
    } else {
      nextStep = {
        squareList,
        location: i + 1,
        highLight: null
      };
    }

    this.setState({
      history: history.concat([nextStep]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      movesIsAsd: this.state.movesIsAsd
    });
  }
  toggleMoves() {
    this.setState({
      ...this.state,
      movesIsAsd: !this.state.movesIsAsd
    });
  }
  jumpTo(step) {
    this.setState({
      ...this.state,
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const moves = history.map((step, move) => {
      const location = step.location;
      const x = Math.floor((location - 1) / 3);
      const y = (location - 1) % 3;
      const dest = move ? "Go to #" + move + " " + x + "," + y : "Go to start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            style={{
              fontWeight: move === this.state.stepNumber ? "bold" : "normal"
            }}
          >
            {dest}
          </button>
        </li>
      );
    });

    let showList;
    if (this.state.movesIsAsd) {
      showList = moves;
    } else {
      showList = moves.reverse();
    }

    let message;
    if (current.highLight) {
      message = "Winner is: " + current.squareList[current.highLight[0]];
    } else if (this.state.stepNumber === 9) {
      message = "GAME DRAW";
    } else {
      message = "Next player is: " + (this.state.xIsNext ? "X" : "O");
    }

    let toggle = this.state.movesIsAsd ? "Sort by ASD" : "Sort by DESC";
    return (
      <div className="game">
        <h2 className="game-title">CỜ CARO:</h2>
        <div className="game-content">
          <GameBoard
            squareList={current.squareList}
            onClick={i => this.handleClick(i)}
            message={message}
            highLight={current.highLight}
          />
          <div className="game-info">
            <button onClick={() => this.toggleMoves()}>{toggle}</button>
            <ol className="game-list-btn">{showList}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

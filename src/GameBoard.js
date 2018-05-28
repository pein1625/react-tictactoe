import React from "react";
import Square from "./Square";

class GameBoard extends React.Component {
  renderSquare(i) {
    let highLight = false;
    if (this.props.highLight && this.props.highLight.indexOf(i) != -1) {
      highLight = true;
    }
    return (
      <Square
        value={this.props.squareList[i]}
        onClick={() => this.props.onClick(i)}
        highLight={highLight}
      />
    );
  }
  render() {
    return (
      <div className="game-board">
        <h4 className="message">{this.props.message}</h4>
        {[...Array(3)].map((item, i) => (
          <div className="game-row">
            {[...Array(3)].map((item, j) => this.renderSquare(i * 3 + j))}
          </div>
        ))}
      </div>
    );
  }
}

export default GameBoard;

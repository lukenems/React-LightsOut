import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard(props.nrows, props.ncols)};
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  getRandomLitSquare() {
    let random = Math.random();
    if (random <= this.props.chanceLightStartsOn) {
      return true;
    } 
    return false;
  }

  createBoard(rows, cols) {
    let board = [];
    for( let i=0; i<rows; i++) {
      board[i] = [];
      for ( let j=0; j<cols; j++) {
        board[i][j] = this.getRandomLitSquare();
      }
    };
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      };
    }

    //flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y+1, x);
    flipCell(y-1, x);
    flipCell(y, x+1);
    flipCell(y, x-1);

    function checkForWin(board) {
      for (let row of board) {
        for (let col of row) {
          if (col === true) {
           return false;
          }
        };
      };
      return true;
    }

    let hasWon = checkForWin(board)


    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    let board = this.state.board.map((row, y) => {
      let cell = row.map((cell, x) => {
        let key = `${y}-${x}`
        return <Cell className="classCell" key={key} flipCellsAroundMe={(evt) => this.flipCellsAround(key)} value={this.state.board[y][x]}/>
      })
        return (
          <tr key={y}>
            {cell}
          </tr>
        )
    })
    return(
      <div className="Board">
        {this.state.hasWon ? <h1>You Won!!</h1> : null}
      
        <table className="classBoard">
          <tbody>
          { board }
          </tbody>
        </table>

      </div>

    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
      
    // TODO
  }
}


export default Board;

"use client";

import React, { useEffect, useState, memo } from "react";

type CellVal = 'X' | 'O' | '';
type GameState = {
  cells: CellVal[],
  player: Extract<CellVal, 'X' | 'O'>
}
type handleMoveFunc = (cellNo: number) => void;

const CELL_COUNT = 9;
const STYLES = {
  board: "relative grid grid-cols-[auto_auto_auto]",
  cell: "inline-flex justify-center items-center size-[calc(50vw/3)] border text-4xl",
}

const BOARD_ARR = Array(CELL_COUNT).fill('');

const Cell = memo(
  ({ cellNo, val, handleMove }: { cellNo: number, val: CellVal, handleMove: handleMoveFunc }) => {
    return <span className={STYLES.cell} onClick={() => handleMove(cellNo)}>{val}</span>;
  },
  (oldProp, currentProp) => oldProp.val === currentProp.val,
)

const Board: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    cells: BOARD_ARR,
    player: 'X'
  });

  const handleMove: handleMoveFunc = (cellNo) => {
    if (gameState.cells[cellNo] !== '') return;

    setGameState((prevState) => {
      const newCells = [...prevState.cells];
      newCells[cellNo] = prevState.player;
      const nextPlayer = prevState.player === 'X' ? 'O' : 'X';
      if (!newCells.filter(c => c === '').length) {
        console.log("match null")
        return { cells: BOARD_ARR, player: nextPlayer };
      }
      return { cells: newCells, player: nextPlayer };
    });
  };

  return (
    <div className={STYLES.board}>
      <span className="absolute flex items-center justify-center bg-green-600 h-[10vw] w-[30vw] left-[50%] translate-x-[-50%] border-b rounded-b-2xl text-4xl" >
        0 - 0
      </span>
      {gameState.cells.map((cell: CellVal, i: number) => (
        <Cell key={i} cellNo={i} val={cell} handleMove={handleMove} />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white h-[50vw] w-[50vw] text-black">
        <Board />
      </div>
    </div>
  );
}

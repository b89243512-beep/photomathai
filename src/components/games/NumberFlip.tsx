"use client";
import { useState, useEffect } from "react";
import { Grid3x3, Trophy, RotateCcw } from "lucide-react";

function shuffle(): number[] {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure solvable — for 3x3, inversions must be even
  let inv = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] && arr[j] && arr[i] > arr[j]) inv++;
    }
  }
  if (inv % 2 !== 0) {
    // swap first two non-zero
    const a = arr.findIndex((x) => x !== 0);
    const b = arr.findIndex((x, i) => x !== 0 && i !== a);
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
  return arr;
}

const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export function NumberFlip() {
  const [tiles, setTiles] = useState<number[]>(shuffle);
  const [moves, setMoves] = useState(0);

  const won = tiles.every((n, i) => n === SOLVED[i]);

  const moveTile = (i: number) => {
    if (won) return;
    const emptyIdx = tiles.indexOf(0);
    const row = Math.floor(i / 3), col = i % 3;
    const eRow = Math.floor(emptyIdx / 3), eCol = emptyIdx % 3;
    const adjacent = Math.abs(row - eRow) + Math.abs(col - eCol) === 1;
    if (!adjacent) return;
    const newTiles = [...tiles];
    [newTiles[i], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[i]];
    setTiles(newTiles);
    setMoves((m) => m + 1);
  };

  const restart = () => { setTiles(shuffle()); setMoves(0); };

  return (
    <div className="py-6 text-center">
      <Grid3x3 className="w-10 h-10 text-pink-500 mx-auto mb-2" />
      <h3 className="text-lg font-bold text-slate-900">Number Slide Puzzle</h3>
      <p className="text-sm text-slate-500 mb-5">Slide tiles to arrange 1-8 in order.</p>

      {won && (
        <div className="mb-4">
          <Trophy className="w-12 h-12 text-pink-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-pink-600">Solved in {moves} moves!</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 max-w-[280px] mx-auto mb-5 bg-slate-100 p-2 rounded-2xl">
        {tiles.map((n, i) => (
          <button key={i} onClick={() => moveTile(i)} disabled={n === 0 || won}
            className={`aspect-square rounded-xl text-3xl font-extrabold transition-all ${
              n === 0 ? "bg-transparent cursor-default" :
              won ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white" :
              "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            }`}>
            {n !== 0 ? n : ""}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-4">
        <span>Moves: <span className="font-bold text-slate-900">{moves}</span></span>
      </div>

      <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors">
        <RotateCcw className="w-4 h-4" /> Shuffle
      </button>
    </div>
  );
}

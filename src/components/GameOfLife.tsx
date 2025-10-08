"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

const NUM_ROWS = 50;
const NUM_COLS = 50;

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(() => {
    const rows = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      rows.push(Array.from(Array(NUM_COLS), () => (Math.random() > 0.7 ? 1 : 0)));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
              if (x === 0 && y === 0) continue;
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < NUM_ROWS && newJ >= 0 && newJ < NUM_COLS) {
                neighbors += g[newI][newJ];
              }
            }
          }

          if (neighbors < 2 || neighbors > 3) {
            return 0;
          }
          if (cell === 0 && neighbors === 3) {
            return 1;
          }
          return cell;
        })
      );
    });

    setTimeout(runSimulation, speed);
  }, [speed]);

  useEffect(() => {
    if (running) {
      runningRef.current = true;
      runSimulation();
    }
  }, [running, runSimulation]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    const rows = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      rows.push(Array.from(Array(NUM_COLS), () => (Math.random() > 0.7 ? 1 : 0)));
    }
    setGrid(rows);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold my-4">Conway&apos;s Game of Life</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${NUM_COLS}, 15px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                width: 15,
                height: 15,
                backgroundColor: grid[i][j] ? 'black' : undefined,
                border: 'solid 1px black',
              }}
            />
          ))
        )}
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartStop}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleReset}
        >
          Reset
        </button>
        <div className="inline-block ml-4">
          <label htmlFor="speed" className="mr-2">
            Speed
          </label>
          <input
            type="range"
            id="speed"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={handleSpeedChange}
          />
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;

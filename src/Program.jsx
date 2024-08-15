import 'bootstrap/dist/css/bootstrap.min.css';
import { ArcElement, Chart } from 'chart.js';
import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Pie } from 'react-chartjs-2';
import './program.css';

Chart.register(ArcElement);

export const Program = () => {
  const [count, setCount] = useState(0);
  const [undo, setUndo] = useState([0]);
  const [doo, setDoo] = useState([]);

  const maxCount = 150;

  const increment = () => {
    if (count < maxCount) {
      setUndo([...undo, count + 1]);
      setDoo([]);
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setUndo([...undo, count - 1]);
      setDoo([]);
      setCount(count - 1);
    }
  };

  const undofunction = () => {
    if (undo.length > 1) {
      const prevState = undo[undo.length - 2];
      setDoo([undo[undo.length - 1], ...doo]);
      setUndo(undo.slice(0, undo.length - 1));
      setCount(prevState);
    }
  };

  const redofunction = () => {
    if (doo.length > 0) {
      const nextState = doo[0];
      setUndo([...undo, nextState]);
      setDoo(doo.slice(1));
      setCount(nextState);
    }
  };

  
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [count, maxCount - count],
        backgroundColor: ['#E6E6FA', 'purple'],
        hoverBackgroundColor: ['pink', '#C11C84'],
      },
    ],
  };
  const options = {
    animation: {
      duration: 1000, 
      easing: 'easeInOutBounce',
    },
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
       <div style={{ marginTop: "20px", width: "50%", margin: "0 auto" }}>
        <Pie data={data} options={options}/>
      </div>
      <h3>Number: {count}</h3>
      <Button onClick={decrement} className='button'>Decrement</Button>
      <Button onClick={increment} className='button'>Increment</Button>
     
      <div style={{ marginTop: "20px" }}>
        <Button onClick={undofunction} className='action' disabled={undo.length <= 1}>undo</Button>
        <Button onClick={redofunction} className='action' disabled={doo.length === 0}>Redo</Button>
      </div>
    </div>
  );
};

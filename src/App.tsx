import React, { useEffect } from 'react';
import './App.css';
import { init } from './game'

function App() {
  useEffect(() => {
    init()
  })

  return (
    <canvas id='cnv' className='app'></canvas>
  );
}

export default App;

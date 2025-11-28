import { useState } from 'react';
import EditorCanvas from './components/EditorCanvas';
import ControlsSidebar from './components/ControlsSidebar';
import { generateCode } from './utils/generator';
import type { Mode, Method, LineState, Lines } from './types';
import './style.css';

// Initial State (Standard Hamburger -> Cross)
const INITIAL_LINES: Lines = [
  {
    menu: [{ x: 20, y: 30 }, { x: 80, y: 30 }],
    close: [{ x: 20, y: 20 }, { x: 80, y: 80 }]
  },
  {
    menu: [{ x: 20, y: 50 }, { x: 80, y: 50 }],
    close: [{ x: 50, y: 50 }, { x: 50, y: 50 }] // Collapses to center
  },
  {
    menu: [{ x: 20, y: 70 }, { x: 80, y: 70 }],
    close: [{ x: 20, y: 80 }, { x: 80, y: 20 }]
  }
];

function App() {
  const [mode, setMode] = useState<Mode>('menu');
  const [method, setMethod] = useState<Method>('checkbox');
  const [lines, setLines] = useState<LineState[]>(JSON.parse(JSON.stringify(INITIAL_LINES)));

  const handleReset = () => {
    setLines(JSON.parse(JSON.stringify(INITIAL_LINES)));
  };

  const generatedCode = generateCode(lines, method);

  return (
    <>
      <header>
        <h1>Hamburger Menu Generator</h1>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Inspired by <a href="https://codepen.io/Zaku/pen/ejLNJL" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Zaku's Pen</a>
        </div>
      </header>

      <main>
        <EditorCanvas
          mode={mode}
          lines={lines}
          onLinesChange={setLines}
          onReset={handleReset}
        />

        <ControlsSidebar
          mode={mode}
          onModeChange={setMode}
          method={method}
          onMethodChange={setMethod}
          generatedCode={generatedCode}
        />
      </main>
    </>
  );
}

export default App;

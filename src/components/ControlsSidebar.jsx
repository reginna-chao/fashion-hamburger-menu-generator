import { useRef, useEffect } from 'react';
import Preview from './Preview';

export default function ControlsSidebar({
  mode,
  onModeChange,
  method,
  onMethodChange,
  generatedCode
}) {
  const codeDisplayRef = useRef(null);

  const handleCopy = () => {
    const codeDisplay = codeDisplayRef.current;
    if (!codeDisplay) return;

    navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
      const btn = document.getElementById('btn-copy');
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    });
  };

  return (
    <aside className="controls-sidebar">
      <div className="control-group">
        <h2>Edit State</h2>
        <div className="btn-group">
          <button
            className={`btn-toggle ${mode === 'menu' ? 'active' : ''}`}
            onClick={() => onModeChange('menu')}
          >
            Menu (Hamburger)
          </button>
          <button
            className={`btn-toggle ${mode === 'close' ? 'active' : ''}`}
            onClick={() => onModeChange('close')}
          >
            Close (Active)
          </button>
        </div>
      </div>

      <div className="control-group">
        <h2>Implementation Method</h2>
        <div className="btn-group">
          <button
            className={`btn-toggle ${method === 'checkbox' ? 'active' : ''}`}
            onClick={() => onMethodChange('checkbox')}
          >
            Checkbox (CSS)
          </button>
          <button
            className={`btn-toggle ${method === 'class' ? 'active' : ''}`}
            onClick={() => onMethodChange('class')}
          >
            Class + JS
          </button>
        </div>
      </div>

      <div className="control-group">
        <h2>Live Preview</h2>
        <Preview html={generatedCode.html} css={generatedCode.css} method={method} />
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Click to animate
        </div>
      </div>

      <div className="control-group">
        <h2>Generated Code</h2>
        <div className="code-output">
          <button className="btn-copy" id="btn-copy" onClick={handleCopy}>Copy</button>
          <code ref={codeDisplayRef} id="code-display">
            {generatedCode.fullCode}
          </code>
        </div>
      </div>
    </aside>
  );
}

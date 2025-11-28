import { useEffect, useRef, useState } from 'react';

const SVG_NS = "http://www.w3.org/2000/svg";

export default function EditorCanvas({ mode, lines, onLinesChange, onReset }) {
  const svgRef = useRef(null);
  const activeLayerRef = useRef(null);
  const ghostLayerRef = useRef(null);
  const controlsLayerRef = useRef(null);
  const [draggedPoint, setDraggedPoint] = useState(null);

  // Render paths and controls
  useEffect(() => {
    if (!svgRef.current) return;

    const activeLayer = activeLayerRef.current;
    const ghostLayer = ghostLayerRef.current;
    const controlsLayer = controlsLayerRef.current;

    // Clear layers
    activeLayer.innerHTML = '';
    ghostLayer.innerHTML = '';
    controlsLayer.innerHTML = '';

    lines.forEach((line, index) => {
      const activePoints = line[mode];
      const ghostPoints = line[mode === 'menu' ? 'close' : 'menu'];

      // Draw Ghost Path (Reference)
      const ghostPath = document.createElementNS(SVG_NS, 'path');
      ghostPath.setAttribute('d', `M ${ghostPoints[0].x} ${ghostPoints[0].y} L ${ghostPoints[1].x} ${ghostPoints[1].y}`);
      ghostPath.classList.add('ghost-path');
      ghostLayer.appendChild(ghostPath);

      // Draw Active Path
      const activePath = document.createElementNS(SVG_NS, 'path');
      activePath.setAttribute('d', `M ${activePoints[0].x} ${activePoints[0].y} L ${activePoints[1].x} ${activePoints[1].y}`);
      activePath.classList.add('editor-path');
      activeLayer.appendChild(activePath);

      // Draw Controls for Active Path
      activePoints.forEach((point, pointIndex) => {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', 6);
        circle.classList.add('control-point');
        circle.dataset.lineIndex = index;
        circle.dataset.pointIndex = pointIndex;
        controlsLayer.appendChild(circle);
      });
    });
  }, [lines, mode]);

  const getSVGPoint = (event) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('control-point')) {
      const lineIndex = parseInt(e.target.dataset.lineIndex);
      const pointIndex = parseInt(e.target.dataset.pointIndex);
      const currentPoint = lines[lineIndex][mode][pointIndex];

      setDraggedPoint({
        lineIndex,
        pointIndex,
        originX: currentPoint.x,
        originY: currentPoint.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!draggedPoint) return;

    const pt = getSVGPoint(e);
    let x = pt.x;
    let y = pt.y;

    // Shift Key: Axis Lock
    if (e.shiftKey) {
      const dx = Math.abs(x - draggedPoint.originX);
      const dy = Math.abs(y - draggedPoint.originY);

      if (dx > dy) {
        y = draggedPoint.originY; // Lock Y (Horizontal movement)
      } else {
        x = draggedPoint.originX; // Lock X (Vertical movement)
      }
    }

    // Grid Snap (5px)
    x = Math.round(x / 5) * 5;
    y = Math.round(y / 5) * 5;

    // Update State
    const newLines = JSON.parse(JSON.stringify(lines));
    newLines[draggedPoint.lineIndex][mode][draggedPoint.pointIndex] = { x, y };
    onLinesChange(newLines);
  };

  const handleMouseUp = () => {
    setDraggedPoint(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedPoint, lines, mode]);

  return (
    <div className="editor-area">
      <svg
        ref={svgRef}
        id="editor-svg"
        viewBox="0 0 100 100"
        onMouseDown={handleMouseDown}
      >
        {/* Grid lines for reference */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Ghost paths (other state) */}
        <g ref={ghostLayerRef} id="ghost-layer"></g>

        {/* Active paths */}
        <g ref={activeLayerRef} id="active-layer"></g>

        {/* Control points */}
        <g ref={controlsLayerRef} id="controls-layer"></g>
      </svg>

      <button className="btn-reset" onClick={onReset}>Reset</button>
    </div>
  );
}

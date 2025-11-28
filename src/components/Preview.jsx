import { useRef, useEffect } from 'react';

export default function Preview({ html, css, method }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Update Preview
    containerRef.current.innerHTML = html;
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    containerRef.current.appendChild(styleEl);

    // For preview interaction in Class mode, we need to add the event listener
    if (method === 'class') {
      const menu = containerRef.current.querySelector('.hamburger-menu');
      if (menu) {
        const handleClick = () => {
          menu.classList.toggle('is-active');
        };
        menu.addEventListener('click', handleClick);

        return () => {
          menu.removeEventListener('click', handleClick);
        };
      }
    }
  }, [html, css, method]);

  return (
    <div
      ref={containerRef}
      className="preview-box"
      id="preview-container"
    />
  );
}

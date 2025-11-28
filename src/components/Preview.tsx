import { useRef, useEffect } from 'react';
import type { Method } from '../types';

interface PreviewProps {
  html: string;
  css: string;
  method: Method;
}

export default function Preview({ html, css, method }: PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return <div ref={containerRef} className="preview-box" id="preview-container" />;
}

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ReactMarkdown from 'react-markdown';

const App = () => {
  const [markdown, setMarkdown] = useState<string>('# 読み込み中...');

  useEffect(() => {
    fetch('/privacy-policy.md')
      .then((res) => res.text())
      .then(setMarkdown);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

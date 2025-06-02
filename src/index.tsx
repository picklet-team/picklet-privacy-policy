import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ReactMarkdown from 'react-markdown';

// カスタムリンクコンポーネント
const CustomLink = ({ href, children, ...props }: any) => {
  const isExternal = href?.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return <a href={href} {...props}>{children}</a>;
};

const App = () => {
  const [markdown, setMarkdown] = useState<string>('# 読み込み中...');

  useEffect(() => {
    fetch('privacy-policy.md')
      .then((res) => res.text())
      .then(setMarkdown);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <ReactMarkdown
        components={{
          a: CustomLink
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

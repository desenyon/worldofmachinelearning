'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = 'python',
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {filename && (
            <span className="font-mono text-xs text-slate-400">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500 uppercase">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors rounded hover:bg-slate-700"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-green-400"
                >
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex min-h-[1.5rem]">
                {showLineNumbers && (
                  <span className="select-none pr-4 text-slate-600 text-right w-8 shrink-0 tabular-nums">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1 text-slate-100 whitespace-pre">
                  {language === 'python' ? highlightPython(line) : 
                   language === 'bash' ? highlightBash(line) : line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Bash syntax highlighting
function highlightBash(line: string): React.ReactNode {
  // Handle comments
  if (line.trim().startsWith('#')) {
    return <span className="text-slate-500">{line}</span>;
  }

  // Simple bash highlighting - commands at start, flags, and strings
  const parts: React.ReactNode[] = [];
  const tokens = line.split(/(\s+)/);
  let isFirst = true;

  tokens.forEach((token, i) => {
    if (token.match(/^\s+$/)) {
      parts.push(<span key={i}>{token}</span>);
      return;
    }

    if (isFirst && token) {
      // First word is the command
      parts.push(<span key={i} className="text-green-400">{token}</span>);
      isFirst = false;
    } else if (token.startsWith('-')) {
      // Flags
      parts.push(<span key={i} className="text-cyan-400">{token}</span>);
    } else if (token.startsWith('"') || token.startsWith("'")) {
      // Strings
      parts.push(<span key={i} className="text-amber-300">{token}</span>);
    } else {
      // Regular text (package names, etc.)
      parts.push(<span key={i} className="text-slate-100">{token}</span>);
    }
  });

  return <>{parts}</>;
}

// Python syntax highlighting
function highlightPython(line: string): React.ReactNode {
  // Handle empty lines
  if (!line.trim()) {
    return line;
  }

  // Handle comments
  if (line.trim().startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  const pythonKeywords = [
    'import', 'from', 'as', 'def', 'class', 'return', 'if', 'elif', 'else',
    'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None',
    'try', 'except', 'finally', 'with', 'lambda', 'yield', 'raise', 'pass',
    'break', 'continue', 'global', 'nonlocal', 'assert', 'del', 'is'
  ];

  const builtins = [
    'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set',
    'tuple', 'bool', 'type', 'isinstance', 'open', 'input', 'sum', 'min',
    'max', 'abs', 'round', 'sorted', 'enumerate', 'zip', 'map', 'filter'
  ];

  // Tokenize the line
  const tokens: { type: string; value: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // Whitespace
    const wsMatch = remaining.match(/^(\s+)/);
    if (wsMatch) {
      tokens.push({ type: 'ws', value: wsMatch[1] });
      remaining = remaining.slice(wsMatch[1].length);
      continue;
    }

    // Strings (double or single quoted)
    const strMatch = remaining.match(/^(["'])((?:\\.|(?!\1)[^\\])*?)\1/) ||
                     remaining.match(/^(f["'])((?:\\.|[^"'\\])*?)(["'])/);
    if (strMatch) {
      tokens.push({ type: 'string', value: strMatch[0] });
      remaining = remaining.slice(strMatch[0].length);
      continue;
    }

    // Numbers
    const numMatch = remaining.match(/^(\d+\.?\d*)/);
    if (numMatch) {
      tokens.push({ type: 'number', value: numMatch[1] });
      remaining = remaining.slice(numMatch[1].length);
      continue;
    }

    // Identifiers and keywords
    const idMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);
    if (idMatch) {
      const word = idMatch[1];
      if (pythonKeywords.includes(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (builtins.includes(word)) {
        tokens.push({ type: 'builtin', value: word });
      } else {
        // Check if it's a function call
        const afterWord = remaining.slice(word.length);
        if (afterWord.startsWith('(')) {
          tokens.push({ type: 'function', value: word });
        } else {
          tokens.push({ type: 'identifier', value: word });
        }
      }
      remaining = remaining.slice(word.length);
      continue;
    }

    // Operators and punctuation
    const opMatch = remaining.match(/^([=+\-*/%<>!&|^~@:,.\[\](){}]+)/);
    if (opMatch) {
      tokens.push({ type: 'operator', value: opMatch[1] });
      remaining = remaining.slice(opMatch[1].length);
      continue;
    }

    // Anything else
    tokens.push({ type: 'other', value: remaining[0] });
    remaining = remaining.slice(1);
  }

  // Render tokens
  return (
    <>
      {tokens.map((token, i) => {
        switch (token.type) {
          case 'keyword':
            return <span key={i} className="text-pink-400 font-medium">{token.value}</span>;
          case 'builtin':
            return <span key={i} className="text-cyan-400">{token.value}</span>;
          case 'function':
            return <span key={i} className="text-yellow-300">{token.value}</span>;
          case 'string':
            return <span key={i} className="text-green-400">{token.value}</span>;
          case 'number':
            return <span key={i} className="text-orange-400">{token.value}</span>;
          case 'operator':
            return <span key={i} className="text-slate-400">{token.value}</span>;
          default:
            return <span key={i} className="text-slate-100">{token.value}</span>;
        }
      })}
    </>
  );
}

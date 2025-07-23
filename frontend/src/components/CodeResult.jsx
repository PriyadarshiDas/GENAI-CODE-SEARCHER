import React from 'react';
import MonacoEditor from '@monaco-editor/react';

export default function CodeResult({ results, loading }) {
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <span className="text-genai-300 animate-pulse font-futuristic text-xl">Searching GitHub...</span>
      </div>
    );
  }
  if (!results || results.length === 0) {
    return null;
  }
  return (
    <div className="space-y-8">
      {results.map((res, idx) => (
        <div key={idx} className="bg-genai-800 rounded-2xl shadow-xl p-6 border-2 border-genai-600">
          <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-futuristic text-genai-200 text-lg font-bold">{res.name}</span>
              <span className="ml-4 text-genai-400 text-sm">{res.repository}</span>
            </div>
            <a href={res.html_url} target="_blank" rel="noopener noreferrer" className="text-genai-300 underline font-futuristic text-sm mt-2 md:mt-0">View on GitHub</a>
          </div>
          {res.text_matches && res.text_matches.length > 0 ? (
            <MonacoEditor
              height="200px"
              defaultLanguage="javascript"
              value={res.text_matches[0].fragment || '// Code preview not available'}
              theme="vs-dark"
              options={{ readOnly: true, fontSize: 16, minimap: { enabled: false } }}
            />
          ) : (
            <div className="text-genai-400 font-futuristic">No code preview available.</div>
          )}
          {res.error && <div className="text-red-400 font-futuristic mt-2">{res.error}</div>}
        </div>
      ))}
    </div>
  );
} 
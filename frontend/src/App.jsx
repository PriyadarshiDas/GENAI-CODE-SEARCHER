import React, { useState } from 'react';
import QueryForm from './components/QueryForm';
import CodeResult from './components/CodeResult';

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (query) => {
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.result);
    } catch (e) {
      setResults([{ name: 'Error', repository: '', html_url: '', text_matches: null, error: e.message }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-genai-900 via-genai-800 to-genai-700">
      <header className="w-full py-8 text-center">
        <h1 className="text-5xl font-futuristic font-bold text-genai-200 tracking-widest drop-shadow-lg animate-pulse">GenAI Code Search</h1>
        <p className="mt-2 text-genai-300 text-lg font-futuristic">Search GitHub code with the power of local GenAI</p>
      </header>
      <main className="w-full max-w-3xl flex flex-col items-center">
        <QueryForm onQuery={handleQuery} loading={loading} />
        <div className="w-full mt-8">
          <CodeResult results={results} loading={loading} />
        </div>
      </main>
    </div>
  );
} 
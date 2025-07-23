import React, { useState } from 'react';

export default function QueryForm({ onQuery, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
      <input
        type="text"
        className="w-full max-w-xl px-6 py-3 rounded-xl bg-genai-800 text-genai-100 font-futuristic text-lg border-2 border-genai-400 focus:outline-none focus:ring-2 focus:ring-genai-300 transition-all shadow-lg"
        placeholder="Ask for code (e.g., python function to reverse a linked list)"
        value={query}
        onChange={e => setQuery(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <button
        type="submit"
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-genai-500 to-genai-400 text-genai-100 font-futuristic text-xl font-bold shadow-xl hover:scale-105 hover:from-genai-400 hover:to-genai-300 transition-all disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
} 
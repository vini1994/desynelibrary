import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { CodeCard } from './components/CodeCard';
import { snippets as initialSnippets, saveSnippets, loadSnippets } from './data/snippets';
import { useFavorites } from './hooks/useFavorites';
import { PublicPreview } from './pages/PublicPreview';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [snippets, setSnippets] = useState(() => loadSnippets());

  // Salva os snippets no localStorage sempre que houver mudanças
  useEffect(() => {
    saveSnippets(snippets);
  }, [snippets]);

  const filteredSnippets = snippets.filter(snippet => {
    if (showFavorites) {
      return favorites.includes(snippet.id);
    }
    return activeCategory === 'all' || snippet.category === activeCategory;
  });

  const handleAddSnippet = (newSnippet) => {
    setSnippets(prevSnippets => {
      const updatedSnippets = [...prevSnippets, { ...newSnippet, likes: 0 }];
      return updatedSnippets;
    });
  };

  const handleDeleteSnippet = (snippetId: string) => {
    setSnippets(prevSnippets => {
      const updatedSnippets = prevSnippets.filter(snippet => snippet.id !== snippetId);
      return updatedSnippets;
    });
  };

  const Dashboard = () => (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        onAddSnippet={handleAddSnippet}
      />
      <main className="flex-1 ml-64 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <CodeCard
              key={snippet.id}
              snippet={snippet}
              isFavorite={isFavorite(snippet.id)}
              onToggleFavorite={() => toggleFavorite(snippet.id)}
              onDelete={() => handleDeleteSnippet(snippet.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/preview/:id" element={<PublicPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
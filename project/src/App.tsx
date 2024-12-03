import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import CodeCard from './components/CodeCard';
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

  const handleAddSnippet = useCallback((newSnippet) => {
    setSnippets(prevSnippets => {
      const updatedSnippets = [...prevSnippets, { ...newSnippet, likes: 0 }];
      return updatedSnippets;
    });
  }, []);

  const handleDeleteSnippet = useCallback((snippetId: string) => {
    setSnippets(prevSnippets => {
      const updatedSnippets = prevSnippets.filter(snippet => snippet.id !== snippetId);
      return updatedSnippets;
    });
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setShowFavorites(false);
  }, []);

  const handleToggleFavorites = useCallback(() => {
    setShowFavorites(prev => !prev);
    setActiveCategory('all');
  }, []);

  const Dashboard = useCallback(() => (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        showFavorites={showFavorites}
        onToggleFavorites={handleToggleFavorites}
        onAddSnippet={handleAddSnippet}
      />
      <main className="flex-1 pl-72">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredSnippets.map(snippet => (
              <CodeCard
                key={snippet.id}
                snippet={snippet}
                isFavorite={isFavorite(snippet.id)}
                onToggleFavorite={() => toggleFavorite(snippet.id)}
                onDelete={() => handleDeleteSnippet(snippet.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  ), [activeCategory, showFavorites, handleCategoryChange, handleToggleFavorites, handleAddSnippet, filteredSnippets, handleDeleteSnippet]);

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
'use client';

import React, { useState } from 'react';
import { PlusCircle, Save, Trash2 } from 'lucide-react';
import { CodeSnippet } from '../types/snippet';

interface AdminFormData {
  title: string;
  description: string;
  category: string;
  code: string;
  tags: string[];
}

export const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    title: '',
    description: '',
    category: '',
    code: '',
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica para salvar o novo componente
    console.log('Novo componente:', formData);
  };

  const handleTagAdd = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      
      <div className="max-w-4xl bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Adicionar Novo Componente</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-gray-700 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-gray-700 rounded px-4 py-2 h-24"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Categoria</label>
            <select
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-gray-700 rounded px-4 py-2"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="components">Componentes</option>
              <option value="effects">Efeitos</option>
              <option value="layouts">Layouts</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Código</label>
            <textarea
              value={formData.code}
              onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
              className="w-full bg-gray-700 rounded px-4 py-2 h-64 font-mono"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={e => setCurrentTag(e.target.value)}
                className="flex-1 bg-gray-700 rounded px-4 py-2"
                placeholder="Adicione tags"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                <PlusCircle size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={20} />
            Salvar Componente
          </button>
        </form>
      </div>
    </div>
  );
};

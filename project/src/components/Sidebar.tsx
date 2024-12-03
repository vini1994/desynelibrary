import React, { useState, useRef } from 'react';
import { Code2, Search, Bookmark, Plus, Upload, X } from 'lucide-react';
import { CategoryButton } from './CategoryButton';
import { categories } from '../data/categories';
import * as Dialog from '@radix-ui/react-dialog';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  onAddSnippet: (snippet: any) => void;
}

interface NewComponent {
  name: string;
  code: string;
  category: string;
  thumbnail: string | null;
  previewUrl: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onCategoryChange,
  showFavorites,
  onToggleFavorites,
  onAddSnippet
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newComponent, setNewComponent] = useState<NewComponent>({
    name: '',
    code: '',
    category: 'components',
    thumbnail: null,
    previewUrl: ''
  });
  const [previewError, setPreviewError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddComponent = () => {
    setShowAddModal(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewComponent(prev => ({
          ...prev,
          thumbnail: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateComponentCode = (code: string) => {
    try {
      // Try to create a function from the code
      new Function('React', `return ${code}`);
      setPreviewError(null);
      return true;
    } catch (error) {
      setPreviewError(error.message);
      return false;
    }
  };

  const handleSave = () => {
    if (!newComponent.name || !newComponent.code || !newComponent.category) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!validateComponentCode(newComponent.code)) {
      alert('O código do componente é inválido. Por favor, corrija os erros antes de salvar.');
      return;
    }

    // Create the new snippet
    const newSnippet = {
      id: Date.now().toString(),
      title: newComponent.name,
      description: 'Novo componente adicionado',
      code: newComponent.code,
      category: newComponent.category,
      thumbnail: newComponent.thumbnail || '/default-thumbnail.png',
      language: 'typescript',
      likes: 0,
      previewUrl: newComponent.previewUrl || undefined
    };

    // Add the snippet using the provided callback
    onAddSnippet(newSnippet);

    // Reset form and close modal
    setNewComponent({
      name: '',
      code: '',
      category: 'components',
      thumbnail: null,
      previewUrl: ''
    });
    setPreviewError(null);
    setShowAddModal(false);
  };

  return (
    <div className="w-64 bg-gray-900 h-screen fixed left-0 top-0 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Code2 className="w-8 h-8 text-blue-500" />
        <h1 className="text-xl font-bold text-white">CodeGallery</h1>
      </div>
      
      <div className="relative mb-6">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar snippets..."
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onToggleFavorites}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-4 ${
          showFavorites
            ? 'bg-pink-500 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
      >
        <Bookmark className="w-5 h-5" />
        <span className="text-sm font-medium">Favoritos</span>
      </button>

      <button
        onClick={handleAddComponent}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        <Plus className="w-5 h-5" />
        <span className="text-sm font-medium">Adicionar Componente</span>
      </button>

      <nav className="space-y-2">
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            id={category.id}
            icon={category.icon}
            label={category.label}
            isActive={category.id === activeCategory}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </nav>

      {showAddModal && (
        <Dialog.Root open={showAddModal} onOpenChange={() => setShowAddModal(false)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] max-h-[90vh] bg-gray-800 p-6 rounded-lg shadow-xl overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold text-white">Adicionar Novo Componente</Dialog.Title>
                <Dialog.Close className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  value={newComponent.name}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome do componente"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">URL do Preview ao Vivo</label>
                <input
                  type="url"
                  value={newComponent.previewUrl || ''}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, previewUrl: e.target.value }))}
                  placeholder="https://exemplo.com/seu-componente"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Cole aqui a URL onde o componente está hospedado para visualização ao vivo
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                <select
                  value={newComponent.category}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Código do Componente</label>
                <textarea
                  value={newComponent.code}
                  onChange={(e) => {
                    setNewComponent(prev => ({ ...prev, code: e.target.value }));
                    validateComponentCode(e.target.value);
                  }}
                  placeholder="Cole o código do componente aqui..."
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono h-64"
                />
                {previewError && (
                  <p className="text-red-500 text-sm mt-2">
                    Erro no código: {previewError}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Escolher Imagem
                  </button>
                  {newComponent.thumbnail && (
                    <img
                      src={newComponent.thumbnail}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Dialog.Close
                  onClick={() => {
                    setNewComponent({
                      name: '',
                      code: '',
                      category: 'components',
                      thumbnail: null,
                      previewUrl: ''
                    });
                    setPreviewError(null);
                  }}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  disabled={!!previewError}
                >
                  Salvar
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};
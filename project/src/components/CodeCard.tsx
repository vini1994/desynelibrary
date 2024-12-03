import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Trash2, Eye } from 'lucide-react';
import { CodeSnippet } from '../types/snippet';
import { CopyButton } from './CopyButton';
import { FavoriteButton } from './FavoriteButton';
import { PreviewModal } from './PreviewModal';

interface CodeCardProps {
  snippet: CodeSnippet;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export const CodeCard: React.FC<CodeCardProps> = ({
  snippet,
  isFavorite,
  onToggleFavorite,
  onDelete
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja deletar este componente?')) {
      onDelete();
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Gera um link público baseado no ID do snippet
    const publicUrl = `${window.location.origin}/preview/${snippet.id}`;

    try {
      await navigator.clipboard.writeText(publicUrl);
      alert('Link público copiado para a área de transferência!');
    } catch (error) {
      console.error('Erro ao copiar link:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative group">
        <img
          src={snippet.thumbnail}
          alt={snippet.title}
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(true);
            }}
            className="p-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-600"
          >
            <Eye className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{snippet.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{snippet.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FavoriteButton
              isFavorite={isFavorite}
              likes={snippet.likes}
              onToggle={onToggleFavorite}
            />
            <button 
              onClick={handleShare}
              className="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-gray-700"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <CopyButton code={snippet.code} />
        </div>
      </div>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        snippet={snippet}
      />
    </motion.div>
  );
};
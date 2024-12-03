import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Trash2, Eye } from 'lucide-react';
import { CodeSnippet } from '../types/snippet';
import FavoriteButton from './FavoriteButton';
import { CopyButton } from './CopyButton';
import { PreviewModal } from './PreviewModal';

interface CodeCardProps {
  snippet: CodeSnippet;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

const getCategoryStyle = (category: string) => {
  const styles = {
    'components': {
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
      icon: 'text-emerald-400'
    },
    'effects': {
      text: 'text-purple-300',
      border: 'border-purple-500/30',
      icon: 'text-purple-400'
    },
    'swipe': {
      text: 'text-amber-300',
      border: 'border-amber-500/30',
      icon: 'text-amber-400'
    },
    'all': {
      text: 'text-blue-300',
      border: 'border-blue-500/30',
      icon: 'text-blue-400'
    }
  };

  return styles[category] || styles.all;
};

const CodeCard = ({ snippet, isFavorite, onToggleFavorite, onDelete }: CodeCardProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const categoryStyle = getCategoryStyle(snippet.category);

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
    <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900 rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/20 flex flex-col h-full">
      <div className="relative">
        <div className="absolute top-6 left-6 z-10">
          <span className={`px-4 py-1.5 text-xs font-medium bg-gray-900/90 rounded-full border shadow-lg backdrop-blur-sm ${categoryStyle.text} ${categoryStyle.border}`}>
            {snippet.category}
          </span>
        </div>
        
        <div className="thumb-container relative">
          <img
            src={snippet.thumbnail}
            alt={snippet.title}
            className="w-full h-52 object-cover object-top"
          />
          <div 
            className="thumb-overlay absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/80 pointer-events-none"
            style={{ opacity: 0 }}
          />
        </div>
        
        <style jsx>{`
          .thumb-container:hover .thumb-overlay {
            opacity: 1 !important;
            transition: opacity 300ms ease;
          }
          .thumb-overlay {
            transition: opacity 300ms ease;
          }
        `}</style>
        
        <div className="absolute top-6 right-6 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-full text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(true);
            }}
            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2">
          {snippet.title}
        </h3>
        <p className="text-gray-400/80 text-sm mb-4 flex-grow">
          {snippet.description}
        </p>
        
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-4">
            <FavoriteButton
              isFavorite={isFavorite}
              likes={snippet.likes}
              onToggle={onToggleFavorite}
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="text-gray-400 hover:text-blue-400 transition-colors rounded-full hover:bg-blue-500/10 h-9 px-2"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="h-9">
            <CopyButton code={snippet.code} />
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        snippet={snippet}
      />
    </div>
  );
};

export default CodeCard;
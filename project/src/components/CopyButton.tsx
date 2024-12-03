import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  code: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copiado!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copiar Código</span>
        </>
      )}
    </motion.button>
  );
};
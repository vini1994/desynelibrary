import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Prism from 'prismjs';
import { CodeSnippet } from '../types/snippet';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';

interface CodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: CodeSnippet;
}

export const CodeDialog: React.FC<CodeDialogProps> = ({ isOpen, onClose, snippet }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && isOpen) {
      Prism.highlightElement(codeRef.current);
    }
  }, [isOpen, snippet.code]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] bg-gray-900 rounded-xl shadow-xl">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-white">
                {snippet.title}
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="text-gray-400 mt-2">
              {snippet.description}
            </Dialog.Description>
          </div>
          
          <div className="p-6 overflow-auto max-h-[calc(80vh-200px)]">
            <pre className="rounded-lg overflow-x-auto">
              <code ref={codeRef} className={`language-${snippet.language}`}>
                {snippet.code}
              </code>
            </pre>
          </div>
          
          <div className="p-6 border-t border-gray-800">
            <button
              onClick={() => navigator.clipboard.writeText(snippet.code)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Copy Code
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
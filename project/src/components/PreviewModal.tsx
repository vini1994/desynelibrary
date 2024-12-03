import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Smartphone, Monitor } from 'lucide-react';
import { CodeSnippet } from '../types/snippet';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: CodeSnippet;
}

type ViewMode = 'desktop' | 'mobile';

interface ViewSize {
  width: number;
  height: number;
  label: string;
}

const VIEW_SIZES: Record<ViewMode, ViewSize> = {
  desktop: { width: 1920, height: 1080, label: 'Desktop (1920px)' },
  mobile: { width: 390, height: 844, label: 'Mobile (390px)' }
};

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, snippet }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const currentSize = VIEW_SIZES[viewMode];
  const [iframeKey] = useState(() => 'preview-' + Math.random());

  const renderPreview = () => {
    if (!snippet.previewUrl) {
      return (
        <div className="text-red-500 p-4">
          Preview URL não disponível
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1440px] max-w-[95vw] h-[90vh] bg-gray-900 rounded-md shadow-xl flex flex-col overflow-hidden z-[60]">
          <div className="p-5 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-white">
                {snippet.title}
              </Dialog.Title>
              
              <div className="absolute left-1/2 top-4 -translate-x-1/2 flex items-center">
                <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'desktop'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    title={VIEW_SIZES.desktop.label}
                  >
                    <Monitor className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'mobile'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    title={VIEW_SIZES.mobile.label}
                  >
                    <Smartphone className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <Dialog.Close className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
          </div>
          
          <div className="flex-1 bg-gray-800 flex items-center justify-center">
            <iframe
              key={iframeKey}
              src={snippet.previewUrl}
              className={`bg-white ${viewMode === 'mobile' ? 'h-full' : 'w-full h-full'}`}
              style={{
                width: viewMode === 'mobile' ? `${currentSize.width}px` : '100%',
                height: viewMode === 'mobile' ? '100%' : '100%'
              }}
              title={`Preview of ${snippet.title}`}
              loading="eager"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

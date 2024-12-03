import React from 'react';
import { useParams } from 'react-router-dom';
import { CodeSnippet } from '../types/snippet';
import { CopyButton } from '../components/CopyButton';
import { loadSnippets } from '../data/snippets';

export const PublicPreview: React.FC = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = React.useState<CodeSnippet | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const snippets = loadSnippets();
    const foundSnippet = snippets.find(s => s.id === id);
    if (foundSnippet) {
      setSnippet(foundSnippet);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Component not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-md overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-white">{snippet.title}</h1>
                {snippet.description && (
                  <p className="mt-2 text-gray-400">{snippet.description}</p>
                )}
              </div>
              <CopyButton code={snippet.code} />
            </div>
          </div>
          
          <div className="aspect-video bg-gray-800">
            <iframe
              src={snippet.previewUrl}
              className="w-full h-full bg-white"
              title={`Preview of ${snippet.title}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

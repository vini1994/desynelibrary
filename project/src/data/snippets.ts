// Interface para os snippets
export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  thumbnail?: string;
  likes: number;
}

const STORAGE_KEY = 'codegallery_snippets';

// Função para carregar snippets do localStorage
export const loadSnippets = (): CodeSnippet[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return initialSnippets;
};

// Função para salvar snippets no localStorage
export const saveSnippets = (snippets: CodeSnippet[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
};

// Snippets iniciais (serão usados apenas se não houver dados no localStorage)
export const initialSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'Modal Animado',
    description: 'Um componente modal reutilizável com animações suaves.',
    code: `export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};`,
    language: 'javascript',
    category: 'components',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    likes: 42
  },
  {
    id: '2',
    title: 'Efeito Parallax',
    description: 'Efeito de rolagem parallax suave usando Framer Motion.',
    code: `export const ParallaxSection = () => {
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  return (
    <motion.div style={{ y }} className="parallax-container">
      {/* Conteúdo */}
    </motion.div>
  );
};`,
    language: 'javascript',
    category: 'effects',
    thumbnail: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&w=800&q=80',
    likes: 38
  },
  {
    id: '3',
    title: 'Deslizar para Deletar',
    description: 'Interação suave de deslizar para deletar itens da lista.',
    code: `export const SwipeItem = ({ onDelete, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, { offset }) => {
        if (offset.x < -50) onDelete();
        setIsDragging(false);
      }}
    >
      {children}
    </motion.div>
  );
};`,
    language: 'javascript',
    category: 'swipe',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    likes: 56
  }
];

// Carrega os snippets do localStorage ou usa os iniciais
export const snippets = loadSnippets();

// Função para adicionar um novo snippet
export const addSnippet = (snippet: CodeSnippet): CodeSnippet[] => {
  const updatedSnippets = [...snippets, snippet];
  saveSnippets(updatedSnippets);
  return updatedSnippets;
};
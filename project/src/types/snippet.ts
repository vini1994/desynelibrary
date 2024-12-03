export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  thumbnail: string;
  language: string;
  likes: number;
  previewUrl?: string;
}
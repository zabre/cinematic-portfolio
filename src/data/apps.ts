export interface App {
  id: string
  title: string
  subtitle: string
  description: string
  url: string
  color: string
  accent: string
  emoji: string
  tags: string[]
  size: 'large' | 'medium' | 'small'
  depth: number   // 0.0–1.0 — parallax intensity
}

export const APPS: App[] = [
  {
    id: 'social-listening',
    title: 'Social Listening',
    subtitle: 'Topic Modeling · BERTopic · LLMs',
    description:
      'Real-time social media analysis pipeline leveraging BERTopic and large language models to extract emerging narratives and sentiment trends from millions of posts.',
    url: 'https://example.com',
    color: '#7B2FFF',
    accent: '#A855F7',
    emoji: '🧠',
    tags: ['NLP', 'BERTopic', 'Python', 'Streamlit'],
    size: 'large',
    depth: 0.9,
  },
  {
    id: 'parliament-viz',
    title: 'Parliament Viz',
    subtitle: 'European Parliament · Data Analysis',
    description:
      'Interactive visualization of European Parliament voting data, speeches, and political alignment scraped from official APIs and enriched with NLP annotations.',
    url: 'https://example.com',
    color: '#1A56DB',
    accent: '#3B82F6',
    emoji: '🏛️',
    tags: ['React', 'D3.js', 'Europarl API', 'Python'],
    size: 'medium',
    depth: 0.5,
  },
  {
    id: '3d-viewer',
    title: '3D Model Viewer',
    subtitle: 'Three.js · WebGL · GLB',
    description:
      'Ultra-smooth 3D model visualizer supporting GLB/GLTF files with PBR lighting, environment maps, and touch-optimized orbit controls.',
    url: 'https://example.com',
    color: '#0F766E',
    accent: '#14B8A6',
    emoji: '🎮',
    tags: ['Three.js', 'React', 'WebGL', 'Next.js'],
    size: 'medium',
    depth: 0.3,
  },
  {
    id: 'llm-pipeline',
    title: 'LLM Pipeline',
    subtitle: 'Groq · RAG · Embeddings',
    description:
      'Production-grade retrieval augmented generation pipeline with Groq inference, vector embeddings, and a conversational interface for document analysis.',
    url: 'https://example.com',
    color: '#B45309',
    accent: '#F59E0B',
    emoji: '⚡',
    tags: ['LangChain', 'Groq', 'Python', 'FastAPI'],
    size: 'small',
    depth: 0.7,
  },
  {
    id: 'media-monitor',
    title: 'Media Monitor',
    subtitle: 'Press · Sentiment · Clustering',
    description:
      'Automated press monitoring tool that clusters news articles by topic, scores sentiment, and surfaces editorial signals for brand intelligence.',
    url: 'https://example.com',
    color: '#9D174D',
    accent: '#EC4899',
    emoji: '📡',
    tags: ['TBWA', 'Sentiment', 'Clustering', 'Streamlit'],
    size: 'small',
    depth: 0.6,
  },
  {
    id: 'data-etl',
    title: 'Data ETL Studio',
    subtitle: 'Pipelines · Automation · APIs',
    description:
      'Visual ETL orchestration interface for data ingestion, transformation, and export across heterogeneous sources — built for large-scale corpora.',
    url: 'https://example.com',
    color: '#065F46',
    accent: '#10B981',
    emoji: '🔧',
    tags: ['Python', 'Pandas', 'APIs', 'Automation'],
    size: 'small',
    depth: 0.4,
  },
]

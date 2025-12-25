import { PresentationStyle, PresentationTone } from './types';

export const STYLES: { value: PresentationStyle; label: string; desc: string }[] = [
  { value: 'corporate', label: 'Corporate', desc: 'Clean, authoritative, blue/grey tones' },
  { value: 'minimal', label: 'Minimalist', desc: 'High whitespace, bold typography, stark' },
  { value: 'artistic', label: 'Artistic', desc: 'Creative, colorful, abstract shapes' },
  { value: 'technical', label: 'Engineering/Technical', desc: 'Schematics, cutaways, blueprints, white-paper style' },
];

export const TONES: { value: PresentationTone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'technical', label: 'Technical' },
  { value: 'creative', label: 'Creative' },
];

export const MOCK_IMAGES = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
  "https://picsum.photos/1920/1080?random=5",
  "https://picsum.photos/1920/1080?random=6",
  "https://picsum.photos/1920/1080?random=7",
  "https://picsum.photos/1920/1080?random=8",
];
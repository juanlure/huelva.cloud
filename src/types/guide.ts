import { InteractiveData } from '../lib/agents/classifier';

export interface GuidePlace {
    id: string; // Unique identifier for the place within the guide
    name: string;
    address?: string;
    googleMapsUrl?: string; // Crucial for "Take me there"
    description: string;
    priceRange?: '€' | '€€' | '€€€';
    tip?: string; // "Consejo Choquero: Pide la media ración."
    images?: string[];
    bestFor?: string[]; // tags like "Vistas", "Romántico", "Tapeo"
}

export interface GuideChapter {
    id: string;
    title: string;
    summary?: string;
    coverImage?: string;
    content: string; // HTML content for the narrative part (intro to the chapter)
    places?: GuidePlace[]; // Structured list of places mentioned in this chapter
}

export interface Guide {
    slug: string;
    title: string;
    subtitle: string;
    authorId: string;
    heroImage: string;
    chapters: GuideChapter[];
    interactiveElement?: InteractiveData; // For quizzes or complex widgets 
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

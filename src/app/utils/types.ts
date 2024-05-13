export type SearchResult = {
    title: string;
    category: string;
    hot?: boolean;
    image: string;
    artists?: string;
    date?: string;
    platform: string;
    city?: string;
    address?: string;
    lng?: number;
    lat?: number;
    rating?: number;
    priceRange?: string;
    score: number;
    wantNum?: string;
    wantNumSuffix?: string;
    wantDesc?: string;
};

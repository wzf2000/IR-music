export interface SearchResult {
    id: string;
    title: string;
    category: string;
    hot?: boolean;
    generalAgent?: boolean;
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
    projectLink?: string;
};

export interface Tour {
    itemId: string;
    city: string;
    showTime: string;
}

export interface DetailResult {
    id: string;
    title: string;
    platform: string;
    category: string;
    artists: string[];
    showStatus: string;
    showTime: string;
    sessionTime: string[];
    price: string;
    isGeneralAgent: boolean;
    rating: number | null;
    city: string;
    venueName: string | null;
    venueAddress: string | null;
    lng: number | null;
    lat: number | null;
    projectInfo: string;
    projectImgs: string[];
    wantNum: string | null;
    wantNumSuffix: string | null;
    wantDesc: string | null;
    tours: Tour[];
    projectLink: string | null;
};

export interface CityType {
    code: string;
    province: string;
    label: string;
    suggested?: boolean;
};

export interface Restaurant {
    geometry: Geometry;
    icon: string;
    id: string;
    name: string;
    opening_hours: OpeningHours;
    place_id: string;
    reference: string;
    scope: string;
    types: string[];
    vicinity: string;
    photos: Photo[];
    rating?: number;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
}

export interface Geometry {
    location: Location;
    viewport: Viewport;
}

export interface OpeningHours {
    open_now: boolean;
    weekday_text: any[];
}

export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}





export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
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

export interface Close {
    day: number;
    time: string;
}

export interface Open {
    day: number;
    time: string;
}

export interface Period {
    close: Close;
    open: Open;
}

export interface OpeningHours {
    open_now: boolean;
    periods: Period[];
    weekday_text: string[];
}

export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export interface Aspect {
    rating: number;
    type: string;
}

export interface Review {
    aspects: Aspect[];
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    text: string;
    time: number;
}

export interface RestaurantDetail {
    address_components: AddressComponent[];
    adr_address: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: Geometry;
    icon: string;
    id: string;
    international_phone_number: string;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    place_id: string;
    rating: number;
    reference: string;
    reviews: Review[];
    scope: string;
    types: string[];
    url: string;
    utc_offset: number;
    vicinity: string;
}


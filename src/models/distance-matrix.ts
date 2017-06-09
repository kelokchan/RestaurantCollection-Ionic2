export interface DistanceMatrix {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: Row[];
    status: string;
}

export interface Distance {
    text: string;
    value: number;
}

export interface Duration {
    text: string;
    value: number;
}

export interface Element {
    distance: Distance;
    duration: Duration;
    status: string;
}

export interface Row {
    elements: Element[];
}




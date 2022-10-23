export interface Business {
    id: string;
    alias: string;
    name: string;
    image_url: string;
    is_closed: boolean;
    url: string;
    review_count: number;
    categories: Categories[];
    rating: number;
    coordinates: any;
    transactions: any;
    price: string;
    location:Location
    phone: string;
    display_phone: string;
    distance: any;
}

export interface Categories {
    alias: string;
    title: string;
}
export interface Location {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: any;
}


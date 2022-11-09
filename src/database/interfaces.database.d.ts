export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    created_at: Date;
}

export interface User_Address {
    id?: number;
    user_id: number;
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
}

interface Products_Rating {
    id?: number;
    user_id: number;
    product_id: number;
    rating: number;
    created_at: Date;
}

interface Invoices {
    id?: number;
    user_id: number;
    product_id: number;
    quantity: number;
    created_at: Date;
}

interface Users_Cart {
    id?: number;
    user_id: number;
    product_id: number;
    quantity: number;
}

interface  Users_Commands {
    id?: number;
    user_id: number;
    product_id: number;
    quantity: number;
    created_at: Date;
}

interface Users_Payment {
    id?: number;
    user_id: number;
    card_number: string;
    card_name: string;
    card_expiration: string;
    card_cvv: string;
    created_at: Date;
}
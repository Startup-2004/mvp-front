import { Price } from "./Price";

export interface Product {
    id: string;
    active: true;
    description: string;
    images: string[];
    metadata: { seller: string };
    name: string;
    stripe_metadata_seller: string;
    price?: Price;
}

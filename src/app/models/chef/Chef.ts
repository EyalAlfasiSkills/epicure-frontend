import { Restaurant } from "../restaurant/Restaurant";

export interface Chef {
    _id: string;
    name: string;
    restaurants?: Restaurant[];
    imgUrl?: string;
    about: string;
}
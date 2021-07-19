import { Restaurant } from "../restaurant/Restaurant";

export interface Chef {
    name: string;
    restaurant?: Restaurant[];
    imgUrl?: string;
}
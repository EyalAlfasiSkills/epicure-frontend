import { Restaurant } from "../restaurant/Restaurant";
import { DishType } from "./DishType";

export interface Dish {
    _id: string;
    imgUrl?: string;
    restaurant?: Restaurant;
    name?: string;
    ingredients?: string;
    price?: number;
    isSignature: boolean;
    types?: DishType[]
}
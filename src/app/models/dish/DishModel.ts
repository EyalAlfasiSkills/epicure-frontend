import { RestaurantModel } from "../restaurant/RestaurantModel";
import { DishType } from "./DishType";

export interface DishModel {
    _id: string;
    imgUrl: string;
    restaurant: RestaurantModel;
    name: string;
    ingredients: string;
    price: number;
    isSignature: boolean;
    types?: DishType[]
}
import { RestaurantModel } from "../restaurant/RestaurantModel";

export interface ChefModel {
    _id: string;
    name: string;
    restaurants: RestaurantModel[];
    imgUrl: string;
    about: string;
}
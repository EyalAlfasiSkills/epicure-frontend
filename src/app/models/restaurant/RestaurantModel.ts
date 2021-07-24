import { ChefModel } from "../chef/ChefModel";
import { DishModel } from "../dish/DishModel";

export interface RestaurantModel {
    _id: string;
    imgUrl: string;
    name: string;
    chef: ChefModel;
    dishes: DishModel[];
    isPopular?: boolean;
}
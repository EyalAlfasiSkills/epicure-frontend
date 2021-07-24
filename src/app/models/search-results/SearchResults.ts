import { ChefModel } from "../chef/ChefModel";
import { DishModel } from "../dish/DishModel";
import { RestaurantModel } from "../restaurant/RestaurantModel";

export interface SearchResults {
    chefs: ChefModel[],
    dishes: DishModel[],
    restaurants: RestaurantModel[]
}
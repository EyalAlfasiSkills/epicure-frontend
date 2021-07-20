import { Chef } from "../chef/Chef";
import { Dish } from "../dish/Dish";
import { Restaurant } from "../restaurant/Restaurant";

export interface SearchResults {
    chefs: Chef[],
    dishes: Dish[],
    restaurants: Restaurant[]
}
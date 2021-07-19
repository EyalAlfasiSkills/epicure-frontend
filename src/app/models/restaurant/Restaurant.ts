import { Chef } from "../chef/Chef";
import { Dish } from "../dish/Dish";

export interface Restaurant {
    imgUrl?: string;
    name?: string;
    chef?: Chef;
    dishes?: Dish[];
    isPopular?: boolean;
}
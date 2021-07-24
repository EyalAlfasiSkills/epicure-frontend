import { User } from "./User";

export interface SuccessfulLoginObject {
    message: string;
    accessToken: string;
    user: User;
}
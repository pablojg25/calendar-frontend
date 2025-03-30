import { User } from "./user";

export interface SubscriptionsResponse {
    status:String,
    message:String,
    body:User[]
}
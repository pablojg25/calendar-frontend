import { User } from "./user";

export interface UserResponse {
    status:String,
    message:String,
    body:User
}
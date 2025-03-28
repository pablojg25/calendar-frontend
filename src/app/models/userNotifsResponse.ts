import { UserNotif } from "./usernotifs";

export interface UserNotifsResponse {
    status:number;
    message:string;
    body:UserNotif[];
}
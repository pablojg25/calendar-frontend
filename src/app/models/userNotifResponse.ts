import { UserNotif } from "./usernotifs";

export interface UserNotifResponse {
    status:number;
    message:string;
    body:UserNotif;
}
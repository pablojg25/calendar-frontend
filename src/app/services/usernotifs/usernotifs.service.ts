import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { UserNotifsResponse } from '../../models/userNotifsResponse';
import { UserNotif } from '../../models/usernotifs';
import { NotifTypesResponse } from '../../models/notifTypesResponse';
import { UserNotifRequest } from '../../models/userNotifRequest';
import { UserNotifResponse } from '../../models/userNotifResponse';

@Injectable({
  providedIn: 'root'
})
export class UsernotifsService {

  constructor(private http:HttpClient) { }

  getNotifs () : Observable<UserNotif[]> {
    return this.http.get<UserNotifsResponse>(environment.urlApi + "/notifications").pipe(
      map(notifsData => notifsData.body),
      catchError(this.handleError)
    );
  }

  getNotifTypes () :Observable<String[]> {
    return this.http.get<NotifTypesResponse>(environment.urlApi + "/notifications/types").pipe(
      map(notifTypes => notifTypes.body),
      catchError(this.handleError)
    );
  }

  createNotif(notifData: UserNotifRequest) : Observable<UserNotif> {
    return this.http.post<UserNotifResponse>(environment.urlApi + "/notifications", notifData).pipe(
      map(notifData => notifData.body),
      catchError(this.handleError)
    );
  }

  updateNotif(id:Number, notifData: UserNotifRequest) : Observable<UserNotif> {
    return this.http.put<UserNotifResponse>(environment.urlApi + "/notifications/" + id, notifData).pipe(
      map(notifData => notifData.body),
      catchError(this.handleError)
    );
  }

  deleteNotif(id: number) {
    return this.http.delete<UserNotifResponse>(environment.urlApi + "/notifications/" + id).pipe(
      map(notifData => notifData.body),
      catchError(this.handleError)
    );
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => new Error("Hubo un error en el procesado de notificaciones"));
  }

}

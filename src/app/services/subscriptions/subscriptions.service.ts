import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserResponse } from '../../models/UserResponse';
import { environment } from '../../../environments/environment';
import { SubscriptionsResponse } from '../../models/subscriptionsResponse';
import { User } from '../../models/user';
import { CheckSubscriptionResponse } from '../../models/checkSubscriptionResponse';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http:HttpClient) {}

  getSubscriptions():Observable<User[]> {
    return this.http.get<SubscriptionsResponse>(environment.urlApi + "/subscriptions").pipe(
      map(notifsData => notifsData.body),
      catchError(this.handleError)
    )
  }

  getUser(email:String):Observable<User> {
    return this.http.get<UserResponse>(environment.urlApi + "/users/" + email).pipe(
      map(notifsData => notifsData.body),
      catchError(this.handleError)
    )
  }

  checkSubscription(email:String):Observable<Boolean> {
    return this.http.get<CheckSubscriptionResponse>(environment.urlApi + "/subscriptions/" + email).pipe(
      map(notifsData => notifsData.body),
      catchError(this.handleError)
    )
  }

  subscribe(email:String):Observable<void> {
    return this.http.post<void>(environment.urlApi + "/subscriptions/" + email, '').pipe(
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => new Error("Hubo un error en la obtención de suscripciones"));
  }

}

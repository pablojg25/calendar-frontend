import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernotifsService {

  constructor(private http:HttpClient) { }

  getNotifs () : Observable<any> {
    return this.http.get(environment.urlApi + "/notifications").pipe(
      catchError(this.handleError)
    );
  }

  handleError(error:HttpErrorResponse) {
    return throwError(() => new Error("Hubo un error al obtener las notificaciones"));
  }


}

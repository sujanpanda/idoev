import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private _likevenuesUrl = "api/likevenue";
  private _likeslistUrl = "api/getlikes/";

  constructor(private http: HttpClient) { }

  getLikesList(id) {
  	return this.http.get<any>(this._likeslistUrl+id)
  }

  likesUpdate(likesUpdData) {
    return this.http.post<any>(this._likevenuesUrl, likesUpdData).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }
}

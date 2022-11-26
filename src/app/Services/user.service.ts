import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { User } from '../Interface/Employee';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'http://localhost:3005/posts'
  userListApi = 'https://fakestoreapi.com/users'
  isLoggedIn:boolean = false;
  
  constructor(private http : HttpClient) { }


  getAllUsers(): Observable<any>{
    return this.http.get(this.userListApi);
  }
  login(body: object) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.userUrl, body).pipe(
      take(1),
      map(
        (result) => { console.log(result.token); return result }
      )
    )
  }
}

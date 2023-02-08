import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  // getAll
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.URL);
  };

  // register
  postRegister(body:any): Observable<Object> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    let options = { headers };
    
    return this.http.post<Object>(this.URL, body, options);
  };

  // login
  putLogin(body:any): Observable<Object> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    let options = { headers };
    
    return this.http.put<Object>(this.URL, body, options);
  };
}

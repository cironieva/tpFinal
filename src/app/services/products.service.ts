import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL: string = "http://localhost:3000/products";

  constructor(private http: HttpClient) {};

  // Create
  createProduct(body:any): Observable<Object> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers };
    return this.http.post<Object>(this.URL, body, options);
  };

  // Read 
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.URL);
  };

  // Get one
  getProduct(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.URL}/${id}`);
  };

  // Update
  updateProduct(id:number, body: any): Observable<Object> {
    return this.http.put<Object>(`${this.URL}/${id}`, body);
  };

  // Delete
  deleteProduct(id:number): Observable<Object> {
    return this.http.delete<Object>(`${this.URL}/${id}`);
  };
};

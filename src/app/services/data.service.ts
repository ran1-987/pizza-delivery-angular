import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = "http://localhost:5000/api"
  constructor(private httpClient: HttpClient) { }
  private header = inject(AuthService)
  get_Data(url: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${url}`)
  }
  post_pizza(payload: any): Observable<any> {
    const url = `${this.baseUrl}/orders`
    const headers = this.header.getAuthHeaders()
    console.log(headers)
    return this.httpClient.post(url, payload, { headers })
  }
  getOrdersByUserId(id:string):Observable<any>{
    const url = `${this.baseUrl}/orders/user/${id}`
    const headers = this.header.getAuthHeaders()
    console.log(headers)
    return this.httpClient.get(url, { headers })
  }
}

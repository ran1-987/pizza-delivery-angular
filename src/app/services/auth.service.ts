import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/api/auth';  // Replace with your actual API base URL

  constructor(private http: HttpClient, private router: Router) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');  // Check if the token is stored in localStorage
  }

  // Get the Auth token
  getAuthToken(): string {
    return localStorage.getItem('authToken') || '';  // Return the token if available
  }

  // Handle user registration
  register(username: string, email: string, password: string, address: string): Observable<any> {
    const requestBody = {
      username,
      email,
      password,
      address
    };

    return this.http.post<any>(`${this.baseUrl}/register`, requestBody);
  }

  // Handle user login
  login(email: string, password: string): Observable<any> {
    const requestBody = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, requestBody);
  }

  // Store the token in localStorage
  storeAuthToken(token: string): void {
    localStorage.setItem('authToken', token);  // Store the token
  }

  // Clear the token (log out)
  logout(): void {
    localStorage.removeItem('authToken');  // Remove the token on logout
    this.router.navigate(['/login']);  // Navigate to login page
  }

  // Get the HTTP headers with the Bearer token
  getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}

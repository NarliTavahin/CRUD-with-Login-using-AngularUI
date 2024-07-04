import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../Modals/api-modals';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = 'https://reqres.in/api/';
  apiAvatar = 'https://reqres.in/img/faces/';

  constructor(private _http: HttpClient) {}

  // Get all users
  getUserList(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}users`);
  }

  getUserById(id: number): Observable<user> {
    return this._http.get<user>(`${this.apiUrl}users/${id}`);
  }

  // Avatar of user
  AvatarUser(id: number): Observable<any> {
    return this._http.get<any>(`${this.apiAvatar}${id}-image.jpg`);
  }

  // Delete user
  deleteUser(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}users/${id}`);
  }

  // Create a new user
  addUser(user: any) {
    return this._http.post(`${this.apiUrl}users`, user);
  }

  // Update user details
  updateUser(id: number, user: any) {
    return this._http.put(`${this.apiUrl}users/${id}`, user);
  }
}

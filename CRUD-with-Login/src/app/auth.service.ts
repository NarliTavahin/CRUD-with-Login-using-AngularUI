
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn.next(true);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    console.log('User logged out');

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}

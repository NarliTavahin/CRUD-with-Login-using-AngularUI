import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.authService
      .login(this.username, this.password)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this._coreService.openSnackBar('Login Successful!');
          this.router.navigate(['/User-List']);
        } else {
          this._coreService.openSnackBar('Login failed. Invalid credentials!');
          console.log('Login failed. Invalid credentials.');
        }
      });
  }
}

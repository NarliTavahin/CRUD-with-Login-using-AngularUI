import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'DONE !!!') {
    this._snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'top',
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../Service/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css'],
})
export class ReadUserComponent implements OnInit {
  ReadUserForm!: FormGroup;

  constructor(
    private _fbRead: FormBuilder,
    private _userService: ServiceService,
    private _dialogRef: MatDialogRef<ReadUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.ReadUserForm = this._fbRead.group({
      id: [{ value: '', disabled: true }],
      first_name: [{ value: '', disabled: true }],
      last_name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      avatar: [{ value: '', disabled: true }],
    });

    console.log('UserId:', this.data['userId']); 

    this._userService.getUserById(this.data['userId']).subscribe((res) => {
      console.log('User data:', res); 
      this.ReadUserForm.patchValue({
        avatar: res['data']['avatar'],
        id: res['data']['id'],
        first_name: res['data']['first_name'],
        last_name: res['data']['last_name'],
        email: res['data']['email'],
      });
    });
  }

  onClose(): void {
    this._dialogRef.close();
  }
}

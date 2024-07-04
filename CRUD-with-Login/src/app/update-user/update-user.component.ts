import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../Service/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  updateUserForm!: FormGroup;

  constructor(
    private _fbUpdate: FormBuilder,
    private _userService: ServiceService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateUserForm = this._fbUpdate.group({
      first_name: [data.first_name],
      last_name: [data.last_name],
      email: [data.email],
      avatar: [data.avatar],
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.updateUserForm.valid) {
      this._userService
        .updateUser(this.data.id, this.updateUserForm.value)
        .subscribe({
          next: (val: any) => {
            console.log(val);
            this._coreService.openSnackBar('User Updated Successfully !!!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this._coreService.openSnackBar('You have an error.');
            console.error(err);
          },
        });
    }
  }

  onClose() {
    this._dialogRef.close();
  }
}

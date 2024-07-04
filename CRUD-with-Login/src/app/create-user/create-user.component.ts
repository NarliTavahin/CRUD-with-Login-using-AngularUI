
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../Service/service.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  onClose() {
    throw new Error('Method not implemented.');
  }
  userForm: FormGroup;
  readUserForm!: FormGroup<any>;

  constructor(
    private _fb: FormBuilder,
    private _userService: ServiceService,
    private _dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.userForm = this._fb.group({
      first_name: [data.first_name, Validators.required],
      last_name: [data.last_name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      avatar: [data.avatar],
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.userForm.valid) {
      this._userService.addUser(this.userForm.value).subscribe({
        next: (val: any) => {
          console.log(val);
          this._coreService.openSnackBar('New User Created Successfully!!!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          this._coreService.openSnackBar('You have a error.');
          console.error(err);
        },
      });
    }
  }

  closeDialog() {
    this._dialogRef.close();
  }
}

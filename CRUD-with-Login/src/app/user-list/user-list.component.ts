
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../Service/service.service';
import { user } from '../Modals/api-modals';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ReadUserComponent } from '../read-user/read-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { CoreService } from '../core/core.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
    'action',
  ];
  dataSource!: MatTableDataSource<user>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users: user[] = [];

  constructor(
    private _Service: ServiceService,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this._Service.getUserList().subscribe({
      next: (res) => {
        console.log(res);
        this.users = res.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error,
    });
  }

  // -----------------------------------Create--------------------------------------------

  openDialog() {
    const dialogRef = this._dialog.open(CreateUserComponent, {
      width: '400px',
      data: {
        first_name: '',
        last_name: '',
        avatar: '',
        email: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserList();
      }
    });
  }

  // -----------------------------------Read User--------------------------------------------
  openReadUserDialog(userId: number): void {
    this._dialog.open(ReadUserComponent, {
      data: { userId: userId },
    });
  }
  // -----------------------------------Update User--------------------------------------------

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(UpdateUserComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

  // -----------------------------------Delete--------------------------------------------

  deleteUser(id: number): void {
    this._Service.deleteUser(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('User Deleted Successfully !!!');
        console.log('User Deleted Successfully !!!');
        this.getUserList();
      },
      error: (err) => {
        this._coreService.openSnackBar('Error Deleting User !!!!');

        console.error('Error deleting user:', err);
      },
    });
  }

  // -----------------------------------LogOUT--------------------------------------------

  onLogout(): void {
    this._authService.logout();
  }

  // -----------------------------------applyFilter--------------------------------------------

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

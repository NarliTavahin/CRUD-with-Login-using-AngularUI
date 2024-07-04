import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ReadUserComponent } from './read-user/read-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'User-List', component: UserListComponent, canActivate: [AuthGuard] },
  {
    path: 'Create-User',
    component: CreateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'read-user/:id',
    component: ReadUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Update-User',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

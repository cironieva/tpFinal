import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'STR Guitars';
  cookieValue = this.cookieService.get('session');
  userList: any;

  constructor (
    private router: Router,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private usersService: UsersService,
  ) {}
  
  ngOnInit(): void {
    this.usersService.getComments().subscribe((data: any) => {
      this.userList = data;
    });

    const registerDialogConfig = new MatDialogConfig();
    registerDialogConfig.disableClose = true;
    registerDialogConfig.height="52vh";
    registerDialogConfig.width="15vw";


    const loginDialogConfig = new MatDialogConfig();
    loginDialogConfig.disableClose = true;
    loginDialogConfig.height="32vh";
    loginDialogConfig.width="15vw";

    if (!this.cookieValue) {
      this.dialog.open(LoginComponent, loginDialogConfig);
      this.dialog.open(RegisterComponent, registerDialogConfig);
    };
  };

  redirect(page:string) {
    this.router.navigate([`${page}`]);
  };

  onLogOut() {
    this.cookieService.delete('session');
    this.router.navigate(['']);
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
};

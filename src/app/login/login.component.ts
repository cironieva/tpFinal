import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userList: any;
  dataFinal: any;

  constructor (
    private fb: FormBuilder,
    private usersService: UsersService,
    public loginDialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private cookieService: CookieService
  ) {};

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(8)]]
    });

    this.usersService.getComments().subscribe((data: any) => {
      this.userList = data;
    });
  };

  validInput(input: string) {
    return this.loginForm.controls[input].errors && this.loginForm.controls[input].touched;
  };

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }

    else {
      this.usersService.putLogin(JSON.stringify(this.loginForm.value)).subscribe(data => {
        this.dataFinal = data;
        if (this.dataFinal.password == 'correct') {
          this.loginDialogRef.close();
          this.cookieService.set('session', 'initialized');
        };
      });
    };
  };
};

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  userList: any;
  error: any;

  constructor (
    private fb: FormBuilder,
    private usersService: UsersService,

    public registerDialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {};

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(8)]]
    });

    this.usersService.getComments().subscribe((data: any) => {
      this.userList = data;
    });
  };

  validInput(input: string) {
    return this.registerForm.controls[input].errors && this.registerForm.controls[input].touched;
  };

  onRegister() {
    
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }

    else {
      this.usersService.postRegister(JSON.stringify(this.registerForm.value)).subscribe(data => {
        this.error = data;
      });
    };
  };

  onLogin() {
    this.registerDialogRef.close();
  };
};

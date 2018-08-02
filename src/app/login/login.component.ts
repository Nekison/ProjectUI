import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Oculto: boolean;
  UserActive: User;
  constructor(
    private helperService: HelperService,
    private userFormBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
  ) { }
  userFormGroup: FormGroup;

  ngOnInit() {
    this.userFormGroup = this.userFormBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }
  submitLogin() {
    this.authService.LoginUser(this.userFormGroup.value)
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data._body);
        this.getUserValues(this.userFormGroup.value.Email);
      }, error => {
        console.error('Error of token');
      });
  }

  getUserValues(email: string) {
    this.userService.getUserByEmail(email).subscribe((user: User) => {
      this.UserActive = user;
      this.helperService.claims = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.userService.UserActive = user.RoleID;
      console.log(user);
    });
  }

}

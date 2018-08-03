import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Service
import { HelperService } from '../services/helper.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { RolService } from '../services/rol.service';
// Models
import { Permissions } from '../models/Permissions.model';
import { User } from '../models/user.model';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: Boolean = false;
  Oculto: boolean;
  userFormGroup: FormGroup;
  constructor(
    private helperService: HelperService,
    private userFormBuilder: FormBuilder,
    private route: Router,
    private roleService: RolService,
    private authService: AuthService,
    private userService: UserService,
  ) { }

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
        // this.getUserValues(this.userFormGroup.value.Email);
        this.userService.getUserByEmail(this.userFormGroup.value.Email).subscribe((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          // this.generateRoles(user.RoleID);
          const permissions: string[] = [];
          this.roleService.getPermissionsByRole(user.RoleID).subscribe((List: Permissions[]) => {
            if (List !== null) {
              List.forEach(p => {
                permissions.push(p.Name);
              });
              // localStorage.setItem('Active', 'true');
              localStorage.setItem('Permissions', JSON.stringify(permissions));
              console.log(JSON.parse(localStorage.getItem('Permissions')));
              this.route.navigate(['Home']);
            } else {
              console.error('No exist roles for this user');
            }
          });
          console.log('submit');
        });
        console.log('submit2');
      }, (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

  // getUserValues(email: string) {
  //   this.userService.getUserByEmail(email).subscribe((user: User) => {
  //     this.UserActive = user;
  //     this.helperService.claims = user;
  //     localStorage.setItem('user', JSON.stringify(user));
  //     this.generateRoles(user.RoleID);
  //     console.log('submit');
  //   });
  // }

  // generateRoles(roleID: number) {
  //   const permissions: string[] = [];
  //   this.roleService.getPermissionsByRole(roleID).subscribe((List: Permissions[]) => {
  //     if (List !== null) {
  //       List.forEach(p => {
  //         permissions.push(p.Name);
  //       });
  //       // localStorage.setItem('Active', 'true');
  //       localStorage.setItem('Permissions', JSON.stringify(permissions));
  //       console.log(JSON.parse(localStorage.getItem('Permissions')));
  //       this.route.navigate(['Home']);
  //     } else {
  //       console.error('No exist roles for this user');
  //     }
  //   });

  // }

}

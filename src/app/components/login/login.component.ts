import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/Interface/Employee';
import { UserService } from 'src/app/Services/user.service';

export interface userdata {
  AccessToken: string,
  Comment: number,
  Message: string,
  applicationUser: {
    AccessFailedCount: number,
    AccessToken: string,
    Email: string,
    EmailConfirmed: boolean,
    Id: string,
    LockoutEnabled: boolean,
    LockoutEndDateUtc: any,
    Logins: [],
    PhoneNumber: string,
    PhoneNumberConfirmed: false,
    User_Name: string,
    FirstName: string,
    LastName: string
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  preloader: boolean = true;
  isValidFormSubmitted: boolean = false;
  find: boolean = false;
  loginObj: User = new User();
  userList: any;
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  constructor(public router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.minLength(8), Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.preloader = false;
    this.getAllUsers();
  }
  /* Get All Users From Users Json */
  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.userList = res;
    })
  }
  /* Check If The User Has An Email befor Or Not */
  findUser(email: string, password: string): boolean {
    console.log(this.userList, 'users');
    this.userList.find((user: any) => {
      if (user.email == email && user.password == password) {
        console.log("Findeee");
        this.find = true
      }
    })
    return this.find;
  }
  login() {
    this.isValidFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.findUser(this.loginForm.value.email, this.loginForm.value.password)) {
      this.userService.isLoggedIn= true;
      this.router.navigate(['/employee'])
      // this.userService.login(this.loginForm.value).subscribe((res) => {
      //   console.log(res), 'res';
      //   localStorage.setItem('userToken', res.token);
      // })
    }
  }
  toHomepage() {
    this.router.navigate(['']);
  }
}

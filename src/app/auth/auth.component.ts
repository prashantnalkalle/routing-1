import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../shared/service/snackbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  mode: 'login' | 'register' = 'login';

  constructor(private _service:AuthService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private snackbar:SnackbarService
  ){
    this.updateModeControls();
  }

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    userRole:new FormControl(null,[Validators.required])
  });

  get fields() {
    return {
      name: this.form.get('name')!,
      email: this.form.get('email')!,
      password: this.form.get('password')!,
      userRole: this.form.get('userRole')!
    };
  }

  setMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.form.reset();
    this.updateModeControls();
  }

  private updateModeControls(): void {
    const isRegister = this.mode === 'register';
    const name = this.form.get('name')!;
    const userRole = this.form.get('userRole')!;

    if (isRegister) {
      name.enable();
      name.setValidators(Validators.required);
      userRole.enable();
      userRole.setValidators(Validators.required);
    } else {
      name.clearValidators();
      name.disable();
      userRole.clearValidators();
      userRole.disable();
    }

    name.updateValueAndValidity();
    userRole.updateValueAndValidity();
  }

  handleFormSubmit(): void {
    if (this.mode === 'register') {
      this.signup();
      return;
    }

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const user = this.form.getRawValue();
    this._service.login(user).subscribe({
      next: res => {
        console.log(res)
        this._service.saveToken(res.token)
        this._service.saveUserRole(res.userRole),
        this.snackbar.opensnackbar(res.message)
        this._router.navigate(['home'],{
          relativeTo:this._routes
        })
      },
      error:err =>{
        this.snackbar.opensnackbar(err)
      }
    });
  }


//   message: 'Login Successfully !!!', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…A3M30.Cu0eveP3e4Ql-sMwId48YihfpUWhqYRzdJ1yPqTaCec', userRole: 'superAdmin', email: 'may@gmail.com'}
// email
// : 
// "may@gmail.com"
// message
// : 
// "Login Successfully !!!"
// token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I3OWYxNzUwMWNjOWNjN2ZiYjc4MjEiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3OTM2NDQ0NzMsImV4cCI6MTc5MzY0ODA3M30.Cu0eveP3e4Ql-sMwId48YihfpUWhqYRzdJ1yPqTaCec"
// userRole
// : 
// "superAdmin"

  signup(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.getRawValue())

    this._service.signup(this.form.getRawValue()).subscribe({
      next: res => {
        console.log(res);
        this._service.saveToken(res.token)
        this._service.saveUserRole(res.userRole);
        this.snackbar.opensnackbar(res.message)
        this.mode = 'login'
      },
      error:err =>{
        this.snackbar.opensnackbar(err)
      }
    });
  }
}

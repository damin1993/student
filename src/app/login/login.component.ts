import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SigninService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message = '';
  loginform = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
  });

  constructor(private signinService: SigninService,private router : Router) { }

  ngOnInit() { 
    this.signinService.setValid(false);
  }
  login() {
    debugger;
    if (this.loginform.invalid) {
      alert('Please fill the mandatory box');
    }
    else {

      this.signinService.validateUser(this.loginform.value).then((respone:any) => {
        if (respone.hasErrors == true) {
          this.signinService.setValid(false);
          this.message = respone.errors[0].errorMessage; //for(let i=0;i<errorobj.lrngth;i++{ this.message=this.message+errr[index].error})
          setTimeout(() => {
            this.message='';
          }, 5000);

        }
        else {
          this.signinService.setValid(true);
          this.router.navigate(['/dashboard']);
          // naviagte to another page
        }

      }).catch((error:any)=>{



      })
      // alert("successfully logged in");
    }
  }
}

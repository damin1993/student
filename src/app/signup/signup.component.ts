import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupModel } from './signup.model';
import { SignupService} from './signup.service';
import { Router } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[SignupService]
})
export class SignupComponent implements OnInit {

  signupform = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
    email: new FormControl('',[Validators.minLength(10),Validators.maxLength(25),Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(12)]),
    mobile : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(12)]),
    
  });
  signup : SignupModel;
  submited= false;
  message = '';
  constructor( private signupservice : SignupService,private router : Router) { }

  ngOnInit() {
    this.signup={name:'',email:'',mobile:'',password:''};
  }

  onSignup(){
    if(this.signupform.invalid){
      this.submited=true;
      alert('Please fill the mandatory box');
    }
    else{
      this.submited=false;
      this.signupservice.ResisterUser(this.signupform.value).then((respone:any) => {
        if (respone.hasErrors == true) {
          for (let index = 0; index < respone.errors.length; index++) {
            this.message = this.message + respone.errors[index].errorMessage;
                        
          }
          //this.message = respone.errors[0].errorMessage;
          setTimeout(() => {
            this.message='';
          }, 5000);
      }else{
        alert("successfull");
        this.router.navigate(['/class']);
      }
      });
    }
}
}
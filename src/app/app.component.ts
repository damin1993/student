import { Component } from '@angular/core';
import { SigninService } from './login/login.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StudentInfo';
  isLogged: boolean = false;

  constructor(private SigninService:SigninService,private router: Router){

   this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart){
        if(event.url !=='/login' && event.url !=='/signup'){
          this.isLogged = new Boolean(sessionStorage.getItem('isValid')).valueOf();
          if(this.isLogged== false){
            this.router.navigate(['/login']);
          }
        }
        console.log("navigation starts");
      }
      if(event instanceof NavigationEnd){
        console.log("navigatyion end");
      }
    });
  }
  ngOnInit(){
    //this.isLogged = new Boolean(sessionStorage.getItem('isValid')).valueOf();
    if(sessionStorage.getItem('isValid')=="true"){
      this.isLogged=true;
    }
    else{
      this.isLogged=false
    }

    this.SigninService.loginPub.subscribe(data => {
      debugger;
      setTimeout(() => {
        this.isLogged = data;
      }, 500);
    })
  }
}



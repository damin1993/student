import { Injectable, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';


// this injected at module level. so dont inject it in coponent (means do not mention this service in component provider)
@Injectable({
    providedIn:'root'
})
export class SigninService {
    isLogged = false;
    @Output() loginPub: EventEmitter<boolean> = new EventEmitter();
    constructor(private httpService: HttpService) {

    }
    validateUser(data) {
        return this.httpService.post('/api/SignIn', data);
    
    }
    setValid(value){
        this.isLogged = value;
        sessionStorage.setItem('isValid',value);
        this.loginPub.emit(this.isLogged);

    }
}

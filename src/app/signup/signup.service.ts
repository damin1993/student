import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class SignupService {

    constructor(private httpService: HttpService){
       
    }
    ResisterUser(data) {
       return this.httpService.post('/api/Register', data);
    }

}
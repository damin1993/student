import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ClassModel } from './class.model';
@Injectable()
export class ClassService {
    constructor(private httpService: HttpService) {
    }
    addClass(data: any) {
        return this.httpService.post('/api/Class', data);
    }
    deleteClass(id) {
        return this.httpService.delete('/api/Class/api/Class/' +id);
    }
    editClass(data: any) {
      
        return this.httpService.post('/api/Class/api/Class/EditClass', data);
    }
    getClass() {
        return this.httpService.get('/api/Class');
    }
}

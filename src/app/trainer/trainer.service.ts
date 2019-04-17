import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
@Injectable()
export class TrainerService {
    constructor(private httpService: HttpService) {
    }
    addTrainer(data: any) {
        data.classes=data.classes.join(',');
        return this.httpService.post('/api/Trainer', data);
    }
    deleteTrainer(id) {
        return this.httpService.delete('/api/Trainer/' +id);
    }
    editTrainer(data: any) {
        data.classes=data.classes.join(',');
        return this.httpService.post('/api/Trainer/EditTrainer',data);
    }
    getTrainer() {
        return this.httpService.get('/api/Trainer');
    }
}

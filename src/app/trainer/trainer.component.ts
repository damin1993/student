import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerModel } from './trainer.model';
import { TrainerService } from './trainer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassService } from '../class/class.service';
declare var $: any;

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  providers: [ClassService,TrainerService]
})
export class TrainerComponent implements OnInit {
  message = '';
  trainerform = new FormGroup({
    id: new FormControl('0', []),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(12)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
    classes: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(12)])
  });
  // class: ClassModel;
  trainerList: TrainerModel[] = [];
  classList: any[] = [];
  constructor(private TrainerService: TrainerService, private router: Router,private ClassService: ClassService) {
  }
  ngOnInit() {
    this.clear();
    this.onGetTrainer();
    this.getClass();
    this.onGetClass();
  }
  getClass(){
    this.ClassService.getClass().then((response:any) => {
      this.classList=[];
      for(let index = 0;index<response.result.length;index++){
        const element=response.result[index];
        this.classList.push({ID: element.id, ClassName: element.name});
      }
    });
  }
  onGetTrainer() {
    this.TrainerService.getTrainer().then((response: any) => {
      this.trainerList = [];
      for (let index = 0; index < response.result.length; index++) {
        // this.trainerList.push({ ID: respone.result[index].id, ClassName: respone.result[index].name });
        const element = response.result[index];
        this.trainerList.push({ ID: element.id, name: element.name, email: element.email, mobile: element.mobile, classes: element.classes });
      }
    });
  }
  onAddTrainer() {
    if (this.trainerform.invalid) {
      return;
    }
    else {
      if (this.trainerform.controls["id"].value == null || this.trainerform.controls["id"].value == "0") {
        this.TrainerService.addTrainer(this.trainerform.value).then((response: any) => {
          if (response.hasErrors == false) {
            this.onGetTrainer();
            this.clear();
            $('#addClassModal').modal('hide');
          } else {
            for (let index = 0; index < response.errors.length; index++) {
              this.message = this.message + response.errors[index].errorMessage;
            }
          } setTimeout(() => {
            this.message = '';
          }, 5000);
        });
      } else {
        this.TrainerService.editTrainer(this.trainerform.value).then((response: any) => {
          if (response.hasErrors == false) {
            this.onGetTrainer();
            this.clear();
            $('#addClassModal').modal('hide');
            //$('#myClassModel').modal('hide');
          } else {
            for (let index = 0; index < response.errors.length; index++) {
              this.message = this.message + response.errors[index].errorMessage;
            }
          } setTimeout(() => {
            this.message = '';
          }, 5000);
        });
      }
    }
  }
  onDelete(ID: number) {
    if (window.confirm('Are you sure want to delete the trainer?')) {
      debugger
      this.TrainerService.deleteTrainer(ID).then((response: any) => {
        if (response.hasErrors == false) {
          this.onGetTrainer();
          // this.clear();//$('#myClassModel').modal('hide');
          $('#addClassModal').modal('hide');
        } else {
          for (let index = 0; index < response.errors.length; index++) {
            this.message = this.message + response.errors[index].errorMessage;
          }
        } setTimeout(() => {
          this.message = '';
        }, 5000);
      });
    }
  }
  onEdit(data: TrainerModel, index: number) {
    debugger
    this.openModal();
    this.trainerform.controls["id"].setValue(data.ID);
    this.trainerform.controls["name"].setValue(data.name);
    this.trainerform.controls["email"].setValue(data.email);
    this.trainerform.controls["mobile"].setValue(data.mobile);
    this.trainerform.controls["classes"].setValue(data.classes);
  }
onGetClass(){
  this.ClassService.getClass().then((response:any)=>{
    this.classList=[];
    for (let index = 0; index < response.result.length; index++) {
      const element = response.result[index];
      this.classList.push({ID:element.id, ClassName:element.name});
    }
  });
}


  clickk() {
    this.router.navigate(['/login']);
  }
  openModal() {
    this.clear();
    $('#addClassModal').modal('show');
  }
  clear() {
    this.trainerform.markAsPristine();
    this.trainerform.reset();
    this.trainerform.controls["id"].setValue(0);
  }
}

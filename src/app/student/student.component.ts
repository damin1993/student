import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassService } from '../class/class.service';
import { TrainerService } from '../trainer/trainer.service';
import { StudentModel } from './student.model';
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers:[TrainerService,ClassService]
})
export class StudentComponent implements OnInit {
  message = '';
 
  // class: ClassModel;
  trainerList: any[] = [];
  classList: any[] = [];
  constructor(private TrainerService: TrainerService, private router: Router,private ClassService: ClassService) {
  }
  ngOnInit() {
    this.onGetTrainer();
    this.getClass();
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
  clickk() {
    this.router.navigate(['/login']);
  }
  openModal() {
    $('#addClassModal').modal('show');
  }
 }

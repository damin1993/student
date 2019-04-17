import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassModel } from './class.model';
import { ClassService } from './class.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  providers: [ClassService]
})
export class ClassComponent implements OnInit {
  message = '';
  Classform = new FormGroup({
    id: new FormControl('0', []),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(12)]),
  });

  // class: ClassModel;
  classList: ClassModel[] = [];
  constructor(private ClassService: ClassService, private router: Router) {
  }
  ngOnInit() {
    this.clear();
    this.onGetClass();
  }
  onGetClass() {
    this.ClassService.getClass().then((response: any) => {
      this.classList = [];
      for (let index = 0; index < response.result.length; index++) {
        // this.classList.push({ ID: respone.result[index].id, ClassName: respone.result[index].name });
        const element = response.result[index];
        this.classList.push({ ID: element.id, ClassName: element.name });
      }
    });
  }
  onAddClass() {
    debugger;
    if (this.Classform.invalid) {
      return;
    }
    else {
      if (this.Classform.controls["id"].value == null || this.Classform.controls["id"].value == "0") {
        this.ClassService.addClass(this.Classform.value).then((response: any) => {
          if (response.hasErrors == false) {
            this.onGetClass();
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
        this.ClassService.editClass(this.Classform.value).then((response: any) => {
          if (response.hasErrors == false) {
            this.onGetClass();
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
    // alert("successfully logged in");
  }
  onDelete(ID: number) {
    if (window.confirm('Are you sure want to delete the class?')) {
      this.ClassService.deleteClass(ID).then((response: any) => {
        if (response.hasErrors == false) {
          this.onGetClass();
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
  onEdit(data: ClassModel, index: number) {
    this.openModal();
    this.Classform.controls["name"].setValue(data.ClassName);
    this.Classform.controls["id"].setValue(data.ID);
  
  }
  clickk() {
    this.router.navigate(['/login']);
  }

  openModal() {
    this.clear();
    $('#addClassModal').modal('show');
  }
  clear() {
    this.Classform.markAsPristine();
    this.Classform.reset();
    this.Classform.controls["id"].setValue(0);
  }

}











  //}
  // ngOnInit() {
  //   this.clear();
  // }
  // clear() {
  //   this.class = { ClassName: '', ID: null }
  // }

  // onEdit(data: ClassModel, index: number) {
  //   this.openModal();
  //   this.class = data;    


  // }
  // onAddClass() {
  //   this.classList.push(this.class);
  //   this.clear();
  //   $('#addClassModal').modal('hide');
  // }


  // onDelete(index: number) {
  //   if (window.confirm('Are you sure want to delete the student?')) {
  //     this.classList.splice(index, 1);
  //   }
  // }
// }

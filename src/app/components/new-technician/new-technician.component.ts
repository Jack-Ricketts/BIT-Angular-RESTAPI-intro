import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-technician',
  templateUrl: './new-technician.component.html',
  styleUrls: ['./new-technician.component.css']
})
export class NewTechnicianComponent implements OnInit {
  public technicianForm:FormGroup;
  
  constructor() { 
    this.technicianForm=new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      'level':new FormControl(null, [Validators.required, this.checkLevel]),
      'education':new FormArray([])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.technicianForm.value);
    this.technicianForm.reset();
  }

  checkLevel(control:FormControl): {[s:string]:boolean}|null {
    if (control.value=='1' || control.value=='3' || control.value=='5'){
      return null;
    }else{
      return {'levelIncorect':true}
    }
  }

  addEducation(){
    const input=new FormControl(null, Validators.required);
    (<FormArray>this.technicianForm.get('education')).push(input);
  }

  get educations(){
    return (<FormArray>this.technicianForm.get('education')).controls;
  }

}
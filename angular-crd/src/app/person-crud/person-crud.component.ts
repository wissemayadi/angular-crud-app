import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { PersonModel } from './person.model';
@Component({
  selector: 'app-person-crud',
  templateUrl: './person-crud.component.html',
  styleUrls: ['./person-crud.component.css']
})
export class PersonCrudComponent implements OnInit {

  formValue !: FormGroup;
  personModelObj: PersonModel = new PersonModel();
  personData !:any;
  
  constructor(private formBuilder: FormBuilder, 
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
    firstName : [''],
    lastName : [''],
    email : ['']

    })
    this.getAllPerson();
    // this.deletePerson(id);
  }

// method crud 
postPersonInfo(){
  this.personModelObj.firstName =this.formValue.value.firstName;
  this.personModelObj.lastName =this.formValue.value.lastName;
  this.personModelObj.email =this.formValue.value.email;

  this.api.addPerson(this.personModelObj).subscribe(res=>{
  console.log(res);
  alert("Person added with success");
  let ref=document.getElementById('cancel');
  ref?.click();
  this.formValue.reset();
  this.getAllPerson();
  

  }, error=>{
    alert("something went wrong");
  });


}

getAllPerson(){
  this.api.getPerson().subscribe(res=>{

this.personData= res;

  })
}
deletePerson(row :any){
  this.api.deletePerson(row.id).subscribe(res=>{
alert("person deleted");
this.getAllPerson();
  })
}
editPerson(row:any){
  this.personModelObj.id=row.id;
 this.formValue.controls['firstName'].setValue(row.firstName);
 this.formValue.controls['lastName'].setValue(row.lastName);
 this.formValue.controls['email'].setValue(row.email);
// alert("person updated");

}
editPersonModal(){
 
  this.personModelObj.firstName =this.formValue.value.firstName;
  this.personModelObj.lastName =this.formValue.value.lastName;
  this.personModelObj.email =this.formValue.value.email;
  this.api.updatePerson(this.personModelObj,this.personModelObj.id).subscribe(res=>{
  alert("person updated");

  let ref = document.getElementById('cancel')
  ref?.click();
  this.formValue.reset();
  this.getAllPerson();


  })
}
}

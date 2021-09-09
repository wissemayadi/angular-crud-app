import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  //add new person

  addPerson(data : any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;

    }))
  }
  // get all person
  getPerson(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;

    }))
  }
  //update person by id 
  updatePerson(data : any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;

    }))
  }
  //delete person by id 
  deletePerson(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;

    }))
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Interface/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  empUrl = 'http://localhost:3000/posts';

  constructor(private http : HttpClient) { }

  getEmployee(){
    return this.http.get<Employee>(this.empUrl);
  }
  addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.empUrl,employee);
  }

  deleteEmployee(id: number){
    return this.http.delete(this.empUrl + '/' + id)
  }
  updateEmployee(emp :Employee, index:number) : Observable<Employee>{
    return this.http.put<Employee>(this.empUrl+ '/'+ index, emp);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Interface/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';
declare var $ : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('addEmployeeButton') addEmployeeButton : any;
  @ViewChild('editEmployeeButton') editEmployeeButton : any;
  empForm !: FormGroup;

  empObj: Employee = new Employee();
  updateEmpObj: Employee = new Employee();
  empList : Employee[] = [];
  employees : any;
  updateIndex:any;
  updateId:any;
  modalT:boolean = true;
  myModalEl:any = document.getElementById('AddEmpModal');
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      id: ['',[Validators.required]],
      name: ['',[Validators.required]],
      age: [''],
      address: [''],
      birthDate: [''],
    })
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.empService.getEmployee().subscribe((res)=>{
      this.empList.push(res);
      this.employees = this.empList[0];
  });
  }
  AddEmployee() {
    if(this.empForm.valid){
      this.empObj.id = this.empForm.value.id;
      this.empObj.name = this.empForm.value.name;
      this.empObj.age = this.empForm.value.age;
      this.empObj.address = this.empForm.value.address;
      this.empObj.birthDate = this.empForm.value.birthDate;
      
      this.empService.addEmployee(this.empObj).subscribe((res)=>{
        this.empList.push(res);
        this.employees.push(this.empObj);
      })
      this.addEmployeeButton.nativeElement.click();
      this.clearForm();  
    }
    else{
      console.log("Form Not Valid");
    }
  }
  /* Remove selected employee from json and Employess Array */
  removeEmp(id:number, index:number){
    this.empService.deleteEmployee(id).subscribe((res)=>{
      console.log('remove', res);
    })
    this.employees.splice(index,1)
  }
  /* Reset Form Value */
  clearForm() {
    this.empForm.get('id')?.setValue('');
    this.empForm.get('name')?.setValue('');
    this.empForm.get('age')?.setValue('');
    this.empForm.get('address')?.setValue('');
    this.empForm.get('birthDate')?.setValue('');
  }
  /* edit Function to fill the Modal with current Data (which Selected) */
  editEmp(emp:Employee, i:number){
    this.updateIndex = i; //save the index of obj to make the update on it later (if Any)
    this.updateId = emp.id // save the ID of obj to make the update on it later (if Any)
    console.log('index','------>', i)
    console.log('idd','------>', this.updateId)
    if(this.modalT){
      this.empForm.controls['id'].setValue(emp.id);
      this.empForm.controls['name'].setValue(emp.name);
      this.empForm.controls['age'].setValue(emp.age);
      this.empForm.controls['address'].setValue(emp.address);
      this.empForm.controls['birthDate'].setValue(emp.birthDate); 
    }
  }
 /* Udate Json Server And Empolyees Array with Updated Data */
  updateEmployee(){
    this.updateEmpObj.id = this.empForm.value.id;
    this.updateEmpObj.name = this.empForm.value.name;
    this.updateEmpObj.age = this.empForm.value.age;
    this.updateEmpObj.address = this.empForm.value.address;
    this.updateEmpObj.birthDate = this.empForm.value.birthDate;


    this.empService.updateEmployee(this.updateEmpObj, this.updateId).subscribe((res)=>{
      console.log(res);
    })
    this.employees[this.updateIndex] = this.updateEmpObj;
    this.modalT = false;
    this.editEmployeeButton.nativeElement.click();
    this.clearForm();
    this.modalT = true;
  }
  
}

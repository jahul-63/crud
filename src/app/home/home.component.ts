import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private serve: AppService, private fb: FormBuilder) { }
  userid: number = 0;
  userdata: any;
  EditUserData: any = [];
  imageUrl: any;
  SingleUserData: any;
  AllUser: boolean = true;
  SingleUser: boolean = false;
  ngOnInit(): void {
    this.GetAllUserData();
  }
  AddUserform = this.fb.group({
    name: ['', Validators.required],
    job: ['', Validators.required]
  })
  GetAllUserData() {
    this.serve.GET('/users?page=', this.userid).subscribe((data: any) => {
      this.userdata = data.data;
      if (data) {
        this.AllUser = true;
        this.SingleUser = false;
      }
    })
  }
  addUser() {
    this.serve.POST('/users', this.AddUserform.value).subscribe((data: any) => {
      if (data) {
        $('#addEmployeeModal').modal('toggle');
        this.AddUserform.reset();
      }
    })
  }
  EditUser(user: any) {
    this.EditUserData = user;
    this.imageUrl = user.avatar;
    this.EditUserForm.controls['id'].setValue(user.id);
    this.EditUserForm.controls['first_name'].setValue(user.first_name);
    this.EditUserForm.controls['last_name'].setValue(user.last_name);
    this.EditUserForm.controls['email'].setValue(user.email);
    this.EditUserForm.controls['avatar'].setValue(user.avatar);
  }
  EditUserForm = this.fb.group({
    id: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    avatar: ['', Validators.required],
  })
  UpdateUser() {
    this.serve.PUT('/users/:id', this.EditUserForm.value).subscribe((data: any) => {
      if (data) {
        $('#editEmployeeModal').modal('toggle');

      }
    });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.EditUserForm.controls['avatar'].setValue(event.target.value);
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }
  DeleteUser(user: any) {
    this.serve.DELETE('/users/', user.id).subscribe((data: any) => {
    })
  }
  GetUser(event: any) {
    this.userid = event.target.value;
    if (this.userid) {
      this.serve.GET('/users/', this.userid).subscribe((data: any) => {
        this.SingleUserData = data.data;
        if (data) {
          this.AllUser = false;
          this.SingleUser = true;
        }
      })

    }
    else {
      this.GetAllUserData();
    }
  }
}

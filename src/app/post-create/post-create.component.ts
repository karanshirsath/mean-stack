import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from './post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor( private userService:UserService) { }
  // @Output () sendData = new EventEmitter();
  ngOnInit(): void {

  }
  userForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });
  savePost(){
    const  userData : User =this.userForm.value;
    this.userService.createUser(userData)
    this.userForm.reset()
// this.sendData.emit(this.userForm.value)
}


}

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
formData: any = {firstName:"",lastName:"",gender:"",description:""}
updateFlag = false
id = ""
  constructor( private userService:UserService) { }
  // @Output () sendData = new EventEmitter();
  ngOnInit(){
this.userService.editUserUpdatedListener().subscribe((res)=>{
 this.formData = res
 this.updateFlag = true
 console.log(res);
 this.id=res._id


})
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
updatePost(){
  let formEdited = this.userForm.value
  formEdited["_id"]=this.id
  console.log(formEdited);
  this.updateFlag =false
  this.userService.updateUser(this.id,formEdited)
  this.userForm.reset()

}


}

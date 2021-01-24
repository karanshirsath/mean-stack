import { Injectable } from '@angular/core';
import { User } from './post-create/post.model';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private users : User[]=[]
 private usersUpdated = new Subject <User[]>();
  constructor() { }
  getUsers(){
return this.users
  }
  getUsersUpdatedListener(){
   return this.usersUpdated.asObservable()
  }
  createUser(user:User){
    this.users.push(user)
    this.usersUpdated.next(this.users)
  }
}

import { Injectable } from '@angular/core';
import { User } from './post-create/post.model';
import {Subject} from 'rxjs'
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private users : User[]=[]
 private editUserUpdated = new Subject <User>();
 private usersUpdated = new Subject <User[]>();
  constructor( private http:HttpClient) { }
  getUsers(){
    let data
    data = this.http.get<{message: string , users: User[]}>('http://localhost:3000/api/users').subscribe((res)=>{
      data= res
      console.log(res);
      this.users=data.users;
      this.usersUpdated.next(data.users)

    })




  }
  getUsersUpdatedListener(){
   return this.usersUpdated.asObservable()
  }
  createUser(user:User){
    this.http.post<{message: string}>('http://localhost:3000/api/users',user).subscribe((res)=>{
      console.log(res);
      this.getUsers();

    })

  }
  deleteUser(id :any){
    this.http.delete<{message: string}>('http://localhost:3000/api/users/'+ id).subscribe((res)=>{
      console.log(res);
      this.users=this.users.filter((user)=>{
        return user._id!=id
      })
      this.usersUpdated.next(this.users)
    })

  }
  editUser(user:any){
this.editUserUpdated.next(user)
  }
  editUserUpdatedListener(){
    return this.editUserUpdated.asObservable()
   }

   updateUser(id:any,user:User){
     this.http.put<{message: string}>('http://localhost:3000/api/users/'+ id,user).subscribe((res)=>{
      this.getUsers()
     })
   }
}

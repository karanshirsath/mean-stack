import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { User } from '../post-create/post.model';
import { UserService } from '../user.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnChanges,OnDestroy {

  constructor(private userService:UserService) { }
  dataArray:User[] =[]
  private userSub: Subscription = new Subscription;
  // @Input() dataReceiver :any
  ngOnInit(){
    // this.dataArray=this.userService.getUsers();
   this.userSub = this.userService.getUsersUpdatedListener().subscribe((users:User[])=>{
 this.dataArray =users
    })
  }
  ngOnChanges(){
      // if(this.dataReceiver){
      // this.dataArray.push(this.dataReceiver)
      // }
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }


}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Iuser } from 'src/module/interface';
import { users } from 'src/const/users';

@Component({
  selector: 'app-users-dash',
  templateUrl: './users-dash.component.html',
  styleUrls: ['./users-dash.component.scss']
})
export class UsersDashComponent implements OnInit {
  users:Iuser[] =[]   
  constructor(
    private userservice:UserService
  ) { }

  ngOnInit(): void {
    this.getusers()
  }

  getusers() {
    this.userservice.fetchusers()
      .subscribe({
        next:res =>{
          this.users = res
        },
        error:err =>{
          console.log(err)
        }
      })
  }


}

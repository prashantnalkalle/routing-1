import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Iuser } from 'src/module/interface';
import { SnackbarService } from '../../service/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-dash',
  templateUrl: './users-dash.component.html',
  styleUrls: ['./users-dash.component.scss']
})
export class UsersDashComponent implements OnInit {
  users:Iuser[] =[]   
  constructor(
    private userservice:UserService,
    private snackbar:SnackbarService,
    private _router:Router,
    private _routes:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getusers()

    this._routes.queryParams.subscribe({
      next: res => {
        try {
          if (res['user']) {
            const user: Iuser = JSON.parse(res['user'])
            const userIndex = this.users.findIndex(item => item.id === user.id)

            if (userIndex === -1) {
              this.users.unshift(user)
            }
          }

          if (res['Updateduser']) {
            const user: Iuser = JSON.parse(res['Updateduser'])
            const userIndex = this.users.findIndex(item => item.id === user.id)

            if (userIndex !== -1) {
              this.users[userIndex] = user
            }
          }

          if (res['removeId']) {
            const userIndex = this.users.findIndex(item => item.id === res['removeId'])

            if (userIndex !== -1) {
              this.users.splice(userIndex, 1)
            }
          }
        } catch {
          this.snackbar.opensnackbar('Could not update the user list.')
        }
      }
    })

    this.userservice.removeIdObs.subscribe(res =>{
      if(res) {
        let index = this.users.findIndex(ele => ele.id === res)
        if (index !== -1) {
          this.users.splice(index,1)
        }
      }
    })
  }

  getusers() {
    this.userservice.fetchusers()
      .subscribe({
        next:res =>{
          this.users = res
        },
        error:err =>{
          this.snackbar.opensnackbar(err)
        }
      })
  }


  navigatetouser(user:Iuser) {
    this._router.navigate([user.id], { relativeTo: this._routes })
  }


}

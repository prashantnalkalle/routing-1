import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Iuser } from 'src/module/interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from 'src/app/get-confirm/get-confirm.component';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userObj!: Iuser 
  defaultImage = 'https://img.magnific.com/free-vector/man-profile-account-picture_24908-81754.jpg?semt=ais_hybrid&w=740&q=80'
  constructor(
    private _route:ActivatedRoute,
    private _http:UserService,
    private mat_dialog:MatDialog,
    private _router:Router,
    private snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.fetchuser()
  }

  fetchuser(){
    let id = this._route.snapshot.params['id']

    this._http.fetchuserbyId(id)
      .subscribe({
        next:res =>{
          this.userObj = res
          res.id = id
          this.snackbar.opensnackbar(`The User Info Is Fetched!!`)
        },
        error:err =>{
          this.snackbar.opensnackbar(err)
        }
      })
  }

  onEdit() {
    if (this.userObj) {
      this._http.editUser(this.userObj)
    }
  }

  onRemove() {
    if (!this.userObj) {
      return
    }

    console.log(this.userObj)

    let id = this._route.snapshot.params['id']

    let config = new MatDialogConfig
    config.width='600px'
    config.data = `Are You Sure You Want To Remove Post With Id ${this.userObj.id}?`

    let matdialogres=this.mat_dialog.open(GetConfirmComponent,config)

    matdialogres.afterClosed()
      .subscribe(res =>{
        if(res){
          this._http.RemoveUser(id)
        .subscribe({
          next:res =>{
          console.log(res) 
          this.snackbar.opensnackbar(`The User With Id ${this.userObj.id} is Removed Successfully!!`)
          this._router.navigate(['users'])
          },
          error:err =>{
          this.snackbar.opensnackbar(err)
            
          }
        })
        }
      })
  }


}

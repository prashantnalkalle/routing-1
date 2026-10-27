import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Iuser } from 'src/module/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  
  iseditmode:boolean = false

  userform!:FormGroup
  editUserId: string | null = null

  constructor(
    private http:UserService,
    private routes:Router,
    private route:ActivatedRoute,
    private snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.createform();
    this.enablecheckbox(),
    this.pathchcurrent()

    this.editUserId = this.route.snapshot.paramMap.get('id');
    if (this.editUserId){
      this.iseditmode = true;
      this.http.editObjObser
        .subscribe(res =>{
          if(res && res.id === this.editUserId){
            this.patchUser(res)
          } 
        })
    }

  }

  patchUser(user: Iuser) {
    this.skillArray.clear();
    for (const skill of user.skills ) {
      this.skillArray.push(new FormControl(skill, Validators.required));
    }
    this.userform.patchValue(user);
  }

  createform(){
    this.userform=new FormGroup({
      name:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required]),
      age:new FormControl(null,[Validators.required,Validators.min(18)]),
      role:new FormControl('Admin',[Validators.required]),
      description:new FormControl(null,[Validators.required]),
      imageUrl:new FormControl(null,[Validators.required]),
      skills:new FormArray([new FormControl(null,[Validators.required])]),
      experience:new FormControl(null,[Validators.required,Validators.min(0)]),
      isactive:new FormControl(null),
      currentAddress:new FormGroup({
        country: new FormControl(null,[Validators.required]),
        state:new FormControl(null,[Validators.required]),
        city:new FormControl(null,[Validators.required]),
        zipcode:new FormControl(null,[Validators.required])
      }),
      permanentAddress:new FormGroup({
        country: new FormControl(null,[Validators.required]),
        state:new FormControl(null,[Validators.required]),
        city:new FormControl(null,[Validators.required]),
        zipcode:new FormControl(null,[Validators.required])
      }),
      checkbox:new FormControl({value:false,disabled:true})
    })
  }


  enablecheckbox() {
    this.userform.get('currentAddress')?.valueChanges
      .subscribe(res =>{
        if(this.userform.get('currentAddress')?.valid){
          this.f['checkbox'].enable()
        }else{
          this.f['checkbox'].reset()
          this.f['checkbox'].disable()
        }
      })
  }

  pathchcurrent() {
    this.userform.get('checkbox')?.valueChanges
      .subscribe(res =>{
        if(res){
          let currentAdd = this.userform.get('currentAddress')?.value
          this.userform.get('permanentAddress')?.patchValue(currentAdd)
          this.userform.get('permanentAddress')?.disable()
        }else{
          this.userform.get('permanentAddress')?.reset()
          this.userform.get('permanentAddress')?.enable()
        }
      })
  }

  Addskill(){
    if(this.skillArray.valid){
      this.skillArray.push(new FormControl(null,[Validators.required]))
    }


  }

  onUserAdd() {
    if (this.userform.invalid) {
      this.userform.markAllAsTouched();
      return;
    }

    console.log(this.userform.value)

    let user:Iuser = this.userform.getRawValue()

   
   this.http.postUser(user)
      .subscribe({
        next:res =>{
          console.log(res)
          this.routes.navigate(['users'])
          this.snackbar.opensnackbar(`The New User With Id ${res.name} Is Added Successfully!!`)
        },
        error:err =>{
          this.snackbar.opensnackbar(err)
        }
      })
  }

  onUpdate() {
    if (this.userform.invalid) {
      this.userform.markAllAsTouched();
      return;
    }

    let user:Iuser = {...this.userform.getRawValue(),id:this.editUserId}

    this.http.UpdateUser(user)
      .subscribe({ 
        next:res =>{
          console.log(res)
          this.routes.navigate(['users'])
          this.snackbar.opensnackbar(`The User With Id ${res.id} Is Updated Successfully!!`)

        },
        error:err =>{
          console.log(err)
        }
      })
  }


  get f(){
    return this.userform.controls
  }

  get skillArray() {
    return this.userform.get('skills') as FormArray;
  }

}

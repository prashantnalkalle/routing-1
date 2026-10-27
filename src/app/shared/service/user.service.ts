import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, Subject, throwError } from 'rxjs';
import { users } from 'src/const/users';
import { environment } from 'src/environments/environment';
import { Ires, Iuser } from 'src/module/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Base_url = environment.Base_url
  post_url=`${this.Base_url}/users.json`
  // userArr:Iuser[] =[]
  constructor(private _http:HttpClient) { }

  editObj = new BehaviorSubject<Iuser | null>(null)
  editObjObser = this.editObj.asObservable()

  fetchusers() :Observable<Iuser[]>{

    return this._http.get<Iuser[]>(this.post_url)
                      .pipe(

                        map(res =>{
                          let userArr=[]
                          for (const key in res) {
                          userArr.push({...res[key],id:key})
                          }
                          return userArr
                        })
                      )
  }

  fetchuserbyId(id:string):Observable<Iuser>{
    
    let get_url=`${this.Base_url}/users/${id}.json`

   return this._http.get<Iuser>(get_url)

  }

  editUser(obj:Iuser) {
    this.editObj.next(obj)
  }

  postUser(user:Iuser):Observable<Ires> {

    return this._http.post<Ires>(this.post_url,user)
  }

  UpdateUser(user:Iuser):Observable<Iuser>{
    let id=user.id

    let updateUrl=`${this.Base_url}/users/${id}.json`

    return this._http.patch<Iuser>(updateUrl,user)
  }

  RemoveUser(id:string):Observable<any> {
    let remvoeUrl=`${this.Base_url}/users/${id}.json`

    return this._http.delete(remvoeUrl)
  }


}

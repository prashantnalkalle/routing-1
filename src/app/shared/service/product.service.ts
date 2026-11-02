import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ires } from 'src/module/interface';
import { Iproduct, Iresponce } from 'src/module/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Base_url = environment.Base_url
  Post_url = `${this.Base_url}/products.json`

  constructor(private http: HttpClient) { }

  fetchproducts():Observable<Iproduct[]> {
  return  this.http.get<Iresponce>(this.Post_url)
                      .pipe(
                            map(res =>{
                                    let userArr:Iproduct[]=[]
                                        for (const key in res) {
                                          userArr.push({...res[key],id:key})
                                          }
                                          return userArr
                                          })
                                        )
  }


  createProduct(product:Iproduct) : Observable<Ires> {

    return this.http.post<Ires>(this.Post_url,product)

  }

  UpdateProduct(proudct:Iproduct):Observable<Iproduct> {

    let updateUrl = `${this.Base_url}/products/${proudct.id}.json`
    
    return this.http.patch<Iproduct>(updateUrl,proudct)
  }


  RemoveProduct(id:string):Observable<any>{
    let removeUrl =`${this.Base_url}/products/${id}.json`

    return this.http.delete(removeUrl)
  }


}

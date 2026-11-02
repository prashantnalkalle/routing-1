import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/module/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from 'src/app/get-confirm/get-confirm.component';
import { filter, pipe, switchMap } from 'rxjs';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  product!:Iproduct
  constructor(
    private mat_dialog:MatDialog,
    private _service:ProductService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this._routes.queryParams.subscribe({
      next:res =>{
        if(res['product']){
          this.product = JSON.parse(res['product'])
        }
      }
    })
  }

  navigatetoform() {
    this._router.navigate(['edit'],{
      relativeTo:this._routes,
      queryParams:{
        product:JSON.stringify(this.product)
      }
    })
  }

  RemoveProduct() {

    let id = this._routes.snapshot.params['id']
    
    let config = new MatDialogConfig
    config.width ='600px'
    config.data=`Are You Sure You Want To Remove Product with id ${id}?`

    let matdialogres = this.mat_dialog.open(GetConfirmComponent,config)

    matdialogres.afterClosed()
          .pipe(
            filter(res =>{
              return Boolean(res) || res
            }),
            switchMap(()=> this._service.RemoveProduct(id))
          )
          .subscribe(res =>{
            console.log(res)
            this.snackbar.opensnackbar(`The Product With Id ${id} is Removed Successfully!!`)
            this._router.navigate(['products'])
          })

}
}

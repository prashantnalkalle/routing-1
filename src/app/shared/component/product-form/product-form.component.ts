import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iproduct } from 'src/module/product';
import { ProductService } from '../../service/product.service';
import { SnackbarService } from '../../service/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  iseditmode:boolean = false
  product!:Iproduct
  constructor(
    private _service:ProductService,
    private snackbar:SnackbarService,
    private _routes:ActivatedRoute,
    private _router:Router
  ) { }

  productForm!:FormGroup

  ngOnInit(): void {
    this.createform();

    this._routes.queryParams.subscribe({
      next:res =>{
        if(res['product']){
          this.iseditmode = true,
          this.product = JSON.parse(res['product']) 
          this.productForm.patchValue(this.product)
        }
      }
    })
  }


  createform() {
   this.productForm = new FormGroup({
    title:new FormControl(null,[Validators.required]),
    category:new FormControl(null,[Validators.required]),
    image:new FormControl(null,[Validators.required, Validators.pattern(/^https?:\/\/[^\s/]+(?:\/[^\s]*)?$/i)]),
    price:new FormControl(null,[Validators.required, Validators.min(0.01)]),
    rating:new FormGroup({
      count:new FormControl(null,[Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]),
      rate:new FormControl(null,[Validators.required, Validators.min(0), Validators.max(5)])
    })
   }) 
  }

  onProductformsubmit() {
    if(this.productForm.invalid) {
      return 
    }

    let product:Iproduct =this.productForm.getRawValue()

    this._service.createProduct(product).subscribe({
      next:res =>{
        this.productForm.reset()
        this._router.navigate(['products'])
        this.snackbar.opensnackbar(`The New Product With Id ${res.name} is Added Successfully!!`)

      },
      error:err =>{
        this.snackbar.opensnackbar(err)
      }
    })

  }

  onProductUpdate() {
    if(this.productForm.invalid) {
      return 
    }

    let product:Iproduct = {...this.productForm.getRawValue(),id:this.product.id}

    this._service.UpdateProduct(product).subscribe({
      next:res =>{
        this.productForm.reset()
        this.iseditmode = false
        this._router.navigate(['products'])
        this.snackbar.opensnackbar(`The Product With Id ${product.id} is Updated Successfully!!`)
      },
      error:err =>{
        this.snackbar.opensnackbar(err)
      }
    })

  }

}

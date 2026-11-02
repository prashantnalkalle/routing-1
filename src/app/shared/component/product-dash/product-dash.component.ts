import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from 'stream/consumers';
import { Iproduct } from 'src/module/product';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {
  productArr: Array<Iproduct> = [];

  constructor(
    private service: ProductService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private snackbar:SnackbarService
  ) {}

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts() {
    this.service.fetchproducts().subscribe({
      next: (res) => {
        console.log(res)
        this.productArr = res;
        console.log(this.productArr);
      },
      error:err =>{
        this.snackbar.opensnackbar(err.message)
      }
    });
  }

  navigatetoproduct(prod: Iproduct) {
    this._router.navigate([`${prod.id}`], {
      relativeTo: this._routes,
      queryParams: {
        product:JSON.stringify(prod)
      }
    });
  }
}

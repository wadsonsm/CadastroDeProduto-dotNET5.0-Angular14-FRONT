import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../models/Products';
import { ProductService } from '../../../service/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  productForm: any;
  ProductList: Observable<Products[]>;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private productService : ProductService
  ) { }

  ngOnInit(){
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productCost: ["", [Validators.required]],
      productDescription: ["", [Validators.required]],
      stock: ["", [Validators.required]]
    });
    this.getProductList();
  }

  getProductList() {
    this.ProductList = this.productService.getProductList();
  }

  ProductDetailsToEdit(): void{
    alert('Edit');
  }

  DeleteProduct(): void{
    alert('deleted');
  }

}

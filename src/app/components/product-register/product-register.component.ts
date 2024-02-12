import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Products } from 'src/models/Products';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/service/product.service';


@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  productForm: any;
   ProductList: Observable<Products[]>;
   ProductList1: Observable<Products[]>;


  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private productService : ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productCost: ["", [Validators.required]],
      productDescription: ["", [Validators.required]],
      stock: ["", [Validators.required]]
    });
    this.getProductList();

  }

  getProductList() {
    try {
      this.ProductList = this.productService.getProductList();
      
    } catch (error) {
      console.log(error.message);
    }
  }

  ProductDetailsToEdit(): void{
    alert('Edit');
  }

  DeleteProduct(): void{
    alert('deleted');
  }

}

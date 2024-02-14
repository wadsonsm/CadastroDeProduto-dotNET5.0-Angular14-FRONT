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
  isVisible: boolean = true;
  errorStatus: number;

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
    this.productService.getProductList().subscribe((data) => {
      console.log(data);
      console.log(typeof data);
    }, (error) => {
      console.log(error);
      this.errorStatus = error.status
    })

  }

  ProductDetailsToEdit(): void{
    alert('Edit');
  }

  DeleteProduct(): void{
    alert('deleted');
  }

}

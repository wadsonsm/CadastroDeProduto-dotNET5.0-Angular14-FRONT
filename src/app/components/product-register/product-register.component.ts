import { Products } from './../../../models/Products';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';


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
  botaoEditar: boolean = false;
  idFromRegisterToEdit: Guid = Guid.create();

  product: Products = {
    productName: '',
    productCost: '',
    productDescription: '',
    stock: 0
  };

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      id:[''],
      productName: ["", [Validators.required, Validators.minLength(3)]],
      productCost: ["", [Validators.required, Validators.min(1)]],
      productDescription: ["", [Validators.required, Validators.minLength(3)]],
      stock: ["", [Validators.required, Validators.min(1)]]
    });
    this.getProductList();
  }

  getProductList() {
    this.ProductList = this.productService.getProductList();
    this.productService.getProductList().subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
      this.isVisible = false;
    })
  }

  add() {
    console.log(this.productForm.value)
    console.log(this.productForm)

    if (this.productForm.invalid) {
      alert("Não deixar campos em branco !")
      return false;
    } else {
      this.product.productName = this.productForm.controls['productName'].value;
      this.product.productCost = this.productForm.controls['productCost'].value;
      this.product.productDescription = this.productForm.controls['productDescription'].value;
      this.product.stock = this.productForm.controls['stock'].value;

      console.log(this.product)
      this.productForm.reset();

      this.insertProduct(this.product);
      return true;
    }

  }

  insertProduct(products: Products) {
    this.productService.postProductData(products).subscribe((data) => {
      alert('Inserido com sucesso !');
      this.getProductList();
    }, (error) => {
      console.log(error);
    })
  }

  ProductDetailsToEdit(products: Products): void {
    this.botaoEditar = true;
    this.idFromRegisterToEdit = products.id;

    this.productForm.setValue({
      'id':products.id,
      'productName': products.productName,
      'productCost': products.productCost,
      'productDescription': products.productDescription,
      'stock': products.stock
    });
    console.log(this.productForm)
  }

  cancelarEdicao() {
    this.productForm.reset();
    location.reload();
  }

  editarRegistro() {
    console.log(this.productForm)
    this.product.id = this.productForm.controls['id'].value;
    this.product.productName = this.productForm.controls['productName'].value;
    this.product.productCost = this.productForm.controls['productCost'].value;
    this.product.productDescription = this.productForm.controls['productDescription'].value;
    this.product.stock = this.productForm.controls['stock'].value;

    this.productService.updateProduct(this.product).subscribe((data) => {
      alert(this.product.productName + ' alterado com sucesso !');
      this.getProductList();
      this.productForm.reset();
      location.reload();
    }, (error) => {
      console.log(error);
    });
  }

  DeleteProduct(id: Guid): void{
    this.productService.deleteProductById(id).subscribe((data) => {
      alert('Excluído com sucesso !');
      this.getProductList();
    }, (error) => {
      console.log(error);
    })
  }

}

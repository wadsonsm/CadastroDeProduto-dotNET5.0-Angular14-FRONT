import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Products } from '../models/Products';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "https://localhost:44315/api/Product/";
  httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  handleError(error) {
    return throwError(error)
  }


  constructor(private http: HttpClient) { }

  getProductList(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url + 'List')
      .pipe(catchError(this.handleError));
  }

  postProductData(productData: Products): Observable<Products> {
    return this.http.post<Products>(this.url + "CreateRecord", productData, this.httpHeaders)
      .pipe(catchError(this.handleError));
  }

  updateProduct(product: Products): Observable<Products> {
    return this.http.put<Products>(this.url + "UpdateProduct/" + product.id, product, this.httpHeaders)
      .pipe(catchError(this.handleError));
  }

  deleteProductById(id: Guid) {
    return this.http.delete<Products>(this.url + "DeleteProduct" + id, this.httpHeaders)
      .pipe(catchError(this.handleError));
  }

  getProductDetailsById(id: number): Observable<Products> {
    return this.http.get<Products>(this.url + "Details?id=" + id);
  }



}

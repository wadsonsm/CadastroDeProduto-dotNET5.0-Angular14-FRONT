import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Products } from '../models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "https://localhost:44315/api/Product/";

  handleError(error) {
    return throwError(error)
  }


  constructor(private http: HttpClient) { }

  getProductList(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url + 'List')
      .pipe(catchError(this.handleError));
  }

  postProductData(productData: Products): Observable<Products> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Products>(this.url + "CreateRecord", productData, httpHeaders);
  }

  updateProduct(product: Products): Observable<Products> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Products>(this.url + "UpdateProduct?id=" + product.id, product, httpHeaders);
  }

  deleteProductById(id: number): Observable<number> {
    return this.http.post<number>(this.url + "DeleteProduct?id=" + id, null);
  }

  getProductDetailsById(id: number): Observable<Products> {
    return this.http.get<Products>(this.url + "Details?id=" + id);
  }



}

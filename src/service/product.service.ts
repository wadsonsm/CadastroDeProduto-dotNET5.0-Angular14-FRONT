import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from 'src/models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL: "https://localhost:44315/api/Product";

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Products[]>{
    return this.http.get<Products[]>(this.API_URL + 'List');
  }

  getProductDetailsById(id: string): Observable<Products>{
    return this.http.get<Products>(this.API_URL + 'Details?id=' + id);
  }

  postProductDate(productData: Products): Observable<Products>{
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Products>(this.API_URL + 'CreateRecord',productData, httpHeaders);
  }

  updateProduct(product: Products): Observable<Products>{
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'apllication/json' }) };
    return this.http.post<Products>(this.API_URL + 'UpdateProduct?id=' + product.id, product, httpHeaders);
  }

  deleteProductById(id: string): Observable<string>{
    return this.http.post<string>(this.API_URL + 'DeleteProduct?id='+id, null);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductDTO {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://loja-virtual-8juo.onrender.com/products';

  constructor(private http: HttpClient) {}

  listAll(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.baseUrl);
  }

  create(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(this.baseUrl, product);
  }

  update(product: ProductDTO): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.baseUrl}/${product.id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

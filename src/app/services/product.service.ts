import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductDTO {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  imageUrl?: string; 
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://loja-virtual-8juo.onrender.com/products';
  private cloudName = 'dzzkvggjb';
  private unsignedUploadPreset = 'unsigned_preset';

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
   uploadImage(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.unsignedUploadPreset);

    return this.http.post(url, formData);
  }
}

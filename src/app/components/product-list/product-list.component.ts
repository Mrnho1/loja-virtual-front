import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductDTO, ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
   products: ProductDTO[] = [];
  selectedProduct?: ProductDTO;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.listAll().subscribe(products => {
      this.products = products;
    });
  }

  editProduct(product: ProductDTO) {
    this.selectedProduct = product;
  }

  deleteProduct(id: number) {
    if (confirm('Deseja realmente excluir esse produto?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  onProductSaved() {
    this.selectedProduct = undefined;
    this.loadProducts();
  }
}

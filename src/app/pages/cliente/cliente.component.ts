import { Component } from '@angular/core';
import { ProductDTO, ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, NavbarComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
    products: ProductDTO[] = [];

    

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.listAll().subscribe((products) => {
      this.products = products;
    });
  }

  onAddToCart(product: ProductDTO) {
    // Lógica de adicionar ao carrinho (aqui apenas exibe toast por enquanto)
    this.toastr.success(`${product.nome} adicionado ao carrinho!`);
  }
}

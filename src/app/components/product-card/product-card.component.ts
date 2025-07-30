import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDTO } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: ProductDTO;
  @Output() addToCart = new EventEmitter<ProductDTO>();

  add() {
    this.addToCart.emit(this.product);
  }
}

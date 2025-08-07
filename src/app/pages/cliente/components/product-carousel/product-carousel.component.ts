import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductDTO, ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css'
})
export class ProductCarouselComponent implements OnInit{
   products: ProductDTO[] = [];
  currentIndex = 0;

  // Configurações do card/carrossel
  itemWidth = 250; // largura fixa do card (px)
  gap = 20;        // gap entre cards (px)
  itemsToShow = 4; // cards visíveis simultaneamente

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.listAll().subscribe(data => {
      this.products = data;
    });
  }

  get translateX() {
    return this.currentIndex * (this.itemWidth + this.gap);
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextSlide() {
    const maxIndex = this.products.length - this.itemsToShow;
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    }
  }
   
}

import { Component } from '@angular/core';
import { ProductDTO, ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';

@Component({
  selector: 'app-news-products',
  standalone: true,
  imports: [CommonModule, ProductCarouselComponent],
  templateUrl: './news-products.component.html',
  styleUrl: './news-products.component.css'
})
export class NewsProductsComponent {

}

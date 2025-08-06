import { Component } from '@angular/core';
import { ProductDTO, ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-products.component.html',
  styleUrl: './news-products.component.css'
})
export class NewsProductsComponent {
  produtosRecentes: ProductDTO[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.listAll().subscribe(produtos => {
      this.produtosRecentes = produtos
        .filter(p => !!p.nome && !!p.descricao) // segurança extra
        .sort((a, b) => {
          const dateA = new Date((a as any).createdAt || 0).getTime();
          const dateB = new Date((b as any).createdAt || 0).getTime();
          return dateB - dateA;
        })
        .slice(0, 5); // mostra apenas os 5 mais recentes
    });
  }
}

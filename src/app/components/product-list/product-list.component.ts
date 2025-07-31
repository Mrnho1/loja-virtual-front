import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductDTO, ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedDialogComponent } from '../../shared/confirmed-dialog/confirmed-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductFormComponent,
    MatDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: ProductDTO[] = [];
  selectedProduct?: ProductDTO;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.listAll().subscribe({
      next: (products) => {
        this.products = products;
        this.selectedProduct = undefined; // limpa seleção após recarregar
      },
      error: (err) => {
        this.toastr.error('Erro ao carregar produtos');
        console.error(err);
      }
    });
  }

  editProduct(product: ProductDTO) {
    this.selectedProduct = { ...product }; // cópia para evitar binding direto
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmedDialogComponent, {
      width: '350px',
      data: 'Tem certeza que deseja excluir este produto?',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Produto excluído com sucesso!');
            this.loadProducts();
          },
          error: (err) => {
            this.toastr.error('Erro ao excluir produto');
            console.error(err);
          }
        });
      }
    });
  }

  onProductSaved() {
    this.loadProducts();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
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
    this.productService.listAll().subscribe((products) => {
      this.products = products;
      console.log('Produtos carregados:', this.products);
    });
  }

  editProduct(product: ProductDTO) {
    this.selectedProduct = product;
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmedDialogComponent, {
      width: '350px',
      data: 'Tem certeza que deseja excluir este produto?',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(id).subscribe(() => {
          this.toastr.success('Produto excluído com sucesso!');
          this.loadProducts();
        });
      }
    });
  }
  onProductSaved() {
    this.selectedProduct = undefined;
    this.loadProducts();
  }
}

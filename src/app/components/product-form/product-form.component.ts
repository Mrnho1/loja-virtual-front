import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductDTO, ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Input() productToEdit?: ProductDTO;
  @Output() productSaved = new EventEmitter<void>();

  product: ProductDTO = { nome: '', descricao: '', preco: 0 };

  constructor(private productService: ProductService) {}

  ngOnChanges() {
    // Se receber produto para editar, preenche o form
    if (this.productToEdit) {
      this.product = { ...this.productToEdit };
    } else {
      this.resetForm();
    }
  }

  saveProduct(form: NgForm) {
    if (form.invalid) return;

    if (this.product.id) {
      this.productService.update(this.product).subscribe(() => {
        this.productSaved.emit();
        this.resetForm();
      });
    } else {
      this.productService.create(this.product).subscribe(() => {
        this.productSaved.emit();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.product = { nome: '', descricao: '', preco: 0 };
  }
}

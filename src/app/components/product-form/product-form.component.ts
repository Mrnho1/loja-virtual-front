import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
      this.product = { ...this.productToEdit }; // Clona para evitar bind direto
    } else if (!this.productToEdit) {
      this.resetForm();
    }
  }

  saveProduct(form: NgForm) {
  if (form.invalid) return;

  const isUpdate = !!this.product.id;
  const operation = isUpdate
    ? this.productService.update(this.product)
    : this.productService.create(this.product);

  operation.subscribe(() => {
    this.toastr.success(
      isUpdate ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!'
    );
    this.productSaved.emit();
    this.resetForm();
  });
}

  resetForm() {
    this.product = { nome: '', descricao: '', preco: 0 };
  }
}

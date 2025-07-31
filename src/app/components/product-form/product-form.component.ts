import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductDTO, ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Input() productToEdit?: ProductDTO;
  @Output() productSaved = new EventEmitter<void>();

  product: ProductDTO = { nome: '', descricao: '', preco: 0 };
  selectedFile?: File;

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
      this.product = { ...this.productToEdit };
    } else if (!this.productToEdit) {
      this.resetForm();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveProduct(form: NgForm) {
    if (form.invalid) return;
    
    if (this.selectedFile) {
      this.productService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.product.imageUrl = res.secure_url;
          this.saveProductData();
        },
        error: (err) => {
          this.toastr.error('Erro ao enviar a imagem.');
          console.error(err);
        }
      });
    } else {
      this.saveProductData();
    }
  }

  private saveProductData() {
    const isUpdate = !!this.product.id;
    const operation = isUpdate
      ? this.productService.update(this.product)
      : this.productService.create(this.product);

    operation.subscribe({
      next: () => {
        this.toastr.success(
          isUpdate ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!'
        );
        this.productSaved.emit();
        this.resetForm();
      },
      error: (err) => {
        this.toastr.error('Erro ao salvar o produto.');
        console.error(err);
      }
    });
  }

  resetForm() {
    this.product = { nome: '', descricao: '', preco: 0 };
    this.selectedFile = undefined;
  }
}

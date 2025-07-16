import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ProductListComponent, UserListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
   constructor(private toastr: ToastrService) {}

  show() {
    this.toastr.success('Funcionou!', 'Sucesso');
  }
}

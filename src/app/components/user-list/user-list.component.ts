import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
    clientes: User[] = [];
  admins: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        // Supondo que o User tenha a propriedade role como string 'CLIENT' ou 'ADMIN'
        this.clientes = users.filter(user => user.role === 'CLIENTE');
        this.admins = users.filter(user => user.role === 'ADMIN');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao carregar usuários:', error);
        // Aqui você pode mostrar uma mensagem de erro na UI, se quiser
      }
    });
  }
}

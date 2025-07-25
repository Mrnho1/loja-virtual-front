import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
  this.authService.login({ username: this.username, password: this.password }).subscribe({
    next: () => {
      this.toastr.success('Login realizado com sucesso!', 'Bem-vindo');

      const role = this.authService.getUserRole();
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (role === 'CLIENTE') {
        this.router.navigate(['/cliente']);
      } else {
        this.router.navigate(['/unauthorized']);
      }
    },
    error: () => {
      this.toastr.error('Usuário ou senha inválidos', 'Erro de Login');
    },
  });
}

}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() registered = new EventEmitter<void>();

  model = {
    username: '',
    password: '',
    role: 'CLIENTE',
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.toastr.warning('Preencha todos os campos corretamente.', 'Atenção');
      return;
    }

    this.http
      .post('https://loja-virtual-8juo.onrender.com/auth/register', this.model, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.toastr.success(res, 'Cadastro realizado!');
          this.registered.emit();
          form.resetForm({ role: 'CLIENTE' });
        },
        error: (err) => {
          const message = err.error?.message || err.error || 'Erro ao cadastrar usuário';
          this.toastr.error(message, 'Erro');
        },
      });
  }
}

import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';


@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  rightPanelActive = false;

  showSignUp() {
    this.rightPanelActive = true;
  }

  showSignIn() {
    this.rightPanelActive = false;
  }

  onRegistered() {
    console.log('Usuário cadastrado, trocando para login...');
    setTimeout(() => {
    this.rightPanelActive = false;
  }, 2000);
  }
}

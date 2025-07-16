import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';

export const routes: Routes = [
  { path: 'login-register', component: LoginRegisterComponent }, // rota explícita para login-register
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [authGuard],
    data: { roles: ['CLIENTE'] }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: 'login-register', pathMatch: 'full' }, // rota raiz redireciona para login-register
  { path: '**', redirectTo: 'login-register' } // rota curinga redireciona para login-register
];

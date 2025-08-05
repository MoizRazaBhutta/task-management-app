import { Routes } from '@angular/router';
import { Shell } from './components/shell/shell';
import { Tasks } from './components/tasks/tasks';
import { TaskDetail } from './components/task-detail/task-detail';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'tasks', component: Tasks, canActivate: [AuthGuard] },
      { path: 'tasks/:id', component: TaskDetail, canActivate: [AuthGuard] },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
];

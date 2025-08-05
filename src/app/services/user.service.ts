import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly STORAGE_KEY = 'taskUsers';
  private readonly AUTH_KEY = 'CURRENT_USER';
  router = inject(Router);

  constructor() {}

  getUsers(): User[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  setUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  // Register a new user
  register(user: User): boolean {
    const users = this.getUsers();
    if (users.some((u) => u.name === user.name)) {
      console.error('User already exists');
      return false; // User already exists
    }
    users.push(user);
    this.setUsers(users);
    return true;
  }

  // Login a user
  login(user: User): boolean {
    const users = this.getUsers();
    const foundUser = users.find(
      (u) => u.name === user.name && u.password === user.password
    );
    if (foundUser) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(foundUser));
      return true; // Login successful
    }
    console.error('Invalid username or password');
    return false; // Login failed
  }

  // Logout the current user
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }

  // Is Logged In
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  // Get Current User
  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.AUTH_KEY);
    return user ? JSON.parse(user) : null;
  }
}

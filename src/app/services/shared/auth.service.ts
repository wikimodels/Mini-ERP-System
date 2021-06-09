import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUserEmail() {
    return 'vasia@gmail.com';
  }
}

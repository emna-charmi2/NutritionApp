import { Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  private auth = inject(Auth);

  async resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
}

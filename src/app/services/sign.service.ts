import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async registerUser(userData: User): Promise<string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password!
      );
      const user = userCredential.user;
      if (!user) throw new Error('Failed to create account');

      await updateProfile(user, {
        displayName: `${userData.prenom} ${userData.nom}`
      });

      const { password, ...userWithoutPassword } = userData;
      const userDoc = {
        uid: user.uid,
        ...userWithoutPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const userRef = doc(this.firestore, 'users', user.uid);
      await setDoc(userRef, userDoc);

      return userData.prenom;
    } catch (error: unknown) {
      console.error('Error during registration:', error);
      if (error instanceof Error) {
        if (error.message.includes('email-already-in-use')) {
          throw new Error('This email address is already in use');
        } else if (error.message.includes('weak-password')) {
          throw new Error('The password is too weak');
        } else if (error.message.includes('invalid-email')) {
          throw new Error('Invalid email address');
        } else {
          throw new Error('Registration error: ' + error.message);
        }
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<any>(null);
  private currentRole = new BehaviorSubject<string>('user');
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    this.afAuth.authState.subscribe(user => {
      this.currentUser.next(user);
      if (user) {
        this.fetchUserRole(user.uid);
      } else {
        this.currentRole.next('user');
      }
    });
  }

  private async fetchUserRole(uid: string) {
    try {
      const docSnapshot = await firstValueFrom(this.firestore.collection('users').doc(uid).get());
      if (docSnapshot.exists) {
        const data = docSnapshot.data() as { role: string };
        this.currentRole.next(data.role);
      } else {
        this.currentRole.next('user'); // default role
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      this.currentRole.next('user');
    }
  }

  getUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  getRole(): Observable<string> {
    return this.currentRole.asObservable();
  }

  login(email: string, password: string): Promise<any> {
  return this.afAuth.signInWithEmailAndPassword(email, password);
}


  async logout() {
    try {
      await this.afAuth.signOut();
      this.currentUser.next(null);
      this.currentRole.next('user');
      return Promise.resolve();
    } catch (error) {
      console.error('Error during logout:', error);
      return Promise.reject(error);
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  uid = "oCyGVbwWRxdy0MomFlcznULQ9V93";

  constructor(public firebaseAuth: AngularFireAuth) { }

  //Signing in with email & password
  async signIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user))
      }).catch((err) => {
        alert(err.message)
        location.reload()
      })
  }

  async signAdminIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        this.uid = "oCyGVbwWRxdy0MomFlcznULQ9V93"
        localStorage.setItem('user', JSON.stringify(res.user))
      }).catch((err) => {
        alert(err.message)
        location.reload()
      })
  }

  //Signing up with email & password
  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;

        localStorage.setItem('user', JSON.stringify(res.user))
      }).catch((err) => {
        alert(err.message)
        location.reload()
      })


  }

  //Logging out method
  logOut() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user');
  }
}
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  isSignedIn = false;
  private scheduleSubscriber: Subscription;

  subject_entry = ''
  component_entry = ''
  userName = ""
  super_entry = ""
  array_1 = [] as any[];
  courses: any = []
  get_schedules: any;
  FLName = ""
  userAge = ""


  constructor(public firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true
    }
    else { this.isSignedIn = false }

  }

  // async onSignup(email: string, password: string) {
  //   await this.firebaseService.signUp(email, password)
  //   if (this.firebaseService.isLoggedIn)
  //     this.isSignedIn = true
  //   this.router.navigateByUrl('')
  //   alert("Your account has been created " + this.userName)
  //   location.reload()
  // }

  // async onSignin(email: string, password: string) {
  //   await this.firebaseService.signIn(email, password)
  //   if (this.firebaseService.isLoggedIn) {
  //     this.isSignedIn = true
  //     this.router.navigateByUrl('/members')
  //   }

  // }

  // async onAdminSignIn(email: string, password: string) {
  //   await this.firebaseService.signAdminIn(email, password)
  //   if (this.firebaseService.isLoggedIn && this.firebaseService.uid == "oCyGVbwWRxdy0MomFlcznULQ9V93") {
  //     this.isSignedIn = true
  //     this.router.navigateByUrl('/admin')
  //   }

  // }

}
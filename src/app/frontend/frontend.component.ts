import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();

  subject_entry = ''
  component_entry = ''
  super_entry = ""
  array_1 = [] as any[];
  courses: any = []
  isSignedIn = false;
  empty = "";
  get_schedules: any;
  private scheduleSubscriber: Subscription;


  constructor(public firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {


  }

  viewAllExercises() {
    alert("this button works")
  }

  workoutRecommendation() {
    alert("button works")
  }

  logout() {
    this.firebaseService.logOut()
    this.isLogout.emit()
    this.router.navigateByUrl('')
  }

  handleLogout() {
    this.isSignedIn = false

  }



}

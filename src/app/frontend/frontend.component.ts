import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  userID: string;
  subjectEntry = '';
  componentEntry = '';
  superEntry = '';
  array1 = [] as any[];
  courses: any = [];
  isSignedIn = false;
  empty = '';
  getSchedules: any;
  private scheduleSubscriber: Subscription;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
  }

  viewAllExercises(): void {
    alert('this button works');
  }

  workoutRecommendation(): void {
    alert('button works');
  }

  logout(): void {
    this.isLogout.emit();
    this.router.navigateByUrl('');
  }

  handleLogout(): void {
    this.isSignedIn = false;
  }



}

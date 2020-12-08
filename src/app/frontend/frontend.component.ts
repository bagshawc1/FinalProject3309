import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {HttpRequestService} from '../http-request.service';

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
  recommendedExercises = [];
  displayExercises = false;
  empty = '';
  getSchedules: any;
  private scheduleSubscriber: Subscription;


  constructor(private httpRequest: HttpRequestService, private router: Router) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
  }

  viewAllExercises(): void {
    return;
  }

  workoutRecommendation(): void {
    this.recommendedExercises = [];
    this.httpRequest.recommendWorkout(this.userID).then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)){
          this.recommendedExercises.push(data[newKey]);
          }
        }
      this.displayExercises = true;
    })
      .catch(err => {
        alert('error');
      });
  }

  logout(): void {
    this.isLogout.emit();
    this.router.navigateByUrl('');
  }

  handleLogout(): void {
    this.isSignedIn = false;
  }



}

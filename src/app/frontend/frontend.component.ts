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
  isSignedIn = false;
  recommendedExercises = [];
  exercises = [];
  displayExercises = false;
  displayAllExercises = false;
  empty = '';
  displayGoals = false;
  goals = [];

  constructor(private httpRequest: HttpRequestService, private router: Router) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
  }

  viewAllExercises(): void {
    this.exercises = [];
    this.httpRequest.getAllExercises().then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)){
          this.exercises.push(data[newKey]);
        }
      }
      this.displayGoals = false;
      this.displayExercises = false;
      this.displayAllExercises = true;
    })
      .catch(err => {
        alert('error');
      });
  }

  workoutRecommendation(): void {
    this.recommendedExercises = [];
    this.httpRequest.recommendWorkout(this.userID).then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)){
          this.recommendedExercises.push(data[newKey]);
          }
        }
      if (this.recommendedExercises.length < 1){
        alert('You have no favourites so we cant recommend you an exercise');
      }
      else{
        this.displayGoals = false;
        this.displayAllExercises = false;
        this.displayExercises = true;
      }
    })
      .catch(err => {
        alert('error');
      });
  }
  getMyGoals(): void{
    this.goals = [];
    this.httpRequest.getMyGoals(this.userID).then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)){
          this.goals.push(data[newKey]);
        }
      }
      console.log(this.goals);
      this.displayAllExercises = false;
      this.displayExercises = false;
      this.displayGoals = true;
    })
      .catch(err => {
        alert('error');
      });
  }

  logout(): void {
    this.handleLogout();
    this.isLogout.emit();
    this.router.navigateByUrl('');
  }

  handleLogout(): void {
    this.isSignedIn = false;
  }
}

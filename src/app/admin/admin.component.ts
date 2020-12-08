import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {HttpRequestService} from '../http-request.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  isSignedIn = false;
  usersByAge = [];
  displayAge = false;
  userWorkouts = [];
  constructor(private httpRequest: HttpRequestService, private router: Router) { }

  ngOnInit(): void {
  }
  handleLogout(): void {
    this.isSignedIn = false;
  }

  getUsersWorkouts(): void {
    this.httpRequest.getUsersWorkouts().then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)) {
          this.userWorkouts.push(data[newKey]);
        }
      }
      console.log(this.userWorkouts);
      this.displayAge = false;
    })
      .catch(err => {
        console.log(err);
        alert('error');
      });
  }

  trainerSalaries(): void {
    this.httpRequest.updateTrainerSalaries().then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)) {
        }
      }
      alert('Salaries Updated');
      this.displayAge = false;
    })
      .catch(err => {
        console.log(err);
        alert('error');
      });
  }
  getUsersByAge(): void{
    this.usersByAge = [];
    this.httpRequest.getUsersByAge().then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)) {
          this.usersByAge.push(data[newKey]);
        }
      }
      console.log(this.usersByAge);
      this.displayAge = true;
    })
      .catch(err => {
        console.log(err);
        alert('error');
      });
  }
  logout(): void {
    this.handleLogout();
    this.isLogout.emit();
    this.router.navigateByUrl('');
  }
}

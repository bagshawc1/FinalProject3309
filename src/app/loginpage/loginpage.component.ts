import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpRequestService} from '../http-request.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  isSignedIn = false;
  private scheduleSubscriber: Subscription;
  subjectEntry = '';
  componentEntry = '';
  createUsername = '';
  username = '';
  password = '';
  createPassword = '';
  superEntry = '';
  array1 = [] as any[];
  courses: any = [];
  getSchedules: any;
  FLName = '';
  userAge = '';


  constructor(private router: Router, private httpRequest: HttpRequestService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }

  }

  login(username: string, password: string): void {
    this.httpRequest.login(username, password).then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)) {
          this.isSignedIn = true;
          if (data[newKey].username === 'jsmithy') {
            this.router.navigateByUrl('admin');
          } else {
            sessionStorage.setItem('userID', data[newKey].id);
            this.router.navigateByUrl('members');
          }
        }
      }
    })
      .catch(err => {
        alert('Invalid Login Information');
      });
  }

  createAccount(): void {
    this.httpRequest.createUser(this.FLName, this.userAge, this.createUsername, this.createPassword).then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)) {
          alert('New Account Created');
        }
      }
    })
      .catch(err => {
        console.log(err);
        alert('username already in use');
      });
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  isSignedIn = false
  constructor(public firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }


  logout() {
    this.firebaseService.logOut()
    this.isLogout.emit()
    this.router.navigateByUrl('')
  }

  handleLogout() {
    this.isSignedIn = false

  }

  displayAll() {
    alert("bonjour")
  }

  trainerSalaries() {
    alert("bingo")
  }




}

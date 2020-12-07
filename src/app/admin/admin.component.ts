import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  isSignedIn = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  handleLogout(): void {
    this.isSignedIn = false;
  }

  displayAll(): void {
    alert('bonjour');
  }

  trainerSalaries(): void {
    alert('bingo');
  }
  logout(): void {
    return;
  }




}

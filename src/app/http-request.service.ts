import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  login(user, pass): Promise<any> {
    return (this.http.get(this.url + 'login/' + user + '/' + pass).toPromise());
  }
  recommendWorkout(userID): Promise<any> {
    return (this.http.get(this.url + 'recommendedExercise/' + userID).toPromise());
  }
  getAllExercises(): Promise<any> {
    return (this.http.get(this.url + 'allExercises/').toPromise());
  }
  getMyGoals(userID): Promise<any> {
    return (this.http.get(this.url + 'myGoals/' + userID).toPromise());
  }
  createUser(name, age, username, password): Promise<any> {
    return (this.http.post(this.url + 'createUser/' + name + '/' + age + '/' + username + '/' + password, {}).toPromise());
  }
  getUsersByAge(): Promise<any>{
    return (this.http.get(this.url + 'showByAge').toPromise());
  }
  updateTrainerSalaries(): Promise<any> {
    return (this.http.post(this.url + 'increaseSalary', {}).toPromise());
  }
  getUsersWorkouts(): Promise<any> {
	  return (this.http.get(this.url + 'userWorkouts', {}).toPromise());
  }
}


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
}


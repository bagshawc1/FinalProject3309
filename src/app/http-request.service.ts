import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  login(user, pass): string{
    this.http.get(this.url + user + '/' + pass).toPromise().then(data => {
      for (const newKey in data) {
        if (data.hasOwnProperty(newKey)){
          return data[newKey];
        }

      }
    })
      .catch(err => {
        return false;
      });
    return;
  }

}


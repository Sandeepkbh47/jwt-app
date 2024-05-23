import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get('http://localhost:4000/api/stats');
  }
}
